import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TrackItems } from "../types/spotify.types";

interface PostSlice {
  title: string;
  content: string;
  song: TrackItems | null;
  setTitle: (p: string) => void;
  setContent: (p: string) => void;
  setSong: (p: TrackItems) => void;
  reset: () => void;
}

export const usePostStore = create<PostSlice>()(
  devtools(
    set => ({
      title: "",
      content: "",
      song: null,
      setTitle: (title: string) => {
        set({ title: title }, undefined, "POST/SET_TITLE");
      },
      setContent: (content: string) => {
        set({ content: content }, undefined, "POST/SET_CONTENT");
      },
      setSong: (song: TrackItems) => {
        set({ song }, undefined, "POST/SET_SONG");
      },
      reset: () => {
        set(
          {
            title: "",
            content: "",
          },
          undefined,
          "POST/RESET",
        );
      },
    }),
    { name: "POST" },
  ),
);
