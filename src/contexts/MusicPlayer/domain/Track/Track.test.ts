import { describe, expect, it } from "vitest"
import { Artist } from "../Artist/Artist"
import { ArtistId } from "../Artist/value-objects/ArtistId/ArtistId"
import { ArtistName } from "../Artist/value-objects/ArtistName/ArtistName"
import { ArtistPictureUrl } from "../Artist/value-objects/ArtistPictureUrl/ArtistPictureUrl"
import { Track } from "./Track"
import { TrackCoverUrl } from "./value-objects/TrackCoverUrl/TrackCoverUrl"
import { TrackDuration } from "./value-objects/TrackDuration/TrackDuration"
import { TrackId } from "./value-objects/TrackId/TrackId"
import { TrackStreamUrl } from "./value-objects/TrackStreamUrl/TrackStreamUrl"
import { TrackTitle } from "./value-objects/TrackTitle/TrackTitle"

describe("Track", () => {
  it("Should create a Track instance with all itls dependencies", () => {
    const artist = new Artist(
      new ArtistId("1"),
      new ArtistName("Artist Name"),
      new ArtistPictureUrl("https://example.com/picture.jpg")
    )
    const trackId = new TrackId("1")
    const trackTitle = new TrackTitle("One More Time")
    const trackDuration = new TrackDuration(320)
    const streamUrl = new TrackStreamUrl("https://example.com/stream")
    const coverUrl = new TrackCoverUrl("https://example.com/cover.jpg")
    const track = new Track(
      trackId,
      trackTitle,
      trackDuration,
      streamUrl,
      coverUrl,
      artist
    )
    expect(track).toBeInstanceOf(Track)
    expect(track.id).toBe(trackId)
    expect(track.title).toBe(trackTitle)
    expect(track.duration).toBe(trackDuration)
    expect(track.streamUrl).toBe(streamUrl)
    expect(track.coverUrl).toBe(coverUrl)
    expect(track.artist).toBe(artist)
  })
})
