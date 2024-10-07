import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";
import SystemOption from "./SystemOption";
import { useState } from "react";
import { useBottomSheetContext } from "../../../../contexts/BottomSheetContext";
import { storeData } from "../../../../utils";

export const SystemTypeBottomSheetChild = ({ onPress }) => {
  const { openSelectAdminBottomSheetFun, closeQRScanBottomSheetFun } =
    useBottomSheetContext();

  const [systemType, setSystemType] = useState<
    "In House" | "On Site" | undefined
  >(undefined);

  const handleSystemTypeChange = async (newType: "In House" | "On Site") => {
    setSystemType(newType);
    try {
      await storeData("QR_SYSTEM_TYPE", JSON.stringify(newType));
    } catch (error) {
      console.error("Error saving system type:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[GlobalStyle.TextStyle600_20_27, { alignSelf: "center" }]}>
        Select System Type
      </Text>
      <SystemOption
        icon="house"
        label="In House"
        selected={systemType === "In House"}
        onPress={() => handleSystemTypeChange("In House")}
      />
      <SystemOption
        icon="warehouse"
        label="On Site"
        selected={systemType === "On Site"}
        onPress={() => handleSystemTypeChange("On Site")}
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onPress}
      >
        <Text
          style={[
            GlobalStyle.TextStyle500_25_16,
            { fontSize: 16, color: GlobalAppColor.White },
          ]}
        >
          Next
        </Text>
      </Pressable>
    </View>
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
