import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RouteNames } from "./routesNames";
import { RootStackParamList } from "../type";
import DrawerNavigation from "./DrawerNavigation";
import { Alert, Button, Image, Platform, Text } from "react-native";
import { Login } from "../screens/Login";
import { GlobalAppColor } from "../CONST";
import { Register } from "../screens/Register";
import { OTP } from "../screens/OTP";
import { useAuthContext } from "../contexts/UserAuthContext";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import CustomHeaderButton from "./CustomHeaderButton";
import { useNotificationToken } from "../hook/useNotificationToken ";
import { useLastNotificationResponse } from "../hook/useLastNotificationResponse";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreenStack}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={SettingsScreenStack}
      />
    </Tab.Navigator>
  );
}

function HomeScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => <CustomHeaderButton navigation={navigation} />,
        })}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function SettingsScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => <CustomHeaderButton navigation={navigation} />,
        })}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const RootNavigation = () => {
  const { user: firebaseUser } = useAuthContext();
  const Drawer = createDrawerNavigator();
  useLastNotificationResponse();
  useNotificationToken();

  return (
    <>
      {/* <Drawer.Navigator>
        <Drawer.Screen
          options={{
            headerShown: false,
          }}
          name="MainTabs"
          component={MainTabs}
        />
      </Drawer.Navigator> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: GlobalAppColor.AppBlue,
          statusBarStyle: Platform.OS === "android" ? "auto" : undefined,
        }}
        initialRouteName={RouteNames.Login}
      >
        {!firebaseUser && (
          <>
            <Stack.Screen
              options={{
                contentStyle: {
                  backgroundColor: GlobalAppColor.AppWhite,
                },
              }}
              name={RouteNames.Register}
              component={Register}
            />
            <Stack.Screen
              options={{
                contentStyle: {
                  backgroundColor: GlobalAppColor.AppWhite,
                },
              }}
              name={RouteNames.Login}
              component={Login}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                headerTransparent: true,
                headerTitle: "",
                contentStyle: {
                  backgroundColor: GlobalAppColor.AppWhite,
                },
              }}
              name={RouteNames.OTP}
              component={OTP}
            />
          </>
        )}

        {firebaseUser && (
          <Stack.Screen
            name={RouteNames.DrawerNavigation}
            component={DrawerNavigation}
          />
        )}
      </Stack.Navigator>
    </>
  );
};

export default RootNavigation;
