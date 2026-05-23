import { Link } from 'react-router-dom';

export default function Portfolio() {
  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <span className="portfolio-brand">KENTCODE</span>
        <Link to="/?force=3d" className="portfolio-back-link">
          View the 3D version →
        </Link>
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
    </div>
  );
}
