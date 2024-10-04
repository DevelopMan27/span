import { useEffect } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const useLastNotificationResponse = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (lastNotificationResponse) {
      console.log(
        "lastNotificationResponse",
        lastNotificationResponse.notification.request.content
      );
    }
  }, [lastNotificationResponse]);

  return null;
};
