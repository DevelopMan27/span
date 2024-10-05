import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { RouteNames } from "./routesNames";
import Home from "../screens/Home";
import { RootStackParamList } from "../type";
import { About } from "../screens/About";
import { GlobalAppColor, GlobalFont } from "../CONST";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { useBottomSheetContext } from "../contexts/BottomSheetContext";
import CustomHeaderButton from "./CustomHeaderButton";
import { CellContainer } from "@shopify/flash-list";

const Tab = createBottomTabNavigator<RootStackParamList>();

const TabNavigation = () => {
  const { openQRScanBottomSheetFun, openSelectAdminBottomSheetFun } =
    useBottomSheetContext();
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: GlobalAppColor.AppWhite,
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: GlobalAppColor.White,
        tabBarInactiveTintColor: GlobalAppColor.In_Active,
        tabBarAllowFontScaling: true,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          fontFamily: GlobalFont.OpenSans_600SemiBold,
          alignItems:"center"
        },
        tabBarStyle: {
          backgroundColor: GlobalAppColor.Blue,
          borderTopEndRadius: 24,
          borderTopStartRadius: 24,
          height: 70,
        },
      }}
      initialRouteName={RouteNames.HomeScreen}
    >
      <Tab.Screen
        name={RouteNames.HomeScreen}
        component={Home}
        // options={({ navigation }) => ({
        //   headerShown: true,
        //   headerLeft: () => <CustomHeaderButton navigation={navigation} />,
        // })}

        options={{
          // headerShown: true,
          // headerLeft: () => <CustomHeaderButton navigation={navigation} />,
          tabBarLabel: "Home",
          tabBarIcon: (props) => {
            return (
              <AntDesign
                name="home"
                size={25}
                color={
                  props.focused
                    ? GlobalAppColor.White
                    : GlobalAppColor.In_Active
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteNames.SCANQR}
        component={About}
        options={{
          tabBarLabel: "",
          tabBarIcon: (props) => {
            return (
              <AntDesign
                {...props}
                name="scan1"
                size={36}
                style={{
                  marginTop: 13,
                }}
                color={
                  props.focused
                    ? GlobalAppColor.White
                    : GlobalAppColor.In_Active
                }
              />
            );
          },
          tabBarButton: ({ children }) => {
            return (
              <Pressable
                style={{
                  top: -30,
                  backgroundColor: GlobalAppColor.Blue_A,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  alignContent: "center",
                  alignSelf: "center",
                  height: 76,
                  width: 76,
                  display: "flex",
                }}
              >
                <Pressable
                  onPress={() => {
                    openQRScanBottomSheetFun();
                  }}
                  style={{
                    backgroundColor: GlobalAppColor.Blue,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                    alignContent: "center",
                    alignSelf: "center",
                    height: 66,
                    width: 66,
                    display: "flex",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {children}
                  </View>
                </Pressable>
              </Pressable>
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteNames.About}
        component={About}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: (props) => {
            return (
              <AntDesign
                name="user"
                size={25}
                color={
                  props.focused
                    ? GlobalAppColor.White
                    : GlobalAppColor.In_Active
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
