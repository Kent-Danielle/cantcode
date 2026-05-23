import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PORTRAIT_QUERY = '(max-aspect-ratio: 1/1)';

function isForce3d(search) {
  return new URLSearchParams(search).get('force') === '3d';
}

export function useViewportRoute() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
    if (isForce3d(location.search)) return;

    const mql = window.matchMedia(PORTRAIT_QUERY);

    if (mql.matches) {
      navigate('/portfolio', { replace: true });
      return;
    }

    const onChange = (event) => {
      if (event.matches) navigate('/portfolio', { replace: true });
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [navigate, location.pathname, location.search]);
}

export function isPortraitViewport() {
  return window.matchMedia(PORTRAIT_QUERY).matches;
}
