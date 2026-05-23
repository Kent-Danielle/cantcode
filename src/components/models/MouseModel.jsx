import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { MOUSE_MODEL_PATH } from '../../helpers/constants';

function MouseModel() {
  const { scene } = useGLTF(MOUSE_MODEL_PATH);
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
    <Center scale={45} rotation={[0, 1.8, 0]} position={[200, -135, -170]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export default MouseModel;

useGLTF.preload(MOUSE_MODEL_PATH);