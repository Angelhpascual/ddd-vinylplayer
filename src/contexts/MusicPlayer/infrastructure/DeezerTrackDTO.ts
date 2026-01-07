export interface DeezerTrackDTO {
  id: number
  title: string
  duration: number
  preview: string
  artist: {
    id: number
    name: string
    picture_xl: string
  }
  album: {
    id: number
    title: string
    cover_xl: string
  }
}

export interface DeezerSearchResponse {
  data: DeezerTrackDTO[]
  total: number
}
