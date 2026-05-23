# cantcode — Expansion, Bug Fixes & Performance Plan

Source of truth for upcoming work on the portfolio. Read top-to-bottom before implementing.

---

## 1. Current architecture (what we have today)

- Single `<Canvas>` mounts the whole 3D scene in [src/App.jsx](src/App.jsx) with `frameloop="demand"` (good — only re-renders when invalidated).
- One `<EffectComposer>` running `<DepthOfField>` post-process.
- One big `<directionalLight castShadow>` with a 4096×4096 shadow map (very expensive — biggest single GPU cost on the page).
- The "screen content" is a real HTML iframe rendered through drei `<Html transform>` inside [MiniHtmlContainer.jsx](src/components/mini-container/MiniHtmlContainer.jsx), pointing at the old GitHub Pages portfolio.
- Asset weight (uncompressed GLTF + textures):
  - `wall_art_1` — **17 MB** (worst offender)
  - `crt_monitor` — **12 MB**
  - `telephone` — 4.4 MB
  - `wall_art_2` — 2.7 MB
  - `keyboard` — 2.3 MB
  - rest < 1.5 MB each
  - **Total ≈ 40 MB** shipped before first paint of the scene.

This is the baseline we are optimizing from.

---

## 2. Feature: expand iframe into the "real" portfolio

### Goal
Click something inside the CRT screen → smooth zoom/expand → unmount the 3D scene → show a modern full-page portfolio. Reverse path returns to the 3D landing.

### Feasibility
**Fully feasible.** We already have the state flag `showScene` in [App.jsx:84](src/App.jsx) that conditionally mounts the `<Canvas>`. R3F disposes the WebGL context when `<Canvas>` unmounts, so going to "portfolio mode" really does release GPU memory.

### Approach (recommended)
1. **Single-app, two views, route-based.**
   - Add `react-router-dom`. Routes: `/` (3D landing) and `/portfolio` (modern page).
   - The "click-to-expand" button lives inside the iframe page itself **or** as an overlay button on top of the `<Html transform>` element. Easier: overlay button so we don't need to coordinate cross-origin postMessage with the iframe.
   - On click → start expand animation → navigate to `/portfolio` → `<Canvas>` unmounts.
2. **Expand animation** (the tricky part — feels magical if done right):
   - Option A (simple, recommended for v1): fade the canvas to a screenshot/overlay, then route. ~80% of the perceived "wow" with 10% of the work.
   - Option B (full): animate a DOM clone of the iframe from its on-screen rect to fullscreen using FLIP/`getBoundingClientRect`, then unmount the canvas behind it. Doable but `<Html transform>` makes the rect math fiddly because of the CSS3D transform stack.
   - **Decision needed:** A or B for v1? (See open questions.)
3. **Reverse path** (`/portfolio` → `/`): just navigate back, `<Canvas>` re-mounts. Combine with the loading screen from §4 so the re-mount isn't jarring.
4. **Portfolio page itself**: lives in `src/pages/Portfolio.jsx`. Lazy-load it with `React.lazy()` so its bundle doesn't ship with the landing page.

### Things to watch
- Cross-origin iframe (`kent-danielle.github.io`) means we **cannot** read clicks inside the iframe from the parent. The expand trigger must be a parent-side overlay button, **or** the iframe content must `postMessage` out. Overlay is simpler.
- When the modern portfolio replaces the iframe content (later), the click handler moves inside the iframe and uses `postMessage`.
- Browser back button should work — that's a free win from using react-router.

### Sub-feature: auto-route portrait / mobile viewports straight to `/portfolio`
The 3D scene is framed for landscape (camera fov 32 at `[720, 30, 0]` — see [App.jsx:16](src/App.jsx)). On portrait phones the framing is ruined: the CRT shrinks, the desk overflows, and the "fake monitor as portfolio" illusion collapses.

