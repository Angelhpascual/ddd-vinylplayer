export class ArtistId {
  readonly value: string

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("ArtistId is required")
    }
    this.value = value
  }
}
