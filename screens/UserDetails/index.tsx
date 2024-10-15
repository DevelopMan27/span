import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../type";
import { RouteNames } from "../../navigation/routesNames";
import { Alert, Button, Pressable, StyleSheet, Text, View } from "react-native";
import {
  getStatusText,
  getUserToken,
  statusColorMap,
  userTypeTextMap,
} from "../../utils";
import React, { useEffect, useState } from "react";
import { btoa } from "react-native-quick-base64";
import { GlobalAppColor, GlobalFont, GlobalStyle } from "../../CONST";
import BottomSheet from "../../components/BottomSheetComponent";
import { AdminBottomSheetChild } from "../Home/components/HomeView/AdminBottomSheetChild";
import { useBottomSheetContext } from "../../contexts/BottomSheetContext";
import { UpdateUserTypeChild } from "./UpdateUserTypeChild";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
interface User {
  id: string;
  username: string;
  user_type: string;
  mobile: string;
  designation: string;
  status: string;
  email: string;
  created: string;
}

type UserDetailsProps = RouteProp<RootStackParamList, RouteNames.UserDetails>;
export const UserDetails = () => {
  const {
    params: { id },
  } = useRoute<UserDetailsProps>();
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const {
    refRBSheet,
    selectAdminBSheetRef,
    openSelectAdminBottomSheetFun,
    closeQRScanBottomSheetFun,
    UpdateUserTypeBSheetRef,
    openUpdateUserTypeBottomSheetFun,
    closeUpdateUserTypeBottomSheetFun
  } = useBottomSheetContext();
  const handleModifyType = () => {
    Alert.alert("Modify Type button pressed");
  };

  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: RouteNames.UserList }],
      });
      return true;
    };
  
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
  
    return () => backHandler.remove();
  }, [navigation]);
  
  const handleActiveDeactivate = async (statusToUpdate: string) => {
    const token = await getUserToken();
    const dObject = {
      authorization: token,
      input: {
        user_role: "3", // upateafter
        user_id: id,
        req_type: "status",
        user_type: "",
        user_status: statusToUpdate,
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    //console.log("finalData", JSON.stringify(finalData));
    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/modify_user.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );

    const result = await response.json();
    //console.log("===result", result);
    getUserDetails(id);
  };

  const getUserDetails = async (id: string) => {
    try {
      const token = await getUserToken();
      const dObject = {
        authorization: token,
        input: {
          req_type: "view",
          id: id,
          username: "",
          designation: "",
          email: "",
        },
      };
      const encodedData = btoa(JSON.stringify(dObject));
      const finalData = { data: encodedData };
      //console.log("finalData", JSON.stringify(finalData));
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/single_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      const result = await response.json();
      console.log("result", result);
      setUserData(result?.data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id]);

  function formatDate(dateStr) {
    // Parse the original date string
    const date = new Date(dateStr);

    // Define the options for formatting
    const options = { day: "numeric", month: "long", year: "numeric" };

    // Format the date to the desired format
    return date.toLocaleDateString("en-GB", options);
  }

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle600_20_27,
              { fontSize: 22, lineHeight: 25, flex: 1, color: "#000000" },
            ]}
          >
            {userData?.username}
          </Text>
          <View
            style={{
              borderColor: statusColorMap[userData?.status] || "#000",
              borderWidth: 1,
              paddingHorizontal: 15,
              paddingVertical: 7,
              borderRadius: 6,
              alignContent: "flex-start",
              alignItems: "flex-start",
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                color: statusColorMap[userData?.status] || "#000",
              }}
            >
              {getStatusText(userData?.status)}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25, flex: 1, color: "#00000080" },
            ]}
            numberOfLines={1}
          >
            {userData?.designation}
          </Text>

          <Text
            style={{
              color: "#00000080",
            }}
          >
            {formatDate(userData?.created)}
          </Text>
        </View>

        <View
          style={{
            height: 1.5,
            backgroundColor: "#000000CC",
            opacity: 0.1,
            marginTop: 26,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 6,
            marginTop: 15,
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            Contact No :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            {userData?.mobile}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 6,
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            Email Id :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            {userData?.email}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 6,
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            User Type :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            {userTypeTextMap[userData?.user_type]}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            {
              display: "flex",
              height: 48,
              width: "auto",
              backgroundColor: "#0A509C",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 32,
            },
            { width: "100%", marginTop: 36 },
            pressed && {
              backgroundColor: "#083D75",
            },
          ]}
          onPress={() => {
            openUpdateUserTypeBottomSheetFun();
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 16, color: GlobalAppColor.White },
            ]}
          >
            Modify Type
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              display: "flex",
              height: 48,
              width: "auto",
              backgroundColor: "#D8E0EC",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 32,
            },
            { width: "100%", marginTop: 25 },
            pressed && {
              opacity: 0.7,
            },
          ]}
          onPress={async () => {
            // Check if the user's status is "Active"
            if (getStatusText(userData?.status) === "Active") {
              // Show a confirmation alert
              Alert.alert(
                "De Activate Confirmation",
                "Are you sure you want to deactivate the user?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      // Deactivate the user
                      await handleActiveDeactivate("2");
                    },
                  },
                ]
              );
            } else {
              // Show a confirmation alert
              Alert.alert(
                "Activate Confirmation",
                "Are you sure you want to activate the user?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      // Activate the user
                      await handleActiveDeactivate("1");
                    },
                  },
                ]
              );
            }
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 16, color: GlobalAppColor.Black },
            ]}
          >
            {/* {getStatusText(userData?.status)} */}
            {getStatusText(userData?.status) === "Active"
              ? 
              "Deactive":"Active"}
          </Text>
        </Pressable>
      </View>
      <BottomSheet height={450} bottomSheetRef={UpdateUserTypeBSheetRef}>
        <UpdateUserTypeChild
          id={id}
          userType={userTypeTextMap[userData?.user_type]}
          getUserDetails={getUserDetails}
          bottomSheetRef={closeUpdateUserTypeBottomSheetFun}
        />
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  position: {
    fontSize: 18,
    color: "#696969",
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: "#a9a9a9",
    marginBottom: 20,
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#dcdcdc",
    marginVertical: 20,
  },
  detail: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
