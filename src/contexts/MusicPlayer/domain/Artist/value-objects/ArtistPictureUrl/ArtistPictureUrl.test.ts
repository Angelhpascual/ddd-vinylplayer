import { describe, expect, it } from "vitest"
import { ArtistPictureUrl } from "./ArtistPictureUrl"

describe("ArtistPictureUrl", () => {
  it("Should create a ArtistPictureUrl", () => {
    const artistPictureUrl = new ArtistPictureUrl(
      "https://example.com/picture.jpg"
    )
    expect(artistPictureUrl).toBeInstanceOf(ArtistPictureUrl)
  })
  it("Should return the value", () => {
    const artistPictureUrl = new ArtistPictureUrl(
      "https://example.com/picture.jpg"
    )
    expect(artistPictureUrl.value).toBe("https://example.com/picture.jpg")
  })
  it("Should throw error if URL is invalid", () => {
    expect(() => new ArtistPictureUrl("invalid-url")).toThrow(
      "ArtistPictureUrl must be a valid URL"
    )
  })
})
