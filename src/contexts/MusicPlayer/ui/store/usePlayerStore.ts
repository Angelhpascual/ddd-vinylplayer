import { create } from "zustand"
import type { Track } from "../../domain/Track/Track"

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean

  play: (track: Track) => void
  pause: () => void
  stop: () => void
  togglePlay: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,

  play: (track: Track) => set({ currentTrack: track, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  stop: () => set({ currentTrack: null, isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}))
