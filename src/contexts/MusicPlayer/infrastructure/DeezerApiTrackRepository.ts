import type { Track } from "../domain/Track/Track"
import type { TrackRepository } from "../domain/TrackRepository"
import type { DeezerSearchResponse } from "./DeezerTrackDTO"
import { DeezerTrackMapper } from "./DeezerTrackMapper"

export class DeezerApiTrackRepository implements TrackRepository {
  private readonly BASE_URL = "https://api.deezer.com/search"

  async search(query: string): Promise<Track[]> {
    const url = `https://corsproxy.io/?${encodeURIComponent(
      `${this.BASE_URL}?q=${query}`
    )}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch tracks")
    }
    const json = (await response.json()) as DeezerSearchResponse
    return json.data.map((item) => {
      return DeezerTrackMapper.toDomain(item)
    })
  }
}
