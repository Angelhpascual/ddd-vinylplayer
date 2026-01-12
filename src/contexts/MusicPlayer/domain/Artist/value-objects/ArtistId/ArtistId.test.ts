import { describe, expect, it } from "vitest"
import { ArtistId } from "./ArtistId"

describe("ArtistId", () => {
  it("Should create a ArtistId", () => {
    const artistId = new ArtistId("1")
    expect(artistId).toBeInstanceOf(ArtistId)
  })
  it("Should return the value", () => {
    const artistId = new ArtistId("1")
    expect(artistId.value).toBe("1")
  })
  it("Should throw error if id is empty", () => {
    expect(() => new ArtistId("")).toThrow("ArtistId is required")
  })
})
