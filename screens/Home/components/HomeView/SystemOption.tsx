import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { FontAwesome6 } from "@expo/vector-icons";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";

const SystemOption = ({
  icon,
  label,
  selected,
  onPress,
}: {
  icon?: string;
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.systemOptionContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.optionPart1}>
        {icon && <FontAwesome6 name={icon} size={24} color="black" />}
        <Text style={[GlobalStyle.TextStyle600_20_27, styles.optionText]}>
          {label}
        </Text>
      </View>
      <View
        style={[
          styles.selectionCircle,
          selected && { backgroundColor: GlobalAppColor.AppBlue },
        ]}
      >
        {selected && <View style={styles.innerCircle} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  systemOptionContainer: {
    paddingVertical: 13,
    paddingHorizontal: 19,
    backgroundColor: "#EDF4FF",
    borderWidth: 1,
    borderColor: "#BEC3CC",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionPart1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    columnGap: 15,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 21,
  },
  selectionCircle: {
    width: 24,
    height: 24,
    backgroundColor: "#D2D2D2",
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    backgroundColor: "white",
    height: 4,
    width: 4,
    borderRadius: 6,
  },
  pressed: {
    backgroundColor: "#D3E2FF",
  },
});

export default SystemOption;
