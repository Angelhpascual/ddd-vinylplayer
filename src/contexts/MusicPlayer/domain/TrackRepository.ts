import type { Track } from "./Track/Track"

export interface TrackRepository {
  /**
   *
   * @param query Search for a song sending a query to the API, returns a list of Entities of type Track
   */

  search(query: string): Promise<Track[]>
}
