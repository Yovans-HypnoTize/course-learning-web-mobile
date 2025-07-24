import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

// Store data in async storage
export const storeDataInCookie = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Data saved successfully');
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

// Retrieve data from async storage
export const getDataFromCookie = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Retrieved data:', value);
      return value;
    }
    return null;
  } catch (e) {
    console.error('Error retrieving data:', e);
    return null;
  }
};

// Remove data from async storage
export const removeStoredItemInCookie = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item with key '${key}':`, error);
  }
};

// export const baseURL = 'http://192.168.1.3:5173/api/v1/';
export const baseURL = 'http://192.168.1.10:8080/api/v1/';

export const toastAndroid = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export const formatURI = (uri?: string) => {
  if (!uri) return '';
  return uri.replace('localhost', '192.168.1.10');
};

export const firstLetterToUppercase = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};
