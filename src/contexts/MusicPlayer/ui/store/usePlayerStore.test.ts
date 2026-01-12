import { beforeEach, expect, it } from "vitest"
import { describe } from "vitest"
import { usePlayerStore } from "./usePlayerStore"
import { Track } from "../../domain/Track/Track"
import { TrackId } from "../../domain/Track/value-objects/TrackId/TrackId"
import { TrackTitle } from "../../domain/Track/value-objects/TrackTitle/TrackTitle"
import { TrackDuration } from "../../domain/Track/value-objects/TrackDuration/TrackDuration"
import { TrackStreamUrl } from "../../domain/Track/value-objects/TrackStreamUrl/TrackStreamUrl"
import { TrackCoverUrl } from "../../domain/Track/value-objects/TrackCoverUrl/TrackCoverUrl"
import { Artist } from "../../domain/Artist/Artist"
import { ArtistId } from "../../domain/Artist/value-objects/ArtistId/ArtistId"
import { ArtistName } from "../../domain/Artist/value-objects/ArtistName/ArtistName"
import { ArtistPictureUrl } from "../../domain/Artist/value-objects/ArtistPictureUrl/ArtistPictureUrl"

describe("usePlayerStore", () => {
  beforeEach(() => {
    const { stop } = usePlayerStore.getState()
    stop()
  })

  it("Should have a initial state", () => {
    const state = usePlayerStore.getState()
    expect(state.currentTrack).toBeNull()
    expect(state.isPlaying).toBe(false)
  })

  it("Should play a track", () => {
    const track = new Track(
      new TrackId("1"),
      new TrackTitle("Test"),
      new TrackDuration(120),
      new TrackStreamUrl("http://test.com/stream"),
      new TrackCoverUrl("http://test.com/cover"),
      new Artist(
        new ArtistId("1"),
        new ArtistName("Test"),
        new ArtistPictureUrl("http://test.com/picture")
      )
    )
    const { play } = usePlayerStore.getState()
    play(track)
  })
})
