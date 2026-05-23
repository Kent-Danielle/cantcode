import { useProgress } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { Splash } from './Splash';

export function LoadingScreen({ firstFrameRendered }) {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const ready = !active && progress >= 100 && firstFrameRendered;

  useEffect(() => {
    if (!ready) return;
    const fadeStart = setTimeout(() => setFadeOut(true), 100);
    const unmount = setTimeout(() => setHidden(true), 1700);
    return () => {
      clearTimeout(fadeStart);
      clearTimeout(unmount);
    };
  }, [ready]);

  if (hidden) return null;

  return (
    <Splash
      progress={progress}
      subtitle={`${Math.round(progress)}%${
        firstFrameRendered ? '' : ' · warming up…'
      }`}
      fadeOut={fadeOut}
    />
  );
}
