import { Artist } from "../domain/Artist/Artist"
import { ArtistId } from "../domain/Artist/value-objects/ArtistId/ArtistId"
import { ArtistName } from "../domain/Artist/value-objects/ArtistName/ArtistName"
import { ArtistPictureUrl } from "../domain/Artist/value-objects/ArtistPictureUrl/ArtistPictureUrl"
import { Track } from "../domain/Track/Track"
import { TrackCoverUrl } from "../domain/Track/value-objects/TrackCoverUrl/TrackCoverUrl"
import { TrackDuration } from "../domain/Track/value-objects/TrackDuration/TrackDuration"
import { TrackId } from "../domain/Track/value-objects/TrackId/TrackId"
import { TrackStreamUrl } from "../domain/Track/value-objects/TrackStreamUrl/TrackStreamUrl"
import { TrackTitle } from "../domain/Track/value-objects/TrackTitle/TrackTitle"
import type { DeezerTrackDTO } from "./DeezerTrackDTO"

export class DeezerTrackMapper {
  static toDomain(dto: DeezerTrackDTO): Track {
    const artist = new Artist(
      new ArtistId(dto.artist.id.toString()),
      new ArtistName(dto.artist.name),
      new ArtistPictureUrl(dto.artist.picture_xl)
    )
    return new Track(
      new TrackId(dto.id.toString()),
      new TrackTitle(dto.title),
      new TrackDuration(dto.duration),
      new TrackStreamUrl(dto.preview),
      new TrackCoverUrl(dto.album.cover_xl),
      artist
    )
  }
}
