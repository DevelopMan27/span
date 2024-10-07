import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { btoa } from "react-native-quick-base64";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";
import { CustomTextInput } from "../../../../components/CustomTextInput";
import { getUserData } from "../../../../utils";
import { useFormik } from "formik";
import * as Yup from "yup";

interface UserData {
  created: string;
  designation: string;
  email: string;
  id: string;
  mobile: string;
  status: string;
  user_type: string;
  username: string;
}

interface UserResponse {
  data: UserData;
  message: string;
  success: boolean;
}
export const AboutText = () => {
  const { navigate } = useNavigation();
  const [userData, setUserData] = useState<UserResponse | undefined>(undefined);
  const [username, setUsername] = useState(userData?.data.username);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    const user = await getUserData();

    const token = user?.token;
    const dObject = {
      authorization: token,
      input: {
        req_type: "view",
        id: user?.id,
        username: "",
        designation: "",
        email: "",
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    //console.log("====finalData====", finalData);

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
    //console.log("result", result);
    setUserData(result);
    setLoading(false);
    if (!result.success) {
      setLoading(false);
      Alert.alert("Registration Failed", result.message);
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email()
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required("Please enter valid email."),
    name: Yup.string().required("Please enter name"),
  });

  const formik = useFormik({
    validationSchema: LoginSchema,
    enableReinitialize: true,
    initialValues: {
      email: userData?.data?.email,
      name: userData?.data?.username,
    },
    onSubmit: async (values) => {
      //console.log("values", values);
      const user = await getUserData();
      setLoading(true);

      const token = user?.token;
      const dObject = {
        authorization: token,
        input: {
          req_type: "update",
          id: userData?.data.id,
          username: formik.values?.name,
          designation: userData?.data?.designation,
          email: formik.values?.email,
        },
      };
      const encodedData = btoa(JSON.stringify(dObject));
      const finalData = { data: encodedData };
      //console.log("====finalData====", finalData);

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
      //console.log("update result", result);
      //console.log("result.success:", result.success, typeof result.success);

      if (result.success) {
        // Show success toast
        //console.log("Inside Toast==>");

        Toast.show({
          type: "success",
          text1: "Update Successful",
          text2: "Your profile has been updated successfully.",
        });
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert("Update Failed", result.message);
      }
    },
  });
  useEffect(() => {
    getUserDetails();
  }, []);

  if (!userData) {
    return (
      <View
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ display: "flex", flex: 1 }}>
      <Toast position="bottom" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ display: "flex", flex: 1 }}
      >
        <ScrollView
          style={{
            display: "flex",
            flex: 1,
            paddingHorizontal: 25,
          }}
        >
          {/* <View style={{ marginTop: 25 }}></View>
          <Text
            style={[
              GlobalStyle.TextStyle700_20_25,
              {
                fontSize: 30,
                lineHeight: 10,
                alignContent: "center",
                alignItems: "center",
                alignSelf: "center",
              },
            ]}
          >
            My Profile
          </Text>
          <View style={{ marginTop: 27 }}></View> */}

          <View style={{ marginTop: 15.86 }}></View>
          <View
            style={{ display: "flex", flexDirection: "column", rowGap: 14 }}
          >
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text style={[GlobalStyle.TextStyle400_25_16, { fontSize: 14 }]}>
                Name :
              </Text>
              <CustomTextInput
                inputType="Text"
                placeholder="Enter your name"
                inputContainerStyle={{
                  borderColor: "#D0D5DD",
                  borderRadius: 8,
                  backgroundColor: GlobalAppColor.AppWhite,
                }}
                editable={true}
                value={formik?.values?.name}
                onChangeText={(text) => {
                  formik.setFieldValue("name", text);
                }}
              />
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text style={[GlobalStyle.TextStyle400_25_16, { fontSize: 14 }]}>
                Mobile No :
              </Text>
              <CustomTextInput
                inputType="Text"
                keyboardType="number-pad"
                placeholder="Mobile"
                // inputContainerStyle={{
                //   borderColor: "#D0D5DD",
                //   borderRadius: 8,
                //   backgroundColor: GlobalAppColor.AppWhite,
                // }}
                editable={false}
                value={userData?.data?.mobile}
              />
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text style={[GlobalStyle.TextStyle400_25_16, { fontSize: 14 }]}>
                Email address :
              </Text>
              <CustomTextInput
                inputType="Text"
                keyboardType="default"
                placeholder="Enter your email "
                inputContainerStyle={{
                  borderColor: "#D0D5DD",
                  borderRadius: 8,
                  backgroundColor: GlobalAppColor.AppWhite,
                }}
                value={formik.values?.email}
                onChangeText={(text) => {
                  formik.setFieldValue("email", text);
                }}
                editable={true}
              />
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text style={[GlobalStyle.TextStyle400_25_16, { fontSize: 14 }]}>
                Designation :
              </Text>
              <CustomTextInput
                inputType="Text"
                keyboardType="default"
                placeholder="Admin | Super User | Regular User"
                // inputContainerStyle={{
                //   borderColor: "#D0D5DD",
                //   borderRadius: 8,
                //   backgroundColor: GlobalAppColor.GREY,
                // }}
                value={userData?.data?.designation}
                editable={false}
              />
            </View>
          </View>
          <View style={{ marginTop: 26 }}></View>

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => formik.handleSubmit()}
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
                Update
              </Text>
            )}
          </Pressable>

          <View style={{ marginTop: 15 }}></View>
        </ScrollView>
      </KeyboardAvoidingView>
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
