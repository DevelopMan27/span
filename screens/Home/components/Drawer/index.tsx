import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";
import { MenuItem } from "./MenuItem";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../../../navigation/routesNames";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { clearData } from "../../../../utils";
import { useAuthContext } from "../../../../contexts/UserAuthContext";

export const Drawer = () => {
  const { navigate } = useNavigation();
  const { setAPIUSER } = useAuthContext();
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
        <MenuItem
          menuName={"User List"}
          onPress={() => {
            navigate(RouteNames.UserList);
          }}
        />
        <MenuItem
          menuName={"Parts / Component"}
          onPress={() => {
            navigate(RouteNames.Parts);
          }}
        />
        <MenuItem
          menuName={"Logout"}
          onPress={async () => {
            auth()
              .signOut()
              .then(() => console.log("User signed out!"));
            await clearData("API_USER");
            await clearData("EXPIRY_DATE");
            await clearData("USER_DATA");
            await clearData("USER_TOKEN");
            setAPIUSER(false);
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
