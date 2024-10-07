import { ActivityIndicator, Platform, ScrollView, Text, View } from "react-native";
import { GlobalStyle } from "../../CONST";
import { getData, getUserData, getUserToken } from "../../utils";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/UserAuthContext";
import { btoa } from "react-native-quick-base64";
import { FlashList } from "@shopify/flash-list";

export const NotificationList = () => {
  const [notificationList, setNotificationList] = useState();
  const [loading, setLoading] = useState(true);

  const shadowStyle = Platform.select({
    ios: {
      shadowColor: "#0000000F",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 14,
    },
    android: {
      elevation: 10, // You may need to adjust this value to get a similar effect
    },
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
      const result = await response.json();
      setNotificationList(result);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getUserData();

        if (userData?.id) {
          await getNotificationList(userData.id); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, []);

        //console.log("notificationList___________",notificationList)
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          {
            padding: 13,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: "#BEC3CC",
          },
          shadowStyle,
        ]}
      >
        <Text
          style={
            (GlobalStyle.TextStyle600_20_27, { fontSize: 14, lineHeight: 19 })
          }
        >
          TORRENT PHARMA
          <Text style={{ color: "#000000CC" }}>
            {" "}
            Licence has been Approved By Mr Anil Siddhapura
          </Text>
        </Text>
      </View>
    
    )
  }

  return (
   <>
   
       <FlashList
       data={notificationList}
       renderItem={renderItem}
       keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique id
       estimatedItemSize={70} 
      />
      </>
  );
};
