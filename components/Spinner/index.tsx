import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { GlobalAppColor } from "../../CONST";

export const DropdownComponent = ({ data, subtitle, onChange, errorMessage }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
        style={[
          styles.dropdown,
          isFocus && { borderColor: "black" },
          { borderColor: errorMessage ? "red" : GlobalAppColor.InputBorder },
        ]}
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
        searchPlaceholder="Type here..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          onChange(item); // Call the onChange function passed in props
          setIsFocus(false);
        }}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  dropdown: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  label: {
    position: "absolute",
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
  errorText: {
    color: "red",
    fontSize: 10,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