**Decision rule (first paint):**
- Detect on mount, **before** the `<Canvas>` is rendered, using `window.matchMedia('(orientation: portrait) and (max-width: 900px)')` (or a more conservative aspect-ratio check, e.g. `aspect-ratio < 1`).
- If it matches → render `/portfolio` directly (no flash of 3D, no Canvas mount, no GPU work).
- If it doesn't match → render the 3D landing as today.

**Why a media query and not just `userAgent`:** desktop users who shrink their window narrow should also get the clean portfolio. iPad-in-landscape should get the 3D scene. Orientation + aspect ratio captures both correctly; UA sniffing doesn't.

**Re-evaluation on resize / rotate:**
- Listen to the media query's `change` event. If the user rotates landscape → portrait while on `/`, route them to `/portfolio` (and unmount Canvas — same kill switch as §2's expand flow). Going portrait → landscape does **not** auto-route back; that would be jarring. Provide a "View the 3D version" link on the portfolio page header for that case.

**Escape hatch:** include a `?force=3d` query param that bypasses the redirect, so we can test the scene on a phone during development without the device-detection getting in the way.

**Where the code lives:** a small `useViewportRoute()` hook called at the top of `App.jsx`, before `<Canvas>` is even considered for mounting. Avoid the "render 3D for one frame, then redirect" anti-pattern — that wastes a GPU upload and looks broken.

---

## 3. Bug: iframe doesn't scroll on touchscreens

### Diagnosis
drei's `<Html transform>` wraps content in a CSS3D-transformed `<div>`. On touch devices, the canvas (or the parent) eats the touch sequence before the iframe's internal scroll gets it. Two contributors:
- `<Html>` defaults pass pointer events through to R3F's event system unless we tell it not to.
- The iframe wrapper has no `touch-action` hint, so the browser doesn't know it should be scrollable.

### Fix
- Pass the right props to `<Html>` so touch events stop at the HTML layer: `style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}` on the wrapper, and verify drei isn't capturing.
- Set `touch-action: pan-y` (and `overflow: auto` if needed) on the iframe's wrapping `<div>`.
- Make sure no parent has `pointer-events: none` blocking the iframe area.
- Test order: desktop mouse → desktop trackpad → iOS Safari → Android Chrome.

Cheap to try, isolated to [MiniHtmlContainer.jsx](src/components/mini-container/MiniHtmlContainer.jsx).

---

## 4. Bug: 1–3s incremental render, no loading screen

### Diagnosis
Models stream in as each `useGLTF` resolves. We have a `<Suspense fallback={null}>` so nothing covers the gap. The user sees the desk pop in, then the monitor, then wall art — classic loading flash.

### Fix
1. Show a real loading screen using drei's `useProgress()` hook. Render it **outside** `<Canvas>` (HTML overlay) so it shows before WebGL even initializes.
2. Preload everything with `useGLTF.preload(...)` calls at module top level so the network requests start immediately, in parallel.
3. Hold the loading screen visible until: `progress === 100` **AND** one frame has rendered (use `useThree().gl.info` or a "first frame rendered" effect) — otherwise we hide it the instant assets land but before the GPU has uploaded them, and the user still sees the pop-in.
4. Optional polish: fade-out the loader instead of cutting.

This pairs well with the route transition in §2 — same loader can cover the `/portfolio → /` return trip.

---

## 5. Performance settings (Low / Medium / High)

### Knob inventory (what we can actually turn)

| Knob | High (current) | Medium | Low |
|---|---|---|---|
| `dpr` (pixel ratio) | uncapped | `[1, 1.5]` | `[1, 1]` |
| Shadow map size | 4096² | 2048² | 1024² or **off** |
| `directionalLight.castShadow` | on | on | off |
| `<DepthOfField>` | on, `bokehScale: 8` | on, `bokehScale: 4` | off |
| `<GrainFilter>` | on | on | off |
| Shadow radius / bias | current | current | cheaper PCF |
| Anisotropy on textures | high | medium | 1 |
| Antialiasing | on | on | off |

