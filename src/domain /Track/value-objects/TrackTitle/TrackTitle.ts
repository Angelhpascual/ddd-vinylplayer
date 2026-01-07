export class TrackTitle {
  readonly value: string

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error("TrackTitle must be at least 1 character long")
    }
    this.value = value
  }
}
