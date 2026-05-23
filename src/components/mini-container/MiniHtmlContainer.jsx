import { Html } from '@react-three/drei';

export function MiniHtmlContainer({ onPowerOff }) {
  return (
    <Html
      transform
      distanceFactor={100}
      position={[0, -63, -73]}
      rotation={[0, Math.PI / 2, 0]}
      occlude={false}
      zIndexRange={[20, 0]}
      style={{
        pointerEvents: 'auto',
        touchAction: 'pan-y',
      }}
    >
      <div
        style={{
          width: '590px',
          height: '530px',
          transform: 'translate(-50%, -50%)',
          borderRadius: '35px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'pan-y',
          maskImage:
            'radial-gradient(ellipse at center, black 60%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 60%, transparent 90%)',
        }}
      >
        <iframe
          src="https://kent-danielle.github.io/KentCode/"
          title="CantCode Website"
          style={{
            width: '100%',
            height: '95%',
            border: 'none',
            borderRadius: '35px',
            touchAction: 'pan-y',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '35px',
            background: `
              repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.12) 0px,
                rgba(0, 0, 0, 0.12) 1px,
                transparent 1px,
                transparent 3px
              )
            `,
            zIndex: 10,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '35px',
            background:
              'radial-gradient(ellipse at center, transparent 85%, rgba(0,0,0,0.75) 100%)',
            zIndex: 11,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '35px',
            background: 'rgba(0, 20, 0, 0.15)',
            zIndex: 12,
          }}
        />

        <button
          type="button"
          aria-label="Open full portfolio"
          onClick={onPowerOff}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '-65px',
            width: '60px',
            height: '60px',
            transform: 'translateX(-50%)',
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 20,
            padding: 0,
          }}
        />

        {/* TEMP: visible shortcut into the modern portfolio. Remove once the
            in-iframe nav is wired up. */}
        <button
          type="button"
          onClick={onPowerOff}
          style={{
            position: 'absolute',
            top: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '7px 22px 9px',
            background: '#f0a04b',
            color: '#1a1a1a',
            border: '2px solid #1a1a1a',
            borderBottom: '4px solid #1a1a1a',
            borderRight: '4px solid #1a1a1a',
            cursor: 'pointer',
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 0 2px #f0a04b, 0 0 14px rgba(240, 160, 75, 0.45)',
            zIndex: 15,
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.borderBottomWidth = '2px';
            e.currentTarget.style.borderRightWidth = '2px';
            e.currentTarget.style.transform =
              'translateX(-50%) translate(2px, 2px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.borderBottomWidth = '4px';
            e.currentTarget.style.borderRightWidth = '4px';
            e.currentTarget.style.transform = 'translateX(-50%)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottomWidth = '4px';
            e.currentTarget.style.borderRightWidth = '4px';
            e.currentTarget.style.transform = 'translateX(-50%)';
          }}
        >
          ▸ View Full Portfolio
        </button>
      </div>
    </Html>
  );
}
