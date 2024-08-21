import { useEffect, useState } from "react";
import Base64 from "../utils/base64";
import Config from "react-native-config";
import { getStorage, StorageKey, storeStorage } from "../utils/storage";
import { CustomErrorHandler, SpotifyAPIErrorType } from "../utils/errorHandler";

interface SpotifyAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export default function useSpotifyAuth() {
  const [isLoding, setIsLoding] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<string | null>(null);
  const client_id = Config.SPOTIFY_CLIENT_KEY;
  const client_secret = Config.SPOTIFY_SECRET_KEY;

  async function fetchAuthToken(): Promise<SpotifyAuthToken> {
    try {
      const urlParams = new URLSearchParams();
      urlParams.append("grant_type", "client_credentials");

      const options: RequestInit = {
        headers: {
          Authorization: "Basic " + Base64.encode(client_id + ":" + client_secret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: urlParams.toString(),
      };

      const response = await fetch("https://accounts.spotify.com/api/token", options);

      if (200 <= response.status && response.status <= 299) {
        const result = (await response.json()) as SpotifyAuthToken;
        return result;
      } else if (response.status == 400) {
        throw new CustomErrorHandler<SpotifyAPIErrorType>({
          name: "BAD_REQUEST_ERROR",
          message: "요청이 잘못되었습니다.",
          cause: undefined,
        });
      } else if (response.status == 401) {
        const result = await fetchRefreshToken();
        return result;
      } else if (response.status >= 500) {
        throw new CustomErrorHandler<SpotifyAPIErrorType>({
          name: "SERVER_ERROR",
          message: "서버 에러입니다.",
          cause: undefined,
        });
      } else {
        throw new CustomErrorHandler<SpotifyAPIErrorType>({
          name: "UNKNOWN_ERROR",
          message: "확인되지 않은 에러입니다.",
          cause: undefined,
        });
      }
    } catch (error) {
      throw new CustomErrorHandler<SpotifyAPIErrorType>({
        name: "UNKNOWN_ERROR",
        message: "확인되지 않은 에러입니다.",
        cause: error,
      });
    }
  }

  async function fetchRefreshToken(): Promise<SpotifyAuthToken> {
    try {
      const urlParams = new URLSearchParams();
      const refreshToken = await getStorage<string>(StorageKey.refreshToken);
      if (refreshToken && client_id) {
        urlParams.append("grant_type", "refresh_token");
        urlParams.append("refresh_token", refreshToken);
        urlParams.append("client_id", client_id);
      } else {
        throw new CustomErrorHandler<SpotifyAPIErrorType>({
          name: "UNDEFIND_TOKEN_ERROR",
          message: "리프레시 토큰 에러",
          cause: undefined,
        });
      }

      const options: RequestInit = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: urlParams.toString(),
      };
      const response = await fetch("https://accounts.spotify.com/api/token", options);

      if (200 <= response.status && response.status <= 299) {
        const result = (await response.json()) as SpotifyAuthToken;
        return result;
      } else {
        throw new CustomErrorHandler<SpotifyAPIErrorType>({
          name: "SERVER_ERROR",
          message: "리프레시 토큰 에러",
          cause: undefined,
        });
      }
    } catch (e) {
      console.error(e);
      throw new CustomErrorHandler<SpotifyAPIErrorType>({
        name: "UNKNOWN_ERROR",
        message: "알 수 없는 에러",
        cause: e,
      });
    }
  }

  useEffect(() => {
    async function getAccessToken() {
      try {
        const { access_token, refresh_token } = await fetchAuthToken();
        console.log(access_token, refresh_token);
        await storeStorage(StorageKey.authToken, access_token);
        await storeStorage(StorageKey.refreshToken, refresh_token);
      } catch (e) {
        console.error(e);
      }
    }
    getAccessToken();
  }, []);

  return {
    fetchAuthToken,
    isAuth,
  };
}
