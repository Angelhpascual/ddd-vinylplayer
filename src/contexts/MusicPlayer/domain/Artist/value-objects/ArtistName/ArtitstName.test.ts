import { describe, expect, it } from "vitest"
import { ArtistName } from "./ArtistName"

describe("ArtistName", () => {
  it("Should create a ArtistName", () => {
    const artistName = new ArtistName("Artist Name")
    expect(artistName).toBeInstanceOf(ArtistName)
  })
  it("Should return the value", () => {
    const artistName = new ArtistName("Artist Name")
    expect(artistName.value).toBe("Artist Name")
  })
  it("Should throw error if name is empty", () => {
    expect(() => new ArtistName("")).toThrow("ArtistName is required")
  })
})
