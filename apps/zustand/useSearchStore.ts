import { SpotifyAPI } from "../api/SpotifyAPI.ts";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TrackItems } from "../types/spotify.types.ts";

interface SearchSlice {
  searchParams: string;
  searchResult: TrackItems[] | null;
  selectedSong: TrackItems | null;
  setSearchParams: (p: string) => void;
  searchSongs: (t: string | null) => void;
  setSelectedSong: (song: TrackItems) => void;
}

const spotifyAPI = SpotifyAPI.getInstance();
export const useSearchStore = create<SearchSlice>()(
  devtools((set, get) => ({
    searchParams: "",
    searchResult: null,
    selectedSong: null,
    setSearchParams: params => {
      set({ searchParams: params }, undefined, "SEARCH/SET_SEARCH");
    },
    searchSongs: async (token: string | null) => {
      const params = get().searchParams;
      const result = await spotifyAPI.fetchSearchSong({
        token: token,
        limit: 10,
        searchParams: params,
      });
      set({ searchResult: result }, undefined, "SEARCH/SEARCH_SONG");
    },
    setSelectedSong: (selectedSong: TrackItems | null) => {
      set({ selectedSong }, undefined, "SEARCH/SELECT_SONG");
    },
  })),
);
