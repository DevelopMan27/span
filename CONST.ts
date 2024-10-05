import { StyleSheet } from "react-native";

export const BASE_URL = ` https://hum.ujn.mybluehostin.me/span/`;

export const GlobalAppColor = {
  Blue: "#0A509C",
  White: "#FFFFFF",
  In_Active: "#D2D2D2",
  Blue_A: "#1F69B9",
  AppWhite: "#EDF4FF",
  Black: "#000000",
  AppGrey: "#727272",
  AppBlue: "#0A509C",
  BlackWithOpacity: "#00000099",
  GREEN: "#008000",
  APPRED: "#FF0000",
  GREY: "#928FA6",
  InputBackGround: "#D8E0EC",
  InputBorder: "#D0D5DD",
};

export const GlobalFont = {
  OpenSans_600SemiBold: "OpenSans_600SemiBold",
  OpenSans_500Medium: "OpenSans_500Medium",
  OpenSans_700Bold: "OpenSans_700Bold",
  OpenSans_400Regular: "OpenSans_400Regular",
};

export const GlobalStyle = StyleSheet.create({
  TextStyle500_25_16: {
    fontFamily: GlobalFont.OpenSans_500Medium,
    fontWeight: "500",
    lineHeight: 25,
    fontSize: 16,
    color: GlobalAppColor.Black,
  },
  TextStyle400_25_16: {
    fontFamily: GlobalFont.OpenSans_500Medium,
    fontWeight: "400",
    lineHeight: 25,
    fontSize: 16,
    color: GlobalAppColor.Black,
  },
  TextStyle700_20_25: {
    color: GlobalAppColor.Black,
    fontFamily: GlobalFont.OpenSans_700Bold,
    fontSize: 20,
    lineHeight: 25,
  },
  TextStyle600_20_27: {
    color: GlobalAppColor.Black,
    fontFamily: GlobalFont.OpenSans_600SemiBold,
    fontSize: 20,
    lineHeight: 27.24,
  },
});
