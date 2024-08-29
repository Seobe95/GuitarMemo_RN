declare module "react-native-config" {
  export interface NativeConfig {
    SPOTIFY_CLIENT_ID?: string;
    SPOTIFY_CLIENT_SECRET?: string;
    ENV: "DEVELOP" | "RELEASE";
  }

  export const Config: NativeConfig;
  export default Config;
}
