import { Center, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { useRef } from 'react';
import { DESK_MODEL_PATH } from '../../helpers/constants';

function DeskModel() {
  const { scene } = useGLTF(DESK_MODEL_PATH);
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
    <Center scale={[300, 100, 200]} rotation={[0, Math.PI / 2, 0]} position={[0, -300, 0]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export default DeskModel;