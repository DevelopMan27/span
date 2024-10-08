import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { License } from "../screens/License";
import { LicenseDetails } from "../screens/LicenseDetails";
import { GlobalAppColor } from "../CONST";
import { Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "./routesNames";

const LicenseStack = createStackNavigator();

const LicenseStackNavigator = () => {
  const { goBack, navigate } = useNavigation();

  return (
    <LicenseStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <LicenseStack.Screen
        name="License"
        component={License}
        options={{
          headerLeft: (props) => (
            <MaterialCommunityIcons
              name="menu"
              size={24}
              onPress={() => {
                // You can define any action or just use goBack here if necessary.
              }}
              style={{ marginLeft: 12 }}
              color={GlobalAppColor.White}
            />
          ),
        }}
      />
      <LicenseStack.Screen
        name="LicenseDetails"
        component={LicenseDetails}
        options={{
          headerLeft: (props) => (
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              onPress={() => {
                goBack();
              }}
              style={{ marginLeft: 12 }}
              color={GlobalAppColor.White}
            />
          ),
        }}
      />
    </LicenseStack.Navigator>
  );
};

export default LicenseStackNavigator;
