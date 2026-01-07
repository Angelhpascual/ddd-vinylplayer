export class TrackCoverUrl {
  readonly value: string

  constructor(value: string) {
    try {
      new URL(value)
    } catch {
      throw new Error("TrackCoverUrl must be a valid URL")
    }
    this.value = value
  }
}
