import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CustomHeaderButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={{ marginLeft: 15 }}
    >
      <Ionicons name="menu" size={24} color="black" />
    </TouchableOpacity>
  );
}
