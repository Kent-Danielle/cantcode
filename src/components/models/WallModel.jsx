export function WallModel() {
  return <mesh
    position={[-800, 0, 0]}
    rotation={[0, Math.PI / 2, 0]}
    receiveShadow
  >
    <planeGeometry args={[8000, 3000]} />
    <meshStandardMaterial
      color="#4b4e58"
      roughness={1}
      metalness={0} />
  </mesh>;
}
