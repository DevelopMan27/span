import firestore from "@react-native-firebase/firestore";
import { TokenData, User } from "./type";
import { MMKV } from "react-native-mmkv";
import { Alert } from "react-native";
import { Expo } from "expo-server-sdk";

export const storage = new MMKV();

export let ROOMS_COLLECTION_NAME = "rooms";
export let USERS_COLLECTION_NAME = "users";

export const createUserInFirestore = async (user: User) => {
  await firestore().collection(USERS_COLLECTION_NAME).doc(user.id).set({
    createdAt: firestore.FieldValue.serverTimestamp(),
    firstName: user.firstName,
    imageUrl: user.imageUrl,
    lastName: user.lastName,
    lastSeen: user.lastSeen,
    metadata: user.metadata,
    role: user.role,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  });
};

export type SecureStoreKey =
  | "API_USER"
  | "USER_DATA"
  | "USER_TOKEN"
  | "EXPIRY_DATE"
  | "EXPO_TOKEN"
  | "QR_STSTEM_ADMIN"
  | "QR_SYSTEM_TYPE";

export const storeData = async (key: SecureStoreKey, value: string) => {
  try {
    storage.set(key, value);
    return true;
  } catch (e) {
    Alert.alert("Error while saving data", key);
  }
};

export const getData = async (key: SecureStoreKey) => {
  try {
    const value = storage.getString(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    Alert.alert("Error while reading data", key);
  }
};

export const clearData = async (key: SecureStoreKey) => {
  try {
    storage.delete(key);
  } catch (error) {
    Alert.alert("Error while deleting data", key);
  }
};

export const hasTimestampPassed = (unixTimestamp: number) => {
  // Convert Unix timestamp from seconds to milliseconds
  const timestampMilliseconds = unixTimestamp * 1000;

  // Get the current time in milliseconds
  const currentTimeMilliseconds = Date.now();

  // Check if the timestamp has passed
  return timestampMilliseconds < currentTimeMilliseconds;
};

export const getUserToken = async () => {
  const userToken = await getData("USER_TOKEN");
  if (userToken) {
    const token = JSON.parse(userToken);
    return token;
  } else {
    return undefined;
  }
};

export const getUserData = async () => {
  const userData = await getData("USER_DATA");
  if (userData) {
    const userDetails = JSON.parse(userData);
    return userDetails as TokenData;
  } else {
    return undefined;
  }
};

export const convertDateFormat = (dateString: string) => {
  // Split the input date string by "-"
  const [year, month, day] = dateString.split("-");

  // Return the date in "DD/MM/YYYY" format
  return `${day}/${month}/${year}`;
};

export const getGreetingMessage = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return greeting;
};

export const formatDateForProductDetails = (date: Date) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
};

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const statusColorMap: { [key: string]: string } = {
  "0": "#0A509C",
  "1": "#008000",
  "2": "#FF0000",
};
export const statusColorMapParts: { [key: string]: string } = {
  "0": "#0A509C",
  "1": "#cb4335",
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "0":
      return "Pending";
    case "1":
      return "Active";
    case "2":
      return "De Active";
    default:
      return "Unknown";
  }
};

export const userTypeTextMap: { [key: string]: string } = {
  "0": "New Registered",
  "1": "Regular User",
  "2": "Super User",
  "3": "Admin",
};

export const getUserTypeNumber = (userType) => {
  const userTypeMap = {
    "Regular User": 1,
    "Super User": 2,
    Admin: 3,
  };

  return userTypeMap[userType];
};
