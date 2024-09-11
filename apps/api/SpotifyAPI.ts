import Config from "react-native-config";
import { CustomErrorHandler, SpotifyAPIErrorType } from "../utils/errorHandler";
import Base64 from "../utils/base64";
import { SongType, TrackItems } from "../types/spotify.types";
import { StorageKey, StorageManager } from "../utils/storage";

export interface SpotifyAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export class SpotifyAPI {
  private client_id;
  private client_secret;

  public static shared: SpotifyAPI;

  constructor() {
    this.client_id = Config.SPOTIFY_CLIENT_ID;
    this.client_secret = Config.SPOTIFY_CLIENT_SECRET;
  }

  public static getInstance() {
    if (!SpotifyAPI.shared) {
      SpotifyAPI.shared = new SpotifyAPI();
    }
    return SpotifyAPI.shared;
  }
  /**
   * Access Token을 받아옵니다.
   * @returns 토큰과 각종 정보들을 받아옵니다.
   */
  public async fetchAccessToken(): Promise<SpotifyAuthToken> {
    const urlParams = new URLSearchParams();
    urlParams.append("grant_type", "client_credentials");

    const options: RequestInit = {
      headers: {
        Authorization: "Basic " + Base64.encode(this.client_id + ":" + this.client_secret),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      body: urlParams.toString(),
    };

    const response = await fetch("https://accounts.spotify.com/api/token", options);

    if (200 <= response.status && response.status <= 299) {
      const result = (await response.json()) as SpotifyAuthToken;
      await StorageManager.setItem({
        key: StorageKey.authToken,
        value: result.access_token,
      });
      return result;
    } else if (response.status == 400) {
      throw new CustomErrorHandler<SpotifyAPIErrorType>({
        name: "BAD_REQUEST_ERROR",
        message: "요청이 잘못되었습니다.",
        cause: undefined,
      });
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
  }

  // private async fetchRefreshToken() {
  //   try {
  //     const urlParams = new URLSearchParams();
  //     const refreshToken = await StorageManager.getItem<string>({ key: StorageKey.refreshToken });
  //     if (refreshToken && this.client_id) {
  //       urlParams.append("grant_type", "refresh_token");
  //       urlParams.append("refresh_token", refreshToken);
  //       urlParams.append("client_id", this.client_id);
  //     } else {
  //       throw new CustomErrorHandler<SpotifyAPIErrorType>({
  //         name: "UNDEFIND_TOKEN_ERROR",
  //         message: "리프레시 토큰 에러",
  //         cause: undefined,
  //       });
  //     }

  //     const options: RequestInit = {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       method: "POST",
  //       body: urlParams.toString(),
  //     };
  //     const response = await fetch("https://accounts.spotify.com/api/token", options);

  //     if (200 <= response.status && response.status <= 299) {
  //       const result = (await response.json()) as SpotifyAuthToken;
  //       await storeStorage(StorageKey.authToken, result.access_token);
  //       await storeStorage(StorageKey.refreshToken, result.refresh_token);
  //     } else {
  //       throw new CustomErrorHandler<SpotifyAPIErrorType>({
  //         name: "SERVER_ERROR",
  //         message: "리프레시 토큰 에러",
  //         cause: undefined,
  //       });
  //     }
  //   } catch (e) {
  //     console.error(e);
  //     throw new CustomErrorHandler<SpotifyAPIErrorType>({
  //       name: "UNKNOWN_ERROR",
  //       message: "알 수 없는 에러",
  //       cause: e,
  //     });
  //   }
  // }

  /**
   *
   * @param searchParams SpotifyAPI를 통해 검색할 노래, 앨범 등 검색 파라미터입니다.
   * @param limit (optional)반환되는 검색 결과의 개수입니다. 10개로 고정되어 있습니다.
   * @param token 검색 API에 사용될 access_token값입니다.
   * @returns 검색결과가 반환됩니다.
   */
  public async fetchSearchSong({
    searchParams,
    limit = 10,
    token,
  }: {
    searchParams: string;
    limit?: number;
    token: string | null;
  }): Promise<TrackItems[]> {
    const url = new URLSearchParams({
      q: searchParams,
      type: "track",
      market: "KR",
      limit: `${limit}`,
    });

    if (!token) {
      const { access_token } = await this.fetchAccessToken();
      token = access_token;
    }

    const searchWithAuth = async (token: string): Promise<Response> => {
      const options: RequestInit = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache",
        },
      };

      return await fetch(`https://api.spotify.com/v1/search?${url.toString()}`, options);
    };

    try {
      let response = await searchWithAuth(token);
      if (response.status === 401) {
        const { access_token } = await this.fetchAccessToken();
        response = await searchWithAuth(access_token);
      }

      if (response.ok) {
        const result = (await response.json()) as SongType;
        return result.tracks.items;
      } else {
        throw new CustomErrorHandler<SpotifyAPIErrorType>({
          name: "SERVER_ERROR",
          message: "검색기능 에러",
          cause: undefined,
        });
      }
    } catch (e) {
      throw new CustomErrorHandler<SpotifyAPIErrorType>({
        name: "UNKNOWN_ERROR",
        message: "알 수 없는 에러",
        cause: e,
      });
    }
  }
}
