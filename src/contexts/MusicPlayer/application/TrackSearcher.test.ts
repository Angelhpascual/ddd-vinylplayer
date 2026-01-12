import { describe, expect, it, vi } from "vitest"
import type { TrackRepository } from "../domain/TrackRepository"
import { TrackSearcher } from "./TrackSearcher"
import { beforeEach } from "vitest"
import { Track } from "../domain/Track/Track"
import { TrackTitle } from "../domain/Track/value-objects/TrackTitle/TrackTitle"
import { TrackDuration } from "../domain/Track/value-objects/TrackDuration/TrackDuration"
import { TrackId } from "../domain/Track/value-objects/TrackId/TrackId"
import { TrackStreamUrl } from "../domain/Track/value-objects/TrackStreamUrl/TrackStreamUrl"
import { TrackCoverUrl } from "../domain/Track/value-objects/TrackCoverUrl/TrackCoverUrl"
import { Artist } from "../domain/Artist/Artist"
import { ArtistId } from "../domain/Artist/value-objects/ArtistId/ArtistId"
import { ArtistName } from "../domain/Artist/value-objects/ArtistName/ArtistName"
import { ArtistPictureUrl } from "../domain/Artist/value-objects/ArtistPictureUrl/ArtistPictureUrl"

describe("TrackSearcher", () => {
  const mockRepository: TrackRepository = {
    search: vi.fn(),
  }

  let searcher: TrackSearcher

  beforeEach(() => {
    vi.clearAllMocks()
    searcher = new TrackSearcher(mockRepository)
  })

  it("Should return an empty array if the query is empty", async () => {
    const results = await searcher.search("   ")
    expect(results).toEqual([])
    expect(mockRepository.search).not.toHaveBeenCalled()
  })

  it("Should call the repository with the given query", async () => {
    const query = "Daft Punk"

    vi.mocked(mockRepository.search).mockResolvedValue([])
    const results = await searcher.search(query)
    expect(results).toEqual([])
    expect(mockRepository.search).toHaveBeenCalledWith(query)
    expect(mockRepository.search).toHaveBeenCalledTimes(1)
  })

  it("Should return the tracks from repository", async () => {
    const expectedTracks: Track[] = [
      new Track(
        new TrackId("1"),
        new TrackTitle("One More Time"),
        new TrackDuration(320),
        new TrackStreamUrl("https://example.com/stream"),
        new TrackCoverUrl("https://example.com/cover.jpg"),
        new Artist(
          new ArtistId("1"),
          new ArtistName("Artist Name"),
          new ArtistPictureUrl("https://example.com/picture.jpg")
        )
      ),
    ]
    vi.mocked(mockRepository.search).mockResolvedValue(expectedTracks)
    const results = await searcher.search("Daft Punk")
    expect(results).toEqual(expectedTracks)
    expect(mockRepository.search).toHaveBeenCalledWith("Daft Punk")
    expect(mockRepository.search).toHaveBeenCalledTimes(1)
  })
})
