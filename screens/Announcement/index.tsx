import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { CustomTextInput } from "../../components/CustomTextInput";
import { GlobalAppColor } from "../../CONST";
import { GlobalStyle } from "../../CONST";
import { getUserData, getUserToken } from "../../utils";
import { btoa } from "react-native-quick-base64";
import Toast from "react-native-toast-message";

export const Announcement = () => {
  const [messagetxt, setMessagetxt] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(messagetxt);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = await getUserToken();
      const userData = await getUserData();
      const dObject = {
        authorization: token,
        input: {
          req_type: "create",
          message: messagetxt,
          user_id: userData?.data.user_id,
        },
      };
      const encodedData = btoa(JSON.stringify(dObject));
      const finalData = { data: encodedData };
      console.log("finalData", dObject);
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/messages.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );
      const result = await response.json();
      console.log("result", result.message);
      if(result.success === true){
        ToastAndroid.showWithGravity(result.message,ToastAndroid.BOTTOM,ToastAndroid.CENTER)
        // Toast.show({
        //   type: "success",
        //   text1: "Added Successful",
        //   text2: result.message,
        // });
      }

      setLoading(false);
    } catch (error){
      console.log(error, "there was errors");
      setLoading(false)
    }
  };
  return (
    <SafeAreaView style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Toast position="bottom"/>
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
        <View style={{ flexDirection: "column", flex: 1, rowGap: 5 }}>
          <Text>Message:</Text>
          <CustomTextInput
            value={messagetxt} // Correctly pass the string value
            onChangeText={(text) => {
              console.log(text);
              setMessagetxt(text);  // Directly set the string value from the text input
            }}
            inputContainerStyle={{
              borderColor: "#D0D5DD",
              width: "100%",
              borderRadius: 8,
              backgroundColor: GlobalAppColor.AppWhite,
            }}
            inputType="Text"
            placeholder="Enter Message"
          />

          <View style={{ marginTop: 26 }}></View>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => handleSubmit()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={GlobalAppColor.AppWhite} />
            ) : (
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 16, color: GlobalAppColor.White },
                ]}
              >
                Add
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
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
