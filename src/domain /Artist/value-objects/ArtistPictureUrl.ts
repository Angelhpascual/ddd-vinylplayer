export class ArtistPictureUrl {
  readonly value: string

  constructor(value: string) {
    try {
      new URL(value)
    } catch {
      throw new Error("ArtistPictureUrl must be a valid URL")
    }
    this.value = value
  }
}
