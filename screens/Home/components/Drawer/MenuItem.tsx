import { Pressable, Text, View } from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";

export const MenuItem = ({ menuName, onPress }) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={{ marginLeft: 29, marginTop: 14, marginBottom: 14 }}
      >
        <Text
          style={[
            GlobalStyle.TextStyle400_25_16,
            { color: GlobalAppColor.White },
          ]}
        >
          {menuName}
        </Text>
      </Pressable>
      <View
        style={{
          borderColor: "#BEC3CC",
          borderWidth: 1.5,
          opacity: 0.1,
        }}
      ></View>
    </>
  );
};
