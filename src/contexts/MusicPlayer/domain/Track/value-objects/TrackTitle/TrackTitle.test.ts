import { describe, expect, it } from "vitest"
import { TrackTitle } from "./TrackTitle"

describe("TrackTitle", () => {
  it("Should create TrackTitle", () => {
    const trackTitle = new TrackTitle("My Awesome Song")
    expect(trackTitle).toBeInstanceOf(TrackTitle)
  })
  it("Should return the title value", () => {
    const titleValue = "My Awesome Song"
    const trackTitle = new TrackTitle(titleValue)
    expect(trackTitle.value).toBe(titleValue)
  })
  it("Should throw an error if the title is empty", () => {
    expect(() => new TrackTitle("")).toThrow(
      "TrackTitle must be at least 1 character long"
    )
  })
})
