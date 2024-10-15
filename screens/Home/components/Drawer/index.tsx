import { Image, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";
import { MenuItem } from "./MenuItem";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../../../navigation/routesNames";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { clearData, getUserData } from "../../../../utils";
import { useAuthContext } from "../../../../contexts/UserAuthContext";
import { useEffect, useState } from "react";

export const Drawer = () => {
  const { navigate } = useNavigation();
  const { setAPIUSER } = useAuthContext();
  const [usertype, setUsertype] = useState("");
  useEffect(() => {
    getDatas();
  });

  const getDatas = async () => {
    const user = await getUserData();
    const ab = user?.data.user_type;
    setUsertype(ab);
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        height: "100%",
        backgroundColor: GlobalAppColor.AppBlue,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Image
            source={require("../../../../assets/Logo.png")}
            style={{ height: 50, width: 146.67 }}
          />
        </View>
        <View
          style={{
            borderColor: "#BEC3CC",
            borderWidth: 1.5,
            opacity: 0.1,
            marginTop: 41,
          }}
        ></View>

        <MenuItem
          menuName={"Home"}
          onPress={() => {
            navigate(RouteNames.HomeScreen);
          }}
        />
        <MenuItem
          menuName={"Profile"}
          onPress={() => {
            navigate(RouteNames.About);
          }}
        />
        <MenuItem
          menuName={"System List"}
          onPress={() => {
            navigate(RouteNames.License);
          }}
        />
        {usertype == "3" && (
          <>
            <MenuItem
              menuName={"User List"}
              onPress={() => {
                navigate(RouteNames.UserList);
              }}
            />
            <MenuItem
              menuName={"Announcement"}
              onPress={() => {
                navigate(RouteNames.Announcement);
              }}
            />
          </>
        )}
        {usertype === "3" || usertype === "2" ? (
          <>
            <MenuItem
              menuName={"Parts / Component"}
              onPress={() => {
                navigate(RouteNames.Parts);
              }}
            />
          </>
        ) : null}

        <MenuItem
          menuName={"Logout"}
          onPress={() => {
            Alert.alert(
              "Confirm Logout",
              "Are you sure you want to log out?",
              [
                {
                  text: "Cancel",
                  style: "cancel", // Styling for cancel button
                },
                {
                  text: "Logout",
                  onPress: async () => {
                    try {
                      await auth().signOut();
                      console.log("User signed out!");
                      await clearData("API_USER");
                      await clearData("EXPIRY_DATE");
                      await clearData("USER_DATA");
                      await clearData("USER_TOKEN");
                      setAPIUSER(false); // Make sure setAPIUSER is defined in your scope
                    } catch (error) {
                      console.error("Error signing out: ", error);
                    }
                  },
                },
              ],
              { cancelable: false } // Prevents closing the alert by tapping outside of it
            );
          }}
        />
      </View>
      <View style={{ display: "flex", marginLeft: 25 }}>
        <Text
          style={[
            GlobalStyle.TextStyle400_25_16,
            { fontSize: 12, color: GlobalAppColor.White },
          ]}
        >
          Version 1.0.0
        </Text>
      </View>
    </SafeAreaView>
  );
};
