export function GrainFilter() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        opacity: 0.09,
        pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.14) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '4px 4px, 8px 8px',
      }} />
  );
}
