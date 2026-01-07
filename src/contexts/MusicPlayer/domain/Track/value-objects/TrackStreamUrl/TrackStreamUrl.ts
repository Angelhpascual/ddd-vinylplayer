export class TrackStreamUrl {
  readonly value: string

  constructor(value: string) {
    try {
      new URL(value)
    } catch {
      throw new Error("TrackStreamUrl must be a valid URL")
    }
    this.value = value
  }
}
