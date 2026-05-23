import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { BOOKS_MODEL_PATH } from '../../helpers/constants';

function BooksModel() {
  const { scene } = useGLTF(BOOKS_MODEL_PATH);
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
    <Center scale={110} rotation={[0, 1.1, 0]} position={[-145, -97, -325]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export default BooksModel;

useGLTF.preload(BOOKS_MODEL_PATH);