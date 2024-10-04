import { Text, View } from "react-native";
import { GlobalFont, GlobalAppColor, GlobalStyle } from "../../../../CONST";

export const DetailItem = ({ label, value }) => {
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 12 }}>
        <Text style={GlobalStyle.TextStyle500_25_16}>{label}:</Text>
        <Text style={GlobalStyle.TextStyle400_25_16}>{value}</Text>
      </View>
    </>
  );
};
