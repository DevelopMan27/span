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
import { useEffect, useState } from "react";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import { CustomTextInput } from "../../components/CustomTextInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../type";
import { RouteNames } from "../../navigation/routesNames";
import { useAuthContext } from "../../contexts/UserAuthContext";
import { btoa, atob } from "react-native-quick-base64";
import { RegistrationConfirmation } from "../../components/RegistrationConfirmation/index";
import { getUserToken, storeData } from "../../utils";
import { useNotificationToken } from "../../hook/useNotificationToken ";

type OTPProps = RouteProp<RootStackParamList, RouteNames.OTP>;
export const OTP = () => {
  const navigation = useNavigation();
  const route = useRoute<OTPProps>();
  const { setAPIUSER } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const { confirm, designation, email, mobile, name } = route?.params;
  const { token: ExpoToken } = useNotificationToken();
  const LoginSchema = Yup.object().shape({
    otp: Yup.string(),
  });
  const [loading, setLoading] = useState(false);
  function removeCountryCode(mobileNumber: any) {
    // Remove any leading +91 or 91
    mobileNumber = mobileNumber.replace(/^(\+91|91)/, "");
    // Trim any leading or trailing whitespace
    mobileNumber = mobileNumber.trim();
    return mobileNumber;
  }

  const storeLoginData = async (loginResult) => {
    const token = loginResult.data.token; // Get user token
    const dObject = {
      authorization: token,
      input: {
        designation: loginResult.data?.designation,
        ftoken: loginResult.data?.ftoken,
        user_id: loginResult.data?.user_id,
        user_mobile: loginResult.data?.user_mobile,
        user_name: loginResult.data?.user_name,
        user_status: loginResult.data?.user_status,
        user_type: loginResult.data?.user_type,
        role: loginResult.role,
        token: loginResult.token,
        username: loginResult.username,
      },
    };

    // Encode the data object
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };

    try {
      // Make the API request to store the login data
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/master.php", // Endpoint to store the login data
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      // Parse the response
      const result = await response.json();

      if (response.ok) {
        console.log("Login data stored successfully:", result);
      } else {
        console.error("Error storing login data:", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      otp: "",
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        let confirmation;
        //console.log("confirmation_________", confirmation?.additionalUserInfo);
        //console.log("confirmation_________", confirmation?.user);
        console.log("====mobile======", mobile);
        // Check if user exists by sending a request to the server
        const userExists = await checkUserExists(mobile);
        console.log("userExists", userExists);
        if (userExists) {
          // User exists, attempt login
          const loginResult = await loginUser(mobile);
          console.log("loginResult", loginResult);

          if (loginResult.success) {
            confirmation = await confirm.confirm(values.otp);
            console.log("confirmation", confirmation);
            //console.log("Login result", loginResult.data);
            await storeData("USER_DATA", JSON.stringify(loginResult.data));
            await storeData(
              "USER_TOKEN",
              JSON.stringify(loginResult.data.token)
            );
            await storeData(
              "EXPIRY_DATE",
              JSON.stringify(loginResult.data.eat)
            );
            setAPIUSER(true);
            setLoading(false)
          } else {
            Alert.alert("Error while Login", loginResult.message);
            setLoading(false)
          }
        } else {
          // User doesn't exist, proceed with registration
          if (name && email && designation && confirmation?.user?.uid) {
            const registrationResult = await registerUser({
              mobile,
              name,
              email,
              designation,
              fb_uid: confirmation.user.uid,
            });

            if (registrationResult.success) {
              //console.log("==result", registrationResult);
              setModalVisible(true);
              setLoading(false)
            } else {
              Alert.alert("User can't register", registrationResult.message);
              setLoading(false)
            }
          }
        }
      } catch (error) {
        console.error("Error during OTP verification or user check:", error);
        Alert.alert("Invalid OTP");
        setLoading(false)
      }
    },
  });

  // Function to check if user exists
  const checkUserExists = async (mobile: any) => {
    try {
      // Prepare the request payload
      const dObject = {
        authorization: "", // Include authorization if needed
        input: {
          mobile: mobile, // Mobile number to check
        },
      };

      // Encode the data if needed
      const encodedData = btoa(JSON.stringify(dObject));
      const finalData = { data: encodedData };

      // Send a request to check if the user exists
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/registration.php", // Using the same registration endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData), // Send the correct payload
        }
      );

      // Parse the response
      const result = await response.json();
      //console.log("result", result);

      // Check if the response contains "Mobile number already exists"
      if (result.message === "Mobile number already exists") {
        return true; // User exists
      } else {
        return false; // User does not exist
      }
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false; // Return false if there's an error
    }
  };
  // Function to login existing user
  const loginUser = async (mobile: any) => {
    const mobilenum = removeCountryCode(mobile);
    const token = ""; // You might need to provide a token if required by the API
    //console.log("mobile num====>", mobilenum);
    //console.log("ExpoToken====>", ExpoToken);

    const dObject = {
      authorization: token,
      input: {
        mobile: mobilenum,
        Fcm_token: ExpoToken,
      },
    };

    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    //console.log("finalData", finalData);

    try {
      //console.log("inside--->");

      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      // Log the raw response first (you can't read it twice)
      const rawResponse = await response.text();
      //console.log("response-------->", rawResponse);
      console.log("rawResponse", rawResponse);
      // Now parse it as JSON
      const result = JSON.parse(rawResponse);
      //console.log("result________________login", result);

      return result;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  // Function to register a new user
  const registerUser = async ({
    mobile,
    name,
    email,
    designation,
    fb_uid,
  }: {
    mobile: any;
    name: string;
    email: string;
    designation: string;
    fb_uid: string;
  }) => {
    const token = "";
    const dObject = {
      authorization: token,
      input: {
        mobile,
        username: name,
        email,
        designation,
        fb_uid,
        Fcm_token: ExpoToken,
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };

    try {
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/registration.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed" };
    }
  };

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
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 17,
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[GlobalStyle.TextStyle700_20_25, { lineHeight: 0 }]}>
              VERIFICATION CODE
            </Text>
          </View>
          <View style={{ marginTop: 54 }}></View>

          <Image
            source={require("../../assets/Login_icon.png")}
            style={{ height: 172.14, width: "100%" }}
          />
          <View style={{ marginTop: 15.86 }}></View>
          <View
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              marginTop: 47,
            }}
          >
            <Text
              style={[
                GlobalStyle.TextStyle400_25_16,
                { fontSize: 14, lineHeight: 25 },
              ]}
            >
              Verification code sent to {mobile}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 14,
              marginTop: 54,
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text style={[GlobalStyle.TextStyle400_25_16, { fontSize: 14 }]}>
                OTP :
              </Text>
              <CustomTextInput
                inputType="Text"
                placeholder="Enter OTP"
                keyboardType="phone-pad"
                inputContainerStyle={{
                  borderColor: "#D0D5DD",
                  borderRadius: 8,
                  backgroundColor: GlobalAppColor.AppWhite,
                }}
                maxLength={6}
                value={formik.values.otp}
                onChangeText={(text) => {
                  formik.setFieldValue("otp", text);
                }}
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
                Verify
              </Text>
            )}
          </Pressable>
          <View style={{ marginTop: 15 }}></View>
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
            Resend code
          </Text>
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
      {modalVisible && (
        <RegistrationConfirmation
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
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
