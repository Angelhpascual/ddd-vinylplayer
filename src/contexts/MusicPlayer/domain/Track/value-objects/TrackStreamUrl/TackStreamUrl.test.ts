import { describe, expect, it } from "vitest"
import { TrackStreamUrl } from "./TrackStreamUrl"

describe("TrackStreamUrl", () => {
  it("Should create a TrackStreamUrl", () => {
    const trackStreamUrl = new TrackStreamUrl("https://example.com/stream")
    expect(trackStreamUrl).toBeInstanceOf(TrackStreamUrl)
  })
  it("Should return the value", () => {
    const trackStreamUrl = new TrackStreamUrl("https://example.com/stream")
    expect(trackStreamUrl.value).toBe("https://example.com/stream")
  })
})
