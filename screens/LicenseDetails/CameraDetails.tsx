import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyle } from "../../CONST";

const CameraDetails = ({ label, value }) => {
  return (
    <View style={{ marginLeft: 28, display: "flex", flexDirection: "row" }}>
      <Text
        style={[
          GlobalStyle.TextStyle500_25_16,
          { fontSize: 14, lineHeight: 25, color: "#000000CC" },
        ]}
      >
        {label}:{" "}
      </Text>
      <Text
        style={[
          GlobalStyle.TextStyle400_25_16,
          { fontSize: 14, lineHeight: 25, color: "#000000CC" },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 28,
    display: "flex",
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    lineHeight: 25,
    color: "#000000CC",
  },
  value: {
    fontSize: 14,
    lineHeight: 25,
    color: "#000000CC",
  },
});

export default CameraDetails;
