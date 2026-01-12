import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest"
import App from "./App"
import { useTrackSearch } from "./hooks/useTrackSearch"
import { usePlayerStore } from "./contexts/MusicPlayer/ui/store/usePlayerStore"

vi.mock("./hooks/useTrackSearch")
vi.mock("./contexts/MusicPlayer/ui/scenes/PlayerScene", () => ({
  PlayerScene: () => <div data-testid="player-scene">Escena 3D</div>,
}))

const useTrackSearchMock = useTrackSearch as Mock

describe("App Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    usePlayerStore.getState().stop()
  })

  it("should show results when searching", async () => {
    const mockTrack = {
      id: { value: "1" },
      title: { value: "One More Time" },
      artist: { name: { value: "Daft Punk" } },
      coverUrl: { value: "http://test.com/cover.jpg" },
    }

    useTrackSearchMock.mockReturnValue({
      tracks: [mockTrack],
      loading: false,
      error: null,
      search: vi.fn(),
    })

    render(<App />)

    const input = screen.getByPlaceholderText(/busca/i)
    fireEvent.change(input, { target: { value: "Daft Punk" } })
    fireEvent.submit(screen.getByRole("button", { name: /buscar/i }))
    expect(await screen.findByText("One More Time")).toBeDefined()
    expect(screen.getByText("Daft Punk")).toBeDefined()
  })

  it("should play a track when clicked", async () => {
    const mockTrack = {
      id: { value: "1" },
      title: { value: "One More Time" },
      artist: { name: { value: "Daft Punk" } },
      coverUrl: { value: "http://test.com/cover.jpg" },
    }

    useTrackSearchMock.mockReturnValue({
      tracks: [mockTrack],
      loading: false,
      error: null,
      search: vi.fn(),
    })

    render(<App />)

    const trackCard = await screen.findByText("One More Time")
    fireEvent.click(trackCard)

    expect(usePlayerStore.getState().currentTrack).toEqual(mockTrack)
    expect(usePlayerStore.getState().isPlaying).toBe(true)
  })
})
