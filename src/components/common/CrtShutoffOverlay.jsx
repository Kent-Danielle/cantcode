import { useEffect, useState } from 'react';

const PHASE_DURATIONS = {
  collapseVertical: 220,
  collapseHorizontal: 180,
  fadeOut: 250,
};

const TOTAL_DURATION =
  PHASE_DURATIONS.collapseVertical +
  PHASE_DURATIONS.collapseHorizontal +
  PHASE_DURATIONS.fadeOut;

export function CrtShutoffOverlay({ active, onComplete }) {
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!active) return;
    const raf = requestAnimationFrame(() => setPhase('collapseVertical'));
    const t1 = setTimeout(
      () => setPhase('collapseHorizontal'),
      PHASE_DURATIONS.collapseVertical
    );
    const t2 = setTimeout(
      () => setPhase('fadeOut'),
      PHASE_DURATIONS.collapseVertical + PHASE_DURATIONS.collapseHorizontal
    );
    const t3 = setTimeout(() => onComplete?.(), TOTAL_DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [active, onComplete]);

  if (!active) return null;

  const beamStyle = (() => {
    if (phase === 'collapseVertical') {
      return {
        transform: 'scaleY(0.015)',
        opacity: 1,
        transitionDuration: `${PHASE_DURATIONS.collapseVertical}ms`,
      };
    }
    if (phase === 'collapseHorizontal') {
      return {
        transform: 'scaleY(0.015) scaleX(0.005)',
        opacity: 1,
        transitionDuration: `${PHASE_DURATIONS.collapseHorizontal}ms`,
      };
    }
    if (phase === 'fadeOut') {
      return {
        transform: 'scaleY(0.015) scaleX(0.005)',
        opacity: 0,
        transitionDuration: `${PHASE_DURATIONS.fadeOut}ms`,
      };
    }
    return {
      transform: 'scale(1)',
      opacity: 1,
      transitionDuration: '0ms',
    };
  })();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: '#000',
        pointerEvents: 'all',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, #f8f8e8 0%, #d0d0b8 60%, #888 100%)',
          transformOrigin: 'center center',
          transitionProperty: 'transform, opacity',
          transitionTimingFunction: 'cubic-bezier(0.6, 0, 0.4, 1)',
          willChange: 'transform, opacity',
          boxShadow: '0 0 80px rgba(255, 255, 220, 0.6)',
          ...beamStyle,
        }}
      />
    </div>
  );
}
