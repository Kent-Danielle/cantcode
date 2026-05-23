import { useThree, Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { useNavigate } from 'react-router-dom';
import CrtMonitorModel from '../components/models/CrtMonitorModel';
import DeskModel from '../components/models/DeskModel';
import MugModel from '../components/models/MugModel';
import TelephoneModel from '../components/models/TelephoneModel';
import { WallModel } from '../components/models/WallModel';
import KeyboardModel from '../components/models/KeyboardModel';
import MouseModel from '../components/models/MouseModel';
import BooksModel from '../components/models/BooksModel';
import { GrainFilter } from '../components/common/GrainFilter';
import { MiniHtmlContainer } from '../components/mini-container/MiniHtmlContainer';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { CrtShutoffOverlay } from '../components/common/CrtShutoffOverlay';

const CAMERA_CONFIG = {
  position: [720, 30, 0],
  fov: 32,
  near: 10,
  far: 3000,
};

const DOF_PROPS = {
  worldFocusDistance: 600,
  worldFocusRange: 650,
  bokehScale: 8,
};

const SHADOW_MAP_SIZE = [4096, 4096];

function SceneReadyInvalidator({ onReady }) {
  const { invalidate } = useThree();
  useEffect(() => {
    let i = 0;
    const pump = () => {
      invalidate();
      if (++i < 10) requestAnimationFrame(pump);
      else onReady?.();
    };
    pump();
  }, [invalidate, onReady]);
  return null;
}

function Scene({ onShutoff, onFirstFrame }) {
  return (
    <>
      <directionalLight
        color="#fbfcd8"
        position={[1000, 1000, 1000]}
        intensity={3}
        castShadow
        shadow-mapSize={SHADOW_MAP_SIZE}
        shadow-camera-left={-800}
        shadow-camera-right={800}
        shadow-camera-top={800}
        shadow-camera-bottom={-800}
        shadow-camera-near={1}
        shadow-camera-far={3000}
        shadow-bias={-0.0005}
        shadow-radius={20}
      />

      <directionalLight position={[1479, 2113, 2955]} intensity={0.4} />

      <Suspense fallback={null}>
        <WallModel />
        <CrtMonitorModel>
          <MiniHtmlContainer onPowerOff={onShutoff} />
        </CrtMonitorModel>
        <DeskModel />
        <MugModel />
        <TelephoneModel />
        <KeyboardModel />
        <MouseModel />
        <BooksModel />
        <SceneReadyInvalidator onReady={onFirstFrame} />
      </Suspense>

      <EffectComposer>
        <DepthOfField {...DOF_PROPS} />
      </EffectComposer>
    </>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [firstFrameRendered, setFirstFrameRendered] = useState(false);
  const [shutoff, setShutoff] = useState(false);

  const handleShutoff = () => {
    setShutoff(true);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: '#c2c9d4',
        overflow: 'hidden',
      }}
    >
      <Canvas camera={CAMERA_CONFIG} shadows frameloop="demand">
        <Scene
          onShutoff={handleShutoff}
          onFirstFrame={() => setFirstFrameRendered(true)}
        />
      </Canvas>

      <GrainFilter />

      <LoadingScreen firstFrameRendered={firstFrameRendered} />

      <CrtShutoffOverlay
        active={shutoff}
        onComplete={() => navigate('/portfolio')}
      />
    </div>
  );
}
