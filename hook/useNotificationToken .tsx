import { useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform, Alert } from 'react-native';
import { storeData } from '../utils';

export const useNotificationToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setToken(token);
        storeData("EXPO_TOKEN", token);
      }
    });
  }, []);

  // Request permissions and get the token
  const registerForPushNotificationsAsync = async (): Promise<string | null> => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        setHasPermission(false);
        Alert.alert(
          'Permission Denied',
          'Enable notifications in settings to receive updates.'
        );
        return null;
      }

      setHasPermission(true);

      // Get the projectId from expo-constants
      const projectId = Constants?.expoConfig?.extra?.eas?.projectId;

      if (!projectId) {
        throw new Error("Project ID is missing");
      }

      // Get the token for push notifications with projectId
      const tokenData = await Notifications.getExpoPushTokenAsync({ projectId });
      const token = tokenData.data;

      //console.log('Notification Token:', token);

      return token;
    } catch (error) {
      console.error('Error getting notification token:', error);
      return null;
    }
  };

  return { token, hasPermission };
};
