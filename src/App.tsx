import { useState } from "react"
import "./App.css"
import { useTrackSearch } from "./hooks/useTrackSearch"

function App() {
  const { tracks, loading, error, search } = useTrackSearch()
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    search(query)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent mb-4">
            Deezer DDD Player
          </h1>
          <p className="text-slate-400">Arquitectura limpia, sonido sucio</p>
        </header>
        {/* Search Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 justify-center mb-16"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca tu vinilo favorito..."
            className="w-full max-w-md px-6 py-4 rounded-full bg-slate-800 border border-slate-700 text-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-full bg-pink-600 hover:bg-pink-500 disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-all shadow-lg hover:shadow-pink-500/25"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>
        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 text-center">
            {error}
          </div>
        )}
        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tracks.map((track) => (
            <div
              key={track.id.value} // Acceso a VO
              className="group bg-slate-800/50 hover:bg-slate-800 p-4 rounded-2xl transition-all hover:-translate-y-2 hover:shadow-xl border border-white/5"
            >
              {/* Cover Image */}
              <div className="relative aspect-square mb-4 overflow-hidden rounded-xl shadow-lg">
                <img
                  src={track.coverUrl.value} // Acceso a VO
                  alt={track.title.value}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Play Button Overlay (Visual only for now) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center pl-1 shadow-xl">
                    ▶
                  </div>
                </div>
              </div>
              {/* Track Info */}
              <div className="space-y-1">
                <h3
                  className="font-bold text-lg truncate"
                  title={track.title.value}
                >
                  {track.title.value}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-600">
                    <img
                      src={track.artist.pictureUrl.value}
                      alt={track.artist.name.value}
                    />
                  </div>
                  <p className="text-slate-400 text-sm truncate">
                    {track.artist.name.value}
                  </p>
                </div>
              </div>
              {/* Native Audio (Temporal, luego será el vinilo) */}
              <audio
                controls
                src={track.streamUrl.value}
                className="w-full mt-4 h-8 opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && tracks.length === 0 && query && (
          <div className="text-center text-slate-500 mt-12">
            No se encontraron vinilos para esa búsqueda.
          </div>
        )}
      </div>
    </div>
  )
}

export default App
