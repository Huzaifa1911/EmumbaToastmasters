import AsyncStorage from '@react-native-async-storage/async-storage';

type TData = Record<string, unknown> | string;

/**
 *
 * @param {TData} data
 * @param {string} storageKey
 */

export const setData = async <T = TData>(data: T, storageKey: string) => {
  try {
    if (typeof data === 'string') {
      await AsyncStorage.setItem(storageKey, data);
    } else {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(storageKey, jsonData);
    }
  } catch (error: unknown) {}
};

/**
 *
 * @param {string} storageKey
 * @returns {TData} data
 */

export const getData = async <T = TData>(storageKey: string): Promise<T> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);
    return data !== null
      ? typeof data === 'string'
        ? data
        : JSON.parse(data)
      : null;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};

/**
 *
 * @param {string} storageKey
 */
export const removeData = async (storageKey: string) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch (error: unknown) {}
};

export default {
  removeData,
  setData,
  getData,
};
