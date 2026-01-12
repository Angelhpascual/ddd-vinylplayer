import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeezerApiTrackRepository } from "./DeezerApiTrackRepository"
import { Track } from "../domain/Track/Track"

describe("DeezerApiTrackRepository", () => {
  let repository: DeezerApiTrackRepository

  beforeEach(() => {
    repository = new DeezerApiTrackRepository()
    vi.stubGlobal("fetch", vi.fn())
  })

  it("should fetch tracks from Deezer API through the proxy", async () => {
    const mockApiResponse = {
      data: [
        {
          id: 123,
          title: "Get Lucky",
          duration: 240,
          preview: "https://deezer.com/preview.mp3",
          album: { cover_xl: "https://deezer.com/cover.jpg" },
          artist: {
            id: 456,
            name: "Daft Punk",
            picture_xl: "https://deezer.com/daft.jpg",
          },
        },
      ],
    }

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    } as Response)
    const tracks = await repository.search("daft punk")

    const expectedUrl =
      "https://corsproxy.io/?https%3A%2F%2Fapi.deezer.com%2Fsearch%3Fq%3Ddaft%20punk"
    expect(fetch).toHaveBeenCalledWith(expectedUrl)

    expect(tracks).toHaveLength(1)
    expect(tracks[0]).toBeInstanceOf(Track)
    expect(tracks[0].title.value).toBe("Get Lucky")
  })

  it("should throw an error if the network response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response)

    await expect(repository.search("any")).rejects.toThrow(
      "Failed to fetch tracks"
    )
  })
})
