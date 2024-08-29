export interface SongType {
  tracks: Tracks;
}

export interface Tracks {
  items: TrackItems[];
}

export interface TrackItems {
  album: Album;
  artists: Artist;
}

interface Album {
  images: CoverImage[];
  artists: Artist[];
  name: string;
}

interface CoverImage {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  name: string;
}
