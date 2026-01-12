import { describe, expect, it } from "vitest"
import { Artist } from "./Artist"
import { ArtistId } from "./value-objects/ArtistId/ArtistId"
import { ArtistName } from "./value-objects/ArtistName/ArtistName"
import { ArtistPictureUrl } from "./value-objects/ArtistPictureUrl/ArtistPictureUrl"

describe("Artist", () => {
  it("Should create a Artist", () => {
    const id = new ArtistId("1")
    const name = new ArtistName("Artist Name")
    const pictureUrl = new ArtistPictureUrl("https://example.com/picture.jpg")
    const artist = new Artist(id, name, pictureUrl)
    expect(artist).toBeInstanceOf(Artist)
    expect(artist.id).toBe(id)
    expect(artist.name).toBe(name)
    expect(artist.pictureUrl).toBe(pictureUrl)
  })
})
