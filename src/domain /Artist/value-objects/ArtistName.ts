export class ArtistName {
  readonly value: string

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("ArtistName is required")
    }
    this.value = value
  }
}
