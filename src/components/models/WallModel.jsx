import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { WALL_ART_PATH_1, WALL_ART_PATH_2 } from '../../helpers/constants';

function WallArt1Model() {
  const { scene } = useGLTF(WALL_ART_PATH_1);
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
    <Center scale={90} rotation={[Math.PI / 2, 0, -Math.PI / 2]} position={[-388, 130, 410]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

function WallArt2Model() {
  const { scene } = useGLTF(WALL_ART_PATH_2);
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
    <Center scale={1000} rotation={[0, -Math.PI / 2, 0]} position={[-388, 110, -400]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

useGLTF.preload(WALL_ART_PATH_1);
useGLTF.preload(WALL_ART_PATH_2);

export function WallModel() {
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <WallArt1Model />
      <WallArt2Model />
      <mesh
        position={[-400, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[8000, 3000]} />
        <meshStandardMaterial color="#4b4e58" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}
