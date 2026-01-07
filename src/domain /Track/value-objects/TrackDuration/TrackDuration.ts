export class TrackDuration {
  readonly value: number

  constructor(value: number) {
    if (value < 0) {
      throw new Error("TrackDuration cannot be negative")
    }
    this.value = value
  }

  toHumanReadable(): string {
    const minutes = Math.floor(this.value / 60)
    const seconds = this.value % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
}
