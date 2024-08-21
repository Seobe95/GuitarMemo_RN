export type SpotifyAPIErrorType =
  | "NO_CONTENT_ERROR"
  | "BAD_REQUEST_ERROR"
  | "UNAUTHORIZED_ERROR"
  | "UNDEFIND_TOKEN_ERROR"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";

export type StorageErrorType = "STROE_ERROR" | "GET_ERROR" | "REMOVE_ERROR" | "UPDATE_ERROR";

/**
 * 에러를 커스텀하여 사용합니다.
 *
 * name: 에러의 이름 or 종류
 *
 * message: 에러 설명
 *
 * cause: 에러 상세설명
 */
export class CustomErrorHandler<T extends string> extends Error {
  name: T;
  message: string;
  cause: any;

  constructor({ name, message, cause = undefined }: { name: T; message: string; cause: any }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
