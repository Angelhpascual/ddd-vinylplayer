import { describe, expect, it } from "vitest"
import { TrackCoverUrl } from "./TrackCoverUrl"

describe("TrackCoverUrl", () => {
  it("Should create a TrackCoverUrl", () => {
    const trackCoverUrl = new TrackCoverUrl("https://example.com/cover.jpg")
    expect(trackCoverUrl).toBeInstanceOf(TrackCoverUrl)
  })
  it("Should return the value", () => {
    const trackCoverUrl = new TrackCoverUrl("https://example.com/cover.jpg")
    expect(trackCoverUrl.value).toBe("https://example.com/cover.jpg")
  })
  it("Should throw error if URL is invalid", () => {
    expect(() => new TrackCoverUrl("invalid-url")).toThrow(
      "TrackCoverUrl must be a valid URL"
    )
  })
})
