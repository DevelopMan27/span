import { ActivityIndicator, Platform, Text, View } from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import { getData, getUserData, getUserToken } from "../../utils";
import { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { btoa } from "react-native-quick-base64";

interface Notification {
  id: string;
  title: string;
  message: string;
}

export const NotificationList = () => {
  const [notificationList, setNotificationList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const shadowStyle = Platform.select({
    // ios: {
    //   shadowColor: "#0000000F",
    //   shadowOffset: { width: 0, height: 4 },
    //   shadowOpacity: 0.15,
    //   shadowRadius: 14,
    // },
    // android: {
    //   elevation: 1, // Adjust this value for a similar effect
    // },
  });

  const getNotificationList = async (id: string) => {
    try {
      const token = await getUserToken();
      const dObject = {
        authorization: token,
        input: {
          emp_id: id,
        },
      };
      const encodedData = btoa(JSON.stringify(dObject));
      const finalData = { data: encodedData };
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/list_notification.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        console.log("result", "erroe");

        throw new Error("Network response was not ok");

      }

      const result = await response.json();
      setNotificationList(result.data);
      console.log("result", result);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false); // Stop loading when done
    }
  };
  const getUser = async () => {
    try {
      const userData = await getUserData();
      if (userData?.id) {
        await getNotificationList(userData.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({ item }: { item: Notification }) => {
    return (
      <View
        style={[
          {
            padding: 13,
            borderWidth: 1,
            margin:10,
            borderRadius: 6,
            borderColor:GlobalAppColor.GREY,
            shadowColor:GlobalAppColor.AppGrey,
            backgroundColor:GlobalAppColor.AppWhite
          },
          shadowStyle,
        ]}
      >
        {/* <Text
          style={[
            GlobalStyle.TextStyle600_20_27,
            { fontSize: 14, lineHeight: 19 },
          ]}
        >
          {item.title}
        </Text> */}
        <Text style={{ color: "#000000CC" }}>{item.message}</Text>
      </View>
    );
  };

  return (
    <FlashList
      data={notificationList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique id
      estimatedItemSize={70}
    />
  );
};
