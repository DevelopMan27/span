import { Pressable, SafeAreaView, Text, View } from "react-native";
import { CustomTextInput } from "../../components/CustomTextInput";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import React, { useCallback, useEffect, useState } from "react";
import { debounce, getUserData, getUserToken } from "../../utils";
import { btoa, atob } from "react-native-quick-base64";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../navigation/routesNames";
type UserType = {
  id: "string";
  username: "string";
  user_type: "string";
  created: "string";
  mobile: "string";
  designation: "string";
  status: "string";
  email: "string";
};
export const UserList = () => {
  const [searchText, setSearchText] = useState("");
  const [userList, setUserList] = useState<UserType[]>([]);
  const { navigate } = useNavigation();
  const getUserList = async (text?: string) => {
    const token = await getUserToken();
    const user = await getUserData();

    const dObject = {
      authorization: token,
      input: {
        user_role: "3",
        search_query: text ?? "",
      },
    };

    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    //console.log("finalData====>", finalData);
    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/user_list.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );
    const result = await response.json();
    setUserList(result?.data);
  };

  const fetchLicensesDebounced = useCallback(
    debounce((text: string) => {
      getUserList(text);
    }, 100),
    []
  );

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    fetchLicensesDebounced(searchText);
  }, [searchText, fetchLicensesDebounced]);
  const getStatusText = (status: string) => {
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
  const statusColorMap: { [key: string]: string } = {
    "0": "#0A509C",
    "1": "#008000",
    "2": "#FF0000",
  };
  return (
    <>
      <SafeAreaView
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
      >
        <View
          style={{
            marginHorizontal: 25,
            marginTop: 28,
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            columnGap: 8,
          }}
        >
          <CustomTextInput
            inputType="Text"
            inputContainerStyle={{
              backgroundColor: GlobalAppColor.AppWhite,
              flex: 1,
            }}
            placeholder="Search..."
            onChangeText={(text) => {
              setSearchText(text);
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 31,
            marginTop: 35,
            flex: 1,
            marginHorizontal: 25,
          }}
        >
          <FlashList
            data={userList?.length > 0 ? userList : []}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        padding: 13,
                        borderWidth: 1,
                        borderRadius: 6,
                        borderColor: "#BEC3CC",
                      },
                      { backgroundColor: pressed ? "#E0E0E0" : "#FFFFFF" },
                    ]}
                    android_ripple={{ color: "#D3D3D3" }}
                    onPress={() => {
                      navigate(RouteNames.UserDetails, { id: item.id });
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={
                          (GlobalStyle.TextStyle600_20_27,
                          { fontSize: 14, lineHeight: 19 })
                        }
                      >
                        {item.username}
                      </Text>
                      <View
                        style={{
                          borderColor: statusColorMap[item.status] || "#000",
                          borderWidth: 1,
                          paddingHorizontal: 15,
                          paddingVertical: 7,
                          borderRadius: 6,
                        }}
                      >
                        <Text
                          style={{
                            color: statusColorMap[item.status] || "#000",
                          }}
                        >
                          {getStatusText(item.status)}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={
                        (GlobalStyle.TextStyle600_20_27,
                        { fontSize: 14, lineHeight: 19 })
                      }
                    >
                      ({item.designation})
                    </Text>
                  </Pressable>
                </>
              );
            }}
            // keyExtractor={(item) => item.key}
            ItemSeparatorComponent={() => {
              return <View style={{ marginTop: 15 }}></View>;
            }}
            estimatedItemSize={100}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
