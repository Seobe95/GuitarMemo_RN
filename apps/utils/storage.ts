import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomErrorHandler, StorageErrorType } from "./errorHandler";

export enum StorageKey {
  authToken = "auth",
  refreshToken = "refresh",
}

/**
 * AsyncStorage를 관리하는 class입니다.
 */
export class StorageManager {
  static async setItem({ key, value }: { key: StorageKey; value: string }) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new CustomErrorHandler<StorageErrorType>({
        name: "STROE_ERROR",
        message: "Store Item Error",
        cause: error,
      });
    }
  }

  static async getItem<T>({ key }: { key: StorageKey }): Promise<T | null> {
    try {
      const result = await AsyncStorage.getItem(key);
      if (result) {
        return JSON.parse(result) as T;
      }
      return null;
    } catch (error) {
      throw new CustomErrorHandler<StorageErrorType>({
        name: "GET_ERROR",
        message: "Get Item Error",
        cause: error,
      });
    }
  }

  static async updateItem({ key, value }: { key: StorageKey; value: string }) {
    try {
      await AsyncStorage.mergeItem(key, value);
    } catch (error) {
      throw new CustomErrorHandler<StorageErrorType>({
        name: "UPDATE_ERROR",
        message: "Update Item Error",
        cause: error,
      });
    }
  }

  static async removeItem({ key }: { key: StorageKey }) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw new CustomErrorHandler<StorageErrorType>({
        name: "REMOVE_ERROR",
        message: "remove Item Error",
        cause: error,
      });
    }
  }
}
