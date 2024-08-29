import { useEffect, useState } from "react";
import { SpotifyAPI } from "../api/SpotifyAPI";
import { useSpotifyAuthStore } from "../zustand/useSportifyAuthStore";

export default function useSpotifyAuth() {
  const { accessToken, fetchAccessToken } = useSpotifyAuthStore();

  useEffect(() => {
    async function fetchToken() {
      await fetchAccessToken();
    }
    fetchToken();
  }, []);

  return { accessToken };
}