### Implementation plan
1. Add a `qualityPreset` state in `App.jsx` (`'low' | 'medium' | 'high'`).
2. Auto-detect default: probe with `navigator.hardwareConcurrency`, `navigator.userAgent` for mobile, and the WebGL renderer string (`GL_RENDERER` via `gl.getParameter`) — choose Low on mobile / iGPU, Medium otherwise, High opt-in.
3. Expose a small in-scene settings menu (gear icon, top-right) and persist the choice in `localStorage`.
4. Pipe the preset into each model + `App.jsx` props. Avoid prop-drilling by exposing a tiny context (`QualityContext`).

---

## 6. Asset & rendering optimization (independent of presets)

These are wins everyone gets, not preset-gated.

1. **DRACO + Meshopt compression on every GLTF.** Run `gltfpack -i in.glb -o out.glb -cc` or `gltf-pipeline` with `-d`. Realistic target: 40 MB → **5–8 MB total**. Biggest single performance win available.
2. **Texture compression to KTX2 / BasisU.** Bonus 2–4× shrink and faster GPU upload. drei loaders support it.
3. **Re-export wall_art_1.** At 17 MB it almost certainly has uncompressed PNGs and over-dense geometry. Decimate in Blender, re-export with compression. Target: < 2 MB.
4. **`useGLTF.preload()` calls** at the bottom of each model file — parallel fetch instead of sequential.
5. **Re-use a single `EffectComposer` + tighter DOF settings.** Confirm we're not doing render-target ping-pong twice.
6. **Drop the second directional light** ([App.jsx:60](src/App.jsx)) or merge it — it doesn't cast shadows so the cost is small, but every light is a shader permutation.
7. **Shadow camera frustum is huge** (`-800..800`). Tighten to the actual scene bounds to recover shadow texel density at the same map size, then drop the map size.
8. **`frustumCulled` audit** on the loaded scenes — `traverse` and ensure it's true (it usually is, but verify).
9. **Cache busting / model caching is already added** per commit `4e4325d` — verify it still applies after we change loaders.

---

## 7. Suggested execution order

1. **Quick wins first** (low risk, high impact):
   1. DRACO/Meshopt compression on all GLTFs (§6.1, §6.2, §6.3).
   2. `useGLTF.preload` everywhere (§6.4).
   3. Tighten shadow frustum (§6.7).
2. **Bug fixes** (small, visible):
   4. Touch scroll inside iframe (§3).
   5. Loading screen with `useProgress` (§4).
3. **Quality presets** (§5) — once §6 is done the "High" baseline is sane.
4. **Expand-to-portfolio flow + portrait auto-route** (§2) — biggest feature, do last. Both sub-features share the modern-portfolio page as a prerequisite, so build them together.

---

## 8. Open questions for Kent

1. Expand animation — Option A (fade/cut, ship fast) or Option B (FLIP morph from monitor to fullscreen, feels magical)?
2. Should the "expand" trigger be a parent-side overlay button on the CRT, or do we plan to wire it from inside the new modern portfolio (requires `postMessage`)?
3. Do we want a real URL (`/portfolio`) for the modern view, or keep it as in-app state only? URL gives free deep-linking and back-button support.
4. Acceptable default quality on mobile — silently force Low, or always ask?
5. Is the current iframe target (`kent-danielle.github.io/KentCode/`) a placeholder until the modern page exists, or do we keep it as a fallback?
6. Portrait-redirect threshold — strict orientation (`portrait` + `max-width: 900px`), or pure aspect-ratio (`aspect-ratio < 1`)? Latter catches narrow desktop windows too; former is phone-only.
7. Should there be a "View the 3D version" link on the portfolio header for users routed there automatically, or hide it to keep the modern page clean?

---

## 9. Out of scope (for now)

- Audio / ambient sound.
- Animated camera intro.
- Server-side rendering — Vite SPA is fine.
- Replacing react-three-fiber with anything else.
