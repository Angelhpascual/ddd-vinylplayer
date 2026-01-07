import type { Track } from "../domain/Track/Track"
import type { TrackRepository } from "../domain/TrackRepository"

export class TrackSearcher {
  private readonly repository: TrackRepository

  constructor(repository: TrackRepository) {
    this.repository = repository
  }

  async search(query: string): Promise<Track[]> {
    if (!query.trim()) {
      return []
    }
    return this.repository.search(query)
  }
}
