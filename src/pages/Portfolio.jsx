import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TRANSITION_MS = 1500;
const TRANSITION_EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

export default function Portfolio() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('entering');

  useEffect(() => {
    if (phase !== 'entering') return;
    const raf = requestAnimationFrame(() => setPhase('visible'));
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const handleBackClick = (e) => {
    e.preventDefault();
    if (phase === 'leaving') return;
    setPhase('leaving');
    setTimeout(() => navigate('/?force=3d'), TRANSITION_MS);
  };

  const overlayActive = phase !== 'visible';

  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <span className="portfolio-brand">KENTCODE</span>
        <a
          href="/?force=3d"
          className="portfolio-back-link"
          onClick={handleBackClick}
        >
          View the 3D version →
        </a>
      </header>

      <main className="portfolio-main">
        <h1>Kent Concengco</h1>
        <p className="portfolio-tagline">A Software Developer</p>
        <p className="portfolio-body">
          This is a placeholder for the modern portfolio page. The actual
          content will live here in a future iteration. For now, the 3D landing
          uses the old GitHub Pages site in the CRT screen.
        </p>
      </main>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          opacity: overlayActive ? 1 : 0,
          transition: `opacity ${TRANSITION_MS}ms ${TRANSITION_EASE}`,
          pointerEvents: overlayActive ? 'auto' : 'none',
          zIndex: 9999,
        }}
      />
    </div>
  );
}
