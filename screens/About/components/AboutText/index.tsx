import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
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
  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    setLoading(true); // Start loading before fetching user data
    try {
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

      const finalData = { data: btoa(JSON.stringify(dObject)) };
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

      if (result.success) {
        setUserData(result);
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch user data.");
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Please enter a valid email."),
    name: Yup.string().required("Please enter your name"),
  });

  const formik = useFormik({
    validationSchema: LoginSchema,
    enableReinitialize: true, // Enable reinitialization
    initialValues: {
      email: userData?.data?.email || "",
      name: userData?.data?.username || "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const user = await getUserData();
        const token = user?.token;

        const dObject = {
          authorization: token,
          input: {
            req_type: "update",
            id: userData?.data.id,
            username: values.name,
            designation: userData?.data?.designation,
            email: values.email,
          },
        };

        const finalData = { data: btoa(JSON.stringify(dObject)) };
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

        if (result.success) {
          ToastAndroid.showWithGravity(
            "Your profile has been updated successfully.",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        } else {
          ToastAndroid.showWithGravity(
            "Update Failed: " + result.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      } catch (error) {
        ToastAndroid.showWithGravity(
          "Update Failed: Unable to connect to the server.",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast position="bottom" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name:</Text>
            <CustomTextInput
              inputType="Text"
              placeholder="Enter your name"
              inputContainerStyle={styles.inputContainer}
              editable={true}
              value={formik.values.name}
              onChangeText={(text) => formik.setFieldValue("name", text)}
            />

            <Text style={styles.label}>Mobile No:</Text>
            <CustomTextInput
              inputType="Text"
              keyboardType="number-pad"
              placeholder="Mobile"
              value={userData?.data.mobile}
              editable={false}
            />

            <Text style={styles.label}>Email address:</Text>
            <CustomTextInput
              inputType="Text"
              keyboardType="default"
              placeholder="Enter your email"
              inputContainerStyle={styles.inputContainer}
              value={formik.values.email}
              onChangeText={(text) => formik.setFieldValue("email", text)}
              editable={true}
            />

            <Text style={styles.label}>Designation:</Text>
            <CustomTextInput
              inputType="Text"
              keyboardType="default"
              placeholder="Admin | Super User | Regular User"
              value={userData?.data.designation}
              editable={false}
            />

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
              onPress={formik.handleSubmit}
            >
              {loading ? (
                <ActivityIndicator color={GlobalAppColor.AppWhite} />
              ) : (
                <Text style={styles.buttonText}>Update</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 25,
  },
  formContainer: {
    flexDirection: "column",
    rowGap: 14,
    marginTop:30
  },
  label: {
    fontSize: 14,
    color: "#000",
  },
  inputContainer: {
    borderColor: "#D0D5DD",
    borderRadius: 8,
    backgroundColor: GlobalAppColor.AppWhite,
  },
  button: {
    height: 48,
    backgroundColor: "#0A509C",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    backgroundColor: "#083D75",
  },
  buttonText: {
    fontSize: 16,
    color: GlobalAppColor.White,
  },
});

