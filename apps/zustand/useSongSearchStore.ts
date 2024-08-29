import { create } from "zustand";
import { TrackItems } from "../utils/spotify.types";
import { devtools } from "zustand/middleware";
import { SpotifyAPI } from "../api/SpotifyAPI";
import { debounce } from "lodash";

interface PostSlice {
  title: string;
  content: string;
  songs: string;
  searchResult: TrackItems[];
  setTitle: (p: string) => void;
  setContent: (p: string) => void;
  setSongs: (p: string) => void;
  searchSongs: (t: string | null) => void;
  reset: () => void;
}

const spotifyAPI = SpotifyAPI.getInstance();

export const usePostStore = create<PostSlice>()(
  devtools(
    (set, get) => ({
      title: "",
      content: "",
      songs: "",
      searchResult: [],
      setTitle: (title: string) => {
        set({ title: title }, undefined, "POST/SET_TITLE");
      },
      setContent: (content: string) => {
        set({ content: content }, undefined, "POST/SET_CONTENT");
      },
      setSongs: async (songs: string) => {
        set({ songs: songs }, undefined, "POST/SET_SONGS");
      },
      searchSongs: async (token: string | null) => {
        const params = get().songs;
        const result = await spotifyAPI.fetchSearchSong({ token: token, searchParams: params });
        set({ searchResult: result }, undefined, "POST/SEARCH_SONG");
      },
      reset: () => {
        set({ title: "", content: "", songs: "", searchResult: [] }, undefined, "POST/RESET");
      },
    }),
    { name: "POST" },
  ),
);
