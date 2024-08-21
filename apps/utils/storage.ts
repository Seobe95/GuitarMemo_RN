import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomErrorHandler, StorageErrorType } from "./errorHandler";

enum StorageKey {
  authToken = "auth",
  refreshToken = "refresh",
}

const storeStorage = async (key: StorageKey, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    throw new CustomErrorHandler<StorageErrorType>({
      name: "STROE_ERROR",
      message: "Store Item Error",
      cause: undefined,
    });
  }
};

const getStorage = async <T>(key: StorageKey): Promise<T | null> => {
  try {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      return JSON.parse(result) as T;
    }
    return null;
  } catch (e) {
    throw new CustomErrorHandler<StorageErrorType>({
      name: "GET_ERROR",
      message: "Get Item Error",
      cause: undefined,
    });
  }
};

const updateStorage = async (key: StorageKey, value: string) => {
  try {
    await AsyncStorage.mergeItem(key, value);
  } catch (error) {
    throw new CustomErrorHandler<StorageErrorType>({
      name: "UPDATE_ERROR",
      message: "Update Item Error",
      cause: undefined,
    });
  }
};

const removeStorage = async (key: StorageKey) => {};

export { StorageKey, storeStorage, getStorage, updateStorage, removeStorage };
