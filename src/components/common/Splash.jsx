export function Splash({ progress, subtitle, fadeOut = false }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0b0c10',
        color: '#dcdcdc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1500ms cubic-bezier(0.65, 0, 0.35, 1)',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <div style={{ fontSize: '14px', letterSpacing: '0.2em' }}>KENTCODE</div>
      {progress != null && (
        <div
          style={{
            width: '240px',
            height: '4px',
            background: '#1f2128',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min(progress, 100)}%`,
              height: '100%',
              background: '#f0a04b',
              transition: 'width 200ms ease-out',
            }}
          />
        </div>
      )}
      {subtitle != null && (
        <div style={{ fontSize: '11px', opacity: 0.6 }}>{subtitle}</div>
      )}
    </div>
  );
}
