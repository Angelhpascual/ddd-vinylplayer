import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei" // Recuperamos OrbitControls
import { Suspense } from "react"
import { usePlayerStore } from "../store/usePlayerStore"
import { TurntableModel } from "../components/TurntableModel"
import { VinylRecordModel } from "../components/VinylRecordModel"

export function PlayerScene() {
  const { currentTrack, isPlaying } = usePlayerStore()

  return (
    <div className="h-full w-full bg-slate-900 relative overflow-hidden">
      {/* Overlay de información */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2
          className={`text-sm font-bold tracking-widest transition-colors ${
            isPlaying ? "text-pink-500 animate-pulse" : "text-slate-500"
          }`}
        >
          {isPlaying ? "● REPRODUCIENDO" : "READY"}
        </h2>
        {currentTrack ? (
          <h1 className="text-white text-2xl font-bold mt-2 drop-shadow-md">
            {currentTrack.title.value}
          </h1>
        ) : (
          <h1 className="text-white/30 text-2xl font-bold mt-2">
            Arrastra un disco...
          </h1>
        )}
      </div>

      {/* CÁMARA LEJANA: Ajusta [0, 14, 14] para alejar/acercar */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 2.5, 2.5] }}
      >
        <Suspense fallback={null}>
          {/* adjustCamera={false} evita que Stage haga auto-zoom y nos ignore */}
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            {/* ROTACIÓN -90 GRADOS: Posición lateral */}
            <group rotation={[0, -Math.PI / 2, 0]}>
              <TurntableModel />

              {currentTrack && (
                <group position={[0, 0.2, 1.36]} scale={0.75}>
                  <VinylRecordModel
                    isPlaying={isPlaying}
                    coverUrl={currentTrack.artist.pictureUrl.value}
                  />
                </group>
              )}
            </group>
          </Stage>

          {/* CONTROLES BLOQUEADOS: Solo para enfocar al centro (0,0,0) */}
          <OrbitControls
            makeDefault
            enableRotate={false}
            enableZoom={false}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
