import { useState } from "react"
import { TrackSearcher } from "../contexts/MusicPlayer/application/TrackSearcher"
import { DeezerApiTrackRepository } from "../contexts/MusicPlayer/infrastructure/DeezerApiTrackRepository"
import type { Track } from "../contexts/MusicPlayer/domain/Track/Track"

const repository = new DeezerApiTrackRepository()
const searcher = new TrackSearcher(repository)

export function useTrackSearch() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async (query: string) => {
    setLoading(true)
    setError(null)
    try {
      const results = await searcher.search(query)
      setTracks(results)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      )
    } finally {
      setLoading(false)
    }
  }
  return { tracks, loading, error, search }
}
