import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useViewportRoute, isPortraitViewport } from './hooks/useViewportRoute';

const Landing = lazy(() => import('./pages/Landing.jsx'));
const Portfolio = lazy(() => import('./pages/Portfolio.jsx'));

function ViewportRouter() {
  useViewportRoute();
  return null;
}

function RouteFallback() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#c2c9d4',
      }}
    />
  );
}

function App() {
  const initialIsPortrait =
    isPortraitViewport() &&
    new URLSearchParams(window.location.search).get('force') !== '3d';

  return (
    <>
      <ViewportRouter />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route
            path="/"
            element={initialIsPortrait ? <Portfolio /> : <Landing />}
          />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
