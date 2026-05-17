import { Center, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { useRef } from 'react';
import { CRT_MONITOR_PATH } from '../../helpers/constants';

function CrtMonitorModel() {
  const { scene } = useGLTF(CRT_MONITOR_PATH);
  const ref = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <Center scale={1.5} position={[-30, 10, 0]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export default CrtMonitorModel;