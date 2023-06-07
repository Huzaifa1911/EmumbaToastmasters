import {
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain';

/**
 * Clear Storage
 * @returns
 */

const clearToken = async () => {
  try {
    return await resetGenericPassword();
  } catch (error: unknown) {
    Promise.reject(error);
  }
};

/**
 * Set Access Token
 * @param {string} key
 * @param {string} token
 * @returns
 */

const setToken = async (key: string, token: string) => {
  try {
    return await setGenericPassword(key, token);
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};

/**
 * Get Access Token
 * @returns {string} | token
 */
const getToken = async (): Promise<string | null> => {
  try {
    const credentials = await getGenericPassword();
    if (credentials) return credentials.password;
    else return null;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};

export default {
  clearToken,
  getToken,
  setToken,
};
