import { create } from "zustand";
import { SpotifyAPI, SpotifyAuthToken } from "../api/SpotifyAPI";
import { devtools } from "zustand/middleware";

interface SpotifyAuthSlice {
  accessToken: string | null;
  fetchAccessToken: () => Promise<SpotifyAuthToken>;
}

const spotifyAPI = SpotifyAPI.getInstance();

export const useSpotifyAuthStore = create<SpotifyAuthSlice>()(
  devtools(
    set => ({
      accessToken: null,
      fetchAccessToken: async () => {
        const response = await spotifyAPI.fetchAccessToken();
        set({ accessToken: response.access_token }, undefined, "AUTH/ACCESSTOKEN");
        return response;
      },
    }),
    { name: "AUTH" },
  ),
);
