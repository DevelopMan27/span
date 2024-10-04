import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
  scrollViewStyle: { display: "flex", flex: 1 },
  greetingsParent: { marginTop: 20, marginLeft: 29, marginRight: 29 },
  dailyPasswordParent: {
    marginTop: 24,
    borderWidth: 1,
    marginHorizontal: 25,
    borderColor: "#BEC3CC",
    paddingHorizontal: 29,
    paddingBottom: 32,
    paddingTop: 19,
    borderRadius: 6,
  },
  dailyPasswordHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  InVoiceItemParent: {
    display: "flex",
    flexDirection: "column",
    rowGap: 31,
    marginTop: 35,
  },
});
