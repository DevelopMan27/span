import { useEffect } from "react";
import { getUserData, getUserToken, statusColorMap } from "../../utils";
import { btoa, atob } from "react-native-quick-base64";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { GlobalStyle } from "../../CONST";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../navigation/routesNames";

export const Parts = () => {
  const { navigate } = useNavigation();
  const getListOfAllProducts = async () => {
    const token = await getUserToken();
    const user = await getUserData();

    const dObject = {
      authorization: token,
      input: {
        req_type: "view_list",
      },
    };

    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    //console.log("finalData", finalData);
    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/products_category_master_all.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );
    const result = await response.json();
    //console.log("result", result);
  };

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

  const PartList = [
    "Products sub category",
    "Products category master",
    "IO serial number",
    "IPC service tag",
    "Lens info",
    "Comp lens serial",
  ];
  return (
    <>
      <View
        style={{
          display: "flex",
          flex: 1,
          paddingTop: 29,
          paddingHorizontal: 25,
        }}
      >
        <ScrollView style={{ display: "flex", flex: 1 }}>
          <Pressable
            onPress={() => {
              navigate(RouteNames.Products_sub_category);
            }}
            style={({ pressed }) => [
              {
                marginBottom: 21,
                height: 53,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "#BEC3CC",
                alignContent: "center",
                justifyContent: "center",
                paddingHorizontal: 25,
              },
              { backgroundColor: pressed ? "#F5F9FF" : "#EDF4FF" },
            ]}
          >
            <Text
              style={[
                GlobalStyle.TextStyle600_20_27,
                { fontSize: 14, lineHeight: 19 },
              ]}
            >
              Products sub category
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate(RouteNames.Products_category_master);
            }}
            style={({ pressed }) => [
              {
                marginBottom: 21,
                height: 53,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "#BEC3CC",
                alignContent: "center",
                justifyContent: "center",
                paddingHorizontal: 25,
              },
              { backgroundColor: pressed ? "#F5F9FF" : "#EDF4FF" },
            ]}
          >
            <Text
              style={[
                GlobalStyle.TextStyle600_20_27,
                { fontSize: 14, lineHeight: 19 },
              ]}
            >
              Products category master
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate(RouteNames.IO_serial_number);
            }}
            style={({ pressed }) => [
              {
                marginBottom: 21,
                height: 53,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "#BEC3CC",
                alignContent: "center",
                justifyContent: "center",
                paddingHorizontal: 25,
              },
              { backgroundColor: pressed ? "#F5F9FF" : "#EDF4FF" },
            ]}
          >
            <Text
              style={[
                GlobalStyle.TextStyle600_20_27,
                { fontSize: 14, lineHeight: 19 },
              ]}
            >
              IO serial number
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate(RouteNames.IPC_service_tag);
            }}
            style={({ pressed }) => [
              {
                marginBottom: 21,
                height: 53,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "#BEC3CC",
                alignContent: "center",
                justifyContent: "center",
                paddingHorizontal: 25,
              },
              { backgroundColor: pressed ? "#F5F9FF" : "#EDF4FF" },
            ]}
          >
            <Text
              style={[
                GlobalStyle.TextStyle600_20_27,
                { fontSize: 14, lineHeight: 19 },
              ]}
            >
              IPC service tag
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate(RouteNames.Lens_info);
            }}
            style={({ pressed }) => [
              {
                marginBottom: 21,
                height: 53,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "#BEC3CC",
                alignContent: "center",
                justifyContent: "center",
                paddingHorizontal: 25,
              },
              { backgroundColor: pressed ? "#F5F9FF" : "#EDF4FF" },
            ]}
          >
            <Text
              style={[
                GlobalStyle.TextStyle600_20_27,
                { fontSize: 14, lineHeight: 19 },
              ]}
            >
              Lens info
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate(RouteNames.Comp_lens_serial);
            }}
            style={({ pressed }) => [
              {
                marginBottom: 21,
                height: 53,
                borderWidth: 1,
                borderRadius: 6,
                borderColor: "#BEC3CC",
                alignContent: "center",
                justifyContent: "center",
                paddingHorizontal: 25,
              },
              { backgroundColor: pressed ? "#F5F9FF" : "#EDF4FF" },
            ]}
          >
            <Text
              style={[
                GlobalStyle.TextStyle600_20_27,
                { fontSize: 14, lineHeight: 19 },
              ]}
            >
              Comp lens serial
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
};
