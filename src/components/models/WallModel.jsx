import { Center, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { WALL_ART_PATH_1 } from '../../helpers/constants';

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
    <Center scale={90} rotation={[Math.PI / 2, 0, -Math.PI / 2]} position={[-388, 130, 330]}>
      <primitive ref={ref} object={scene} />
    </Center>
  );
}

export function WallModel() {
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <WallArt1Model />
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
