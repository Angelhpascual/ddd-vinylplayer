import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Group } from "three"

interface VinylRecordProps {
  isPlaying: boolean
  coverUrl?: string
}

export function VinylRecordModel({ isPlaying, coverUrl }: VinylRecordProps) {
  const groupRef = useRef<Group>(null)

  const texture = useTexture(coverUrl || "https://via.placeholder.com/150")

  useFrame((_, delta) => {
    if (isPlaying && groupRef.current) {
      groupRef.current.rotation.y -= delta * 2
    }
  })

  return (
    <group ref={groupRef}>
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[0.95, 0.95, 0.02, 64]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.5} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
        <torusGeometry args={[0.6, 0.3, 2, 64]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      <mesh position={[0, 0.015, 0]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.01, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  )
}
