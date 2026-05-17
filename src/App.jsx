import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import CrtMonitorModel from './components/models/CrtMonitorModel';
import DeskModel from './components/models/DeskModel';
import MugModel from './components/models/MugModel';
import TelephoneModel from './components/models/TelephoneModel';
import { WallModel } from './components/models/WallModel';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import KeyboardModel from './components/models/KeyboardModel';
import MouseModel from './components/models/MouseModel';
import BooksModel from './components/models/BooksModel';
import { GrainFilter } from './components/common/GrainFilter';
import { MiniHtmlContainer } from './components/mini-container/MiniHtmlContainer';

function App() {
  const [showScene, setShowScene] = useState(true);
  const targetRef = useRef();

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: '#c2c9d4',
      }}
    >
      {showScene && (
        <Canvas
          camera={{
            position: [720, 30, 0],
            fov: 32,
            near: 10,
            far: 3000,
          }}
          shadows
        >
          <directionalLight
            color="#fbfcd8"
            position={[1000, 1000, 1000]}
            intensity={3}
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-left={-800}
            shadow-camera-right={800}
            shadow-camera-top={800}
            shadow-camera-bottom={-800}
            shadow-camera-near={1}
            shadow-camera-far={3000}
            shadow-bias={-0.0005}
            shadow-radius={20}
          />

          {/* <axesHelper args={[1000]} /> */}

          <mesh ref={targetRef} position={[0, 0, 0]} visible={false} />

          <directionalLight position={[1479, 2113, 2955]} intensity={0.4} />

          <Suspense fallback={null}>
            <WallModel />
            <CrtMonitorModel>
              <MiniHtmlContainer />
            </CrtMonitorModel>
            <DeskModel />
            <MugModel />
            <TelephoneModel />
            <KeyboardModel />
            <MouseModel />
            <BooksModel />
          </Suspense>
          <EffectComposer>
            <DepthOfField
              worldFocusDistance={600}
              worldFocusRange={650}
              bokehScale={8}
            />
          </EffectComposer>
        </Canvas>
      )}

      <GrainFilter />
    </div>
  );
}

export default App;

