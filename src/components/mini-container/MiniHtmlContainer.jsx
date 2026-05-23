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
      </div>
    </Html>
  );
}
