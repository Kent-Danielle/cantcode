import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';

export function LoadingScreen({ firstFrameRendered }) {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const ready = !active && progress === 100 && firstFrameRendered;

  useEffect(() => {
    if (!ready) return;
    const fadeStart = setTimeout(() => setFadeOut(true), 100);
    const unmount = setTimeout(() => setHidden(true), 700);
    return () => {
      clearTimeout(fadeStart);
      clearTimeout(unmount);
    };
  }, [ready]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
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
        transition: 'opacity 600ms ease-out',
        pointerEvents: fadeOut ? 'none' : 'auto',
      }}
    >
      <div style={{ fontSize: '14px', letterSpacing: '0.2em' }}>KENTCODE</div>
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
      <div style={{ fontSize: '11px', opacity: 0.6 }}>
        {Math.round(progress)}%{firstFrameRendered ? '' : ' · warming up…'}
      </div>
    </div>
  );
}
