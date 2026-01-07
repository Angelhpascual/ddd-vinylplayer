export class TrackId {
  readonly value: string

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("TrackId is required")
    }
    this.value = value
  }
}
