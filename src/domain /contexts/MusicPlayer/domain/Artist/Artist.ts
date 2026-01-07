import type { ArtistId } from "./value-objects/ArtistId"
import type { ArtistName } from "./value-objects/ArtistName"
import type { ArtistPictureUrl } from "./value-objects/ArtistPictureUrl"

export class Artist {
  readonly id: ArtistId
  readonly name: ArtistName
  readonly pictureUrl: ArtistPictureUrl

  constructor(id: ArtistId, name: ArtistName, pictureUrl: ArtistPictureUrl) {
    this.id = id
    this.name = name
    this.pictureUrl = pictureUrl
  }
}
