import { describe, expect, it } from "vitest"
import { TrackId } from "./TrackId"

describe("TrackId", () => {
  it("Should create a TrackId", () => {
    const trackId = new TrackId("1")
    expect(trackId).toBeInstanceOf(TrackId)
  })
  it("Should return the value", () => {
    const trackId = new TrackId("1")
    expect(trackId.value).toBe("1")
  })
})
