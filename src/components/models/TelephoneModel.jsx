import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { TELEPHONE_MODEL_PATH } from '../../helpers/constants';

function TelephoneModel() {
  const { scene } = useGLTF(TELEPHONE_MODEL_PATH);
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
    <Center scale={950} rotation={[0, 15, 0]} position={[150, -90, 230]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export default TelephoneModel;