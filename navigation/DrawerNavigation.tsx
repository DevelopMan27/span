import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigation from "./TabNavigation";
import { Drawer as D } from "../screens/Home/components/Drawer";
import { GlobalAppColor } from "../CONST";
import { Alert, Button, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { QRScan } from "../screens/QRScan";
import { DeviceDetails } from "../screens/DeviceDetails";
import { License } from "../screens/License";
import { LicenseDetails } from "../screens/LicenseDetails";
import { useNavigation } from "@react-navigation/native";
import { NotificationList } from "../screens/NotificationList";
import { RouteNames } from "./routesNames";
import { UserList } from "../screens/UserList";
import { UserDetails } from "../screens/UserDetails";
import { Parts } from "../screens/Parts";
import {
  PartDetails,
  Products_sub_category,
} from "../screens/Products_sub_category";
import { Products_category_master } from "../screens/Products_category_master";
import { IO_serial_number } from "../screens/IO_serial_number";
import { IPC_service_tag } from "../screens/IPC_service_tag";
import { Lens_info } from "../screens/Lens_info";
import { Comp_lens_serial } from "../screens/Comp_lens_serial";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const { navigate, goBack } = useNavigation();
  return (
    <>
      <Drawer.Navigator
        // screenOptions={{
        //   headerShown: false,
        // }}
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalAppColor.Blue,
          },
          headerTintColor: GlobalAppColor.White,
          headerTitle: (props) => (
            <Pressable
              onPress={() => {
                navigate(RouteNames.HomeScreen);
              }}
            >
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            </Pressable>
          ),
          headerRight: (props) => (
            <>
              <MaterialCommunityIcons
                {...props}
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
                onPress={() => {
                  navigate(RouteNames.NotificationList);
                }}
              />
            </>
          ),
        }}
        drawerContent={(props) => <D {...props} />}
      >
        <Drawer.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            // headerTitle: (props) => (
            //   <Image
            //     style={{ width: 88, height: 30 }}
            //     source={require("../assets/Logo.png")}
            //   />
            // ),
            // headerRight: (props) => (
            //   <>
            //     <MaterialCommunityIcons
            //       {...props}
            //       name="bell-badge"
            //       size={24}
            //       style={{ marginRight: 22 }}
            //       color={GlobalAppColor.White}
            //       onPress={() => {
            //         Alert.alert("Notification", "This is an alert message!");
            //       }}
            //     />
            //   </>
            // ),
          }}
        />
        <Drawer.Screen
          name="QRScan"
          component={QRScan}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="DeviceDetails"
          component={DeviceDetails}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="License"
          component={License}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="LicenseDetails"
          component={LicenseDetails}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            // headerShown: false,
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
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
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                onPress={() => {
                  navigate(RouteNames.NotificationList);
                }}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="NotificationList"
          component={NotificationList}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="UserList"
          component={UserList}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="UserDetails"
          component={UserDetails}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="Parts"
          component={Parts}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="Products_sub_category"
          component={Products_sub_category}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="Products_category_master"
          component={Products_category_master}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="IO_serial_number"
          component={IO_serial_number}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="IPC_service_tag"
          component={IPC_service_tag}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="Lens_info"
          component={Lens_info}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
        <Drawer.Screen
          name="Comp_lens_serial"
          component={Comp_lens_serial}
          options={{
            sceneContainerStyle: {
              backgroundColor: GlobalAppColor.AppWhite,
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            },
            headerTitle: (props) => (
              <Image
                style={{ width: 88, height: 30 }}
                source={require("../assets/Logo.png")}
              />
            ),
            headerRight: (props) => (
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={{ marginRight: 22 }}
                color={GlobalAppColor.White}
              />
            ),
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
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;
