import type { Artist } from "../Artist/Artist"
import type { TrackCoverUrl } from "./value-objects/TrackCoverUrl/TrackCoverUrl"
import type { TrackDuration } from "./value-objects/TrackDuration/TrackDuration"
import type { TrackId } from "./value-objects/TrackId/TrackId"
import type { TrackStreamUrl } from "./value-objects/TrackStreamUrl/TrackStreamUrl"
import type { TrackTitle } from "./value-objects/TrackTitle/TrackTitle"

export class Track {
  readonly id: TrackId
  readonly title: TrackTitle
  readonly duration: TrackDuration
  readonly streamUrl: TrackStreamUrl
  readonly coverUrl: TrackCoverUrl
  readonly artist: Artist

  constructor(
    id: TrackId,
    title: TrackTitle,
    duration: TrackDuration,
    streamUrl: TrackStreamUrl,
    coverUrl: TrackCoverUrl,
    artist: Artist
  ) {
    this.id = id
    this.title = title
    this.duration = duration
    this.streamUrl = streamUrl
    this.coverUrl = coverUrl
    this.artist = artist
  }
}
