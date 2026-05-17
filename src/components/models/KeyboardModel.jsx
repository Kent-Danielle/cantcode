import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { KEYBOARD_MODEL_PATH } from '../../helpers/constants';

function KeyboardModel() {
  const { scene } = useGLTF(KEYBOARD_MODEL_PATH);
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
    <Center scale={1.2} rotation={[0, Math.PI / 2, 0]} position={[210, -125, 40]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export default KeyboardModel;