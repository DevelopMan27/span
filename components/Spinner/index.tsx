import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { GlobalAppColor, GlobalFont, GlobalStyle } from "../../CONST";
import AntDesign from "@expo/vector-icons/AntDesign";



export const DropdownComponent = ({data,subtitle,onChange}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


//   //console.log("--- received data ---",data)
//   //console.log("--- received subtitle ---",subtitle)
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "black" }]}>
          {subtitle}
        </Text>
      );
    }
    return null;
  };

 

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "black" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? subtitle : ""}
        searchPlaceholder="type here..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        // (item) => {
        //     // //console.log(item.label)
        //   setValue(item.value);
        //   setIsFocus(false);
        // }
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? "black" : "black"}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: "white",
    // padding: 16,
    marginTop:12
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    // backgroundColor: "white",
    left: 22,
    top: -12,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
