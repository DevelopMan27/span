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
  TouchableOpacity,
} from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Buffer } from "buffer";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../navigation/routesNames";
import { btoa, atob } from "react-native-quick-base64";
import debounce from "lodash.debounce";

export const Login = () => {
  const { navigate } = useNavigation();
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSubmit = debounce(() => {
    formik.handleSubmit();
  }, 0); // 1000ms debounce

  async function confirmCode(code) {
    try {
      //console.log("code", code);
      await confirm.confirm(code);
      //console.log("Done!!!");
    } catch (error) {
      //console.log("Invalid code.");
    }
  }
  const signInWithPhoneNumber = async (phoneNumber) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error));
      //console.log("Error", error);
    }
  };

  const LoginSchema = Yup.object().shape({
    mobile: Yup.string(),
    otp: Yup.number(),
  });
  function addCountryCode(number) {
    if (!number.startsWith("+91")) {
      return "+91" + number;
    }
    return number;
  }
  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      mobile: "",
      otp: 0,
    },
    onSubmit: async (values) => {
      const ll = values.mobile.length;
      if (ll != 10) {
        setError("Please enter valid mobile number");
      } else {
        setLoading(true);

        const updatedNumber = addCountryCode(values.mobile);
        // checkUser(updatedNumber)
        // const user = checkUser(updatedNumber);

        const user = await checkUser(removeCountryCode(values.mobile));

        // navigate(RouteNames.OTP, {
        //   confirm: "",
        //   mobile: formik.values.mobile,
        // });
        if (user) {
          console.log("done")
          const updatedNumber = addCountryCode(values.mobile);
          // formik.setFieldValue("mobile", updatedNumber);
          signInWithPhoneNumber(updatedNumber);
          // setLoading(false);
        } else {
          console.log(user);
          Alert.alert("Error",user.message);
          setLoading(false);
        }
      }
    },
  });

  function removeCountryCode(mobileNumber: any) {
    // Remove any leading +91 or 91
    mobileNumber = mobileNumber.replace(/^(\+91|91)/, "");
    // Trim any leading or trailing whitespace
    mobileNumber = mobileNumber.trim();
    return mobileNumber;
  }

  const checkUser = async (mobile) => {
    const token = "";
    const dObject = {
      input: {
        mobile,
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };

    try {
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/check_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );
      const result = await response.json();
      // console.log(result);

      if (result.success == false) {
        Alert.alert("User Not Found", result.message);
        setLoading(false);
      } else {
        // console.log
        return true;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  };

  useEffect(() => {
    if (confirm) {
      setLoading(false);
      navigate(RouteNames.OTP, {
        confirm: confirm,
        mobile: formik.values.mobile,
      });
    }
  }, [confirm, formik.values, setLoading, loading]);

  return (
    <SafeAreaView style={{ display: "flex", flex: 1 }}>
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
          keyboardShouldPersistTaps="handled"
        >
          <View style={{ marginTop: 25 }}></View>
          <View
            style={{ display: "flex", flexDirection: "column", rowGap: 17 }}
          >
            {loading ? (
              <ActivityIndicator color={GlobalAppColor.AppWhite} />
            ) : (
              <Text
                style={[
                  GlobalStyle.TextStyle700_20_25,
                  { fontSize: 30, lineHeight: 0 },
                ]}
              >
                Login!
              </Text>
            )}
            <Text
              style={[
                GlobalStyle.TextStyle600_20_27,
                { lineHeight: 0, color: "#424242" },
              ]}
            >
              Welcome back!
            </Text>
          </View>
          <View style={{ marginTop: 27 }}></View>
          <Image
            source={require("../../assets/Login_icon.png")}
            style={{ height: 172.14, width: "100%" }}
          />
          <View style={{ marginTop: 15.86 }}></View>
          <View
            style={{ display: "flex", flexDirection: "column", rowGap: 14 }}
          >
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text style={[GlobalStyle.TextStyle400_25_16, { fontSize: 14 }]}>
                Mobile No :
              </Text>
              <CustomTextInput
                inputType="Text"
                placeholder="Enter your mobile number"
                keyboardType="phone-pad"
                inputContainerStyle={{
                  borderColor: "#D0D5DD",
                  borderRadius: 8,
                  backgroundColor: GlobalAppColor.AppWhite,
                }}
                value={formik.values.mobile}
                maxLength={10}
                onChangeText={(text) => {
                  formik.setFieldValue("mobile", text);
                }}
                errorMessage={error}
              />
            </View>
            {/* <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text style={[GlobalStyle.TextStyle400_25_16, { fontSize: 14 }]}>
                OTP
              </Text>
              <CustomTextInput
                inputType="Text"
                placeholder="Enter your mobile number"
                keyboardType="phone-pad"
                inputContainerStyle={{
                  borderColor: "#D0D5DD",
                  borderRadius: 8,
                  backgroundColor: GlobalAppColor.AppWhite,
                }}
                value={formik.values.otp}
                onChangeText={(text) => {
                  formik.setFieldValue("otp", text);
                }}
              />
            </View> */}
          </View>
          <View style={{ marginTop: 26 }}></View>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={debouncedSubmit}
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
                Login
              </Text>
            )}
          </Pressable>
          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                {
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                },
                GlobalStyle.TextStyle400_25_16,
                { fontSize: 14, lineHeight: 25 },
              ]}
            >
              Dont't have an account?
            </Text>
            <Pressable onPress={() => navigate(RouteNames.Register)}>
              <Text
                style={[
                  {
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                  },
                  GlobalStyle.TextStyle400_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                {" "}
                SIGNUP
              </Text>
            </Pressable>
          </View>
          <Image
            source={require("../../assets/SpanLogo.png")}
            style={{
              height: 54,
              width: 156,
              alignContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginTop: 30,
            }}
          />
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
