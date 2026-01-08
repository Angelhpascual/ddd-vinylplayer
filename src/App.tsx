import { useState } from "react"
import "./App.css"
import { useTrackSearch } from "./hooks/useTrackSearch"
import { PlayerScene } from "./contexts/MusicPlayer/ui/scenes/PlayerScene"
import { usePlayerStore } from "./contexts/MusicPlayer/ui/store/usePlayerStore"

function App() {
  const { tracks, loading, error, search } = useTrackSearch()
  const [query, setQuery] = useState("")

  const playTrack = usePlayerStore((s) => s.play)
  const currentTrack = usePlayerStore((s) => s.currentTrack)
  const stop = usePlayerStore((s) => s.stop)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) search(query)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-between px-8 border-b border-white/5">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          Deezer DDD Player
        </h1>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca..."
            className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 w-64 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="text-sm font-bold text-pink-500 hover:text-pink-400"
          >
            {loading ? "..." : "BUSCAR"}
          </button>
        </form>
      </header>

      {/* BODY SPLIT */}
      <div className="flex h-screen pt-20">
        {/* IZQUIERDA: RESULTADOS */}
        <div className="w-1/2 p-8 overflow-y-auto pb-32">
          {error && <div className="text-red-400 mb-4">{error}</div>}

          <h2 className="text-xl font-bold mb-6 text-slate-400">
            Biblioteca de Discos
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id.value}
                onClick={() => playTrack(track)}
                className="group bg-slate-800/50 hover:bg-slate-800 p-3 rounded-xl cursor-pointer transition-all border border-white/5 active:scale-95"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-3 relative">
                  <img
                    src={track.coverUrl.value}
                    className="w-full h-full object-cover"
                    alt={track.title.value}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-2xl">▶</span>
                  </div>
                </div>
                <h3
                  className="font-bold truncate text-sm"
                  title={track.title.value}
                >
                  {track.title.value}
                </h3>
                <p className="text-xs text-slate-400 truncate">
                  {track.artist.name.value}
                </p>
              </div>
            ))}
          </div>

          {!loading && tracks.length === 0 && (
            <div className="text-center text-slate-600 mt-20">
              Usa el buscador de arriba (Ej: Daft Punk)
            </div>
          )}
        </div>

        {/* DERECHA: REPRODUCTOR 3D */}
        <div className="w-1/2 bg-slate-950 border-l border-white/5 relative flex flex-col">
          <div className="absolute inset-0">
            <PlayerScene />
          </div>
        </div>
      </div>

      {/* AUDIO INVISIBLE */}
      {currentTrack && (
        <audio src={currentTrack.streamUrl.value} autoPlay onEnded={stop} />
      )}
    </div>
  )
}

export default App
