import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons

export default function CustomHeader({ title, navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f8f8f8",
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, marginLeft: 10 }}>{title}</Text>
    </View>
  );
}
