import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stage } from "@react-three/drei"
import { Suspense, useState, useRef } from "react"
import { usePlayerStore } from "../store/usePlayerStore"
import { TurntableModel } from "../components/TurntableModel"
import { VinylRecordModel } from "../components/VinylRecordModel"

export function PlayerScene() {
  const { currentTrack, play, isPlaying, stop } = usePlayerStore()
  const [isHovering, setIsHovering] = useState(false)
  const [progress, setProgress] = useState(0) // 0 to 100
  const audioRef = useRef<HTMLAudioElement>(null)

  // Handlers para Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setIsHovering(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsHovering(false)

    try {
      const data = e.dataTransfer.getData("application/json")
      if (!data) return
      const trackData = JSON.parse(data)
      play(trackData)
    } catch (err) {
      console.error("Error al soltar canción:", err)
    }
  }

  return (
    <div
      className={`h-full w-full bg-slate-900 relative overflow-hidden transition-all duration-300 flex flex-col ${
        isHovering ? "ring-4 ring-pink-500/50 bg-slate-800" : ""
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Overlay de información */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2
          className={`text-sm font-bold tracking-widest transition-colors ${
            isPlaying ? "text-pink-500 animate-pulse" : "text-slate-500"
          }`}
        >
          {isPlaying ? "● REPRODUCIENDO" : isHovering ? "¡SUÉLTALO!" : "READY"}
        </h2>
        {currentTrack ? (
          <h1 className="text-white text-2xl font-bold mt-2 drop-shadow-md">
            {currentTrack.title.value}
          </h1>
        ) : (
          <h1 className="text-white/30 text-2xl font-bold mt-2">
            {isHovering ? "Drop it like it's hot 🔥" : "Arrastra un disco..."}
          </h1>
        )}
      </div>

      {/* 3D Scene */}
      <div className="flex-1 relative">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ fov: 45, position: [0, 2.5, 2.5] }}
        >
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.5} adjustCamera={false}>
              {/* ROTACIÓN -90 GRADOS */}
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
            <OrbitControls
              makeDefault
              enableRotate={false}
              enableZoom={false}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* BARRA DE PROGRESO FLOTANTE */}
      {currentTrack && (
        <div className="absolute bottom-12 left-12 right-12 h-1.5 bg-slate-700/30 rounded-full backdrop-blur-md z-50 overflow-hidden pointer-events-none border border-white/5">
          <div
            className="h-full bg-linear-to-r from-pink-500 to-violet-500 rounded-full transition-all duration-200 ease-linear shadow-[0_0_15px_rgba(236,72,153,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* AUDIO ELEMENT */}
      {currentTrack && (
        <audio
          key={currentTrack.id.value} // FORZAMOS RE-RENDER AL CAMBIAR CANCIÓN
          ref={audioRef}
          src={currentTrack.streamUrl.value}
          autoPlay
          onEnded={() => {
            stop()
            setProgress(0)
          }}
          onTimeUpdate={() => {
            if (audioRef.current) {
              const { currentTime, duration } = audioRef.current
              if (duration && !isNaN(duration) && isFinite(duration)) {
                setProgress((currentTime / duration) * 100)
              }
            }
          }}
        />
      )}
    </div>
  )
}
