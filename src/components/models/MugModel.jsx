import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { MUG_MODEL_PATH } from '../../helpers/constants';

function MugModel() {
  const { scene } = useGLTF(MUG_MODEL_PATH);
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
    <Center scale={150} rotation={[0, 1, 0]} position={[100, -112, -235]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export default MugModel;