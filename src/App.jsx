import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import CrtMonitorModel from './components/models/CrtMonitorModel';
import DeskModel from './components/models/DeskModel';
import MugModel from './components/models/MugModel';
import TelephoneModel from './components/models/TelephoneModel';
import { WallModel } from './components/models/WallModel';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';

function GrainFilter() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        opacity: 0.09,
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.14) 1.5px, transparent 1.5px), radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)',
        backgroundSize: '4px 4px, 8px 8px',
      }}
    />
  );
}

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
      {/* <button
        onClick={() => setShowScene((s) => !s)}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 20,
          padding: '8px 12px',
          background: '#ffffffcc',
          border: '1px solid #ccc',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        {showScene ? 'Hide Scene' : 'Show Scene'}
      </button> */}

      {showScene && (
        <Canvas
          camera={{
            position: [720, 30, 0],
            fov: 32,
            near: 200,
            far: 1200,
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

          <axesHelper args={[1000]} />

          <mesh ref={targetRef} position={[0, 0, 0]} visible={false} />

          <directionalLight position={[1479, 2113, 2955]} intensity={0.4} />
          <OrbitControls enableDamping />

          <Suspense fallback={null}>
            <WallModel />
            <CrtMonitorModel />
            <DeskModel />
            <MugModel />
            <TelephoneModel />
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
