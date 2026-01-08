import { useGLTF } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"
import { type ThreeElements } from "@react-three/fiber"

export function TurntableModel(props: ThreeElements["group"]) {
  const { scene } = useGLTF("/models/vinyl_player.glb")
  const groupRef = useRef<Group>(null)

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload("/models/vinyl_player.glb")
