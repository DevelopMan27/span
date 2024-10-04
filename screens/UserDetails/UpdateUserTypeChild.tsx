import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import SystemOption from "../Home/components/HomeView/SystemOption";
import { useState } from "react";
import { getUserToken, getUserTypeNumber } from "../../utils";
import { btoa } from "react-native-quick-base64";

export const UpdateUserTypeChild = ({
  id,
  userType,
  getUserDetails,
  bottomSheetRef,
}: {
  id: string;
  userType: string;
  getUserDetails: (id: string) => void;
}) => {
  const [systemType, setSystemType] = useState<
    "Admin" | "Super User" | "Regular User" | undefined
  >(userType ?? undefined);
  //console.log("userType", userType);

  const updateUserType = async () => {
    const token = await getUserToken();
    const dObject = {
      authorization: token,
      input: {
        user_role: "3", // upateafter
        user_id: id,
        req_type: "type",
        user_type: getUserTypeNumber(systemType),
        user_status: "",
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
    bottomSheetRef();
    //console.log("===result", result);
    getUserDetails(id);
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={[GlobalStyle.TextStyle600_20_27, { alignSelf: "center" }]}>
          User Type
        </Text>

        <View style={{ display: "flex", flexDirection: "column", rowGap: 25 }}>
          <SystemOption
            icon=""
            label="Admin"
            selected={systemType === "Admin"}
            onPress={() => setSystemType("Admin")}
          />
          <SystemOption
            icon=""
            label="Super User"
            selected={systemType === "Super User"}
            onPress={() => setSystemType("Super User")}
          />
          <SystemOption
            icon=""
            label="Regular User"
            selected={systemType === "Regular User"}
            onPress={() => setSystemType("Regular User")}
          />
        </View>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => updateUserType()}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 16, color: GlobalAppColor.White },
            ]}
          >
            Save
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 31,
    paddingBottom: 29,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    height: 48,
    width: "auto",
    backgroundColor: "#0A509C",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
  },
  pressed: {
    backgroundColor: "#083D75",
  },
});
