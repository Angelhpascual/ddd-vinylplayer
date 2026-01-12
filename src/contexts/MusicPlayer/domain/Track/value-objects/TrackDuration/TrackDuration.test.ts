import { describe, expect, it } from "vitest"
import { TrackDuration } from "./TrackDuration"

describe("TrackDuration", () => {
  it("Should create a TrackDuration", () => {
    const trackDuration = new TrackDuration(1)
    expect(trackDuration).toBeInstanceOf(TrackDuration)
  })
  it("Should return the value", () => {
    const trackDuration = new TrackDuration(1)
    expect(trackDuration.value).toBe(1)
  })
  it("Should format duration to mm:ss", () => {
    const duration = new TrackDuration(125)
    expect(duration.toHumanReadable()).toBe("2:05")
  })
  it("Should throw error if duration is negative", () => {
    expect(() => new TrackDuration(-1)).toThrow(
      "TrackDuration cannot be negative"
    )
  })
})
