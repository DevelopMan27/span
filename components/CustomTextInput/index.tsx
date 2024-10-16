import { FC } from "react";
import { Platform, StyleSheet, TextInput, View, Text } from "react-native";
import { CustomTextInputProps } from "../../type";
import { GlobalAppColor, GlobalStyle } from "../../CONST";

export const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  rightIcon,
  handlePasswordVisibility,
  inputType,
  containerStyle,
  inputContainerStyle,
  errorMessage,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[
          styles.textInput,
          inputContainerStyle,
          GlobalStyle.TextStyle400_25_16,
          {
            fontSize: 14,
            lineHeight: 19.07,
            color: GlobalAppColor.Black,
            borderColor: errorMessage ? "red" : GlobalAppColor.InputBorder, // Change border color based on error
          },
          Platform.OS === "ios" && { lineHeight: 0 },
          inputType === "Password" && styles.passwordTextInput,
        ]}
        placeholder={placeholder}
        placeholderTextColor={GlobalAppColor.GREY}
        onChangeText={onChangeText}
        value={value}
        editable={true}
        keyboardType={keyboardType}
        autoCapitalize="characters"
        {...props}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  passwordContainer: {
    backgroundColor: "#2A2F3E",
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 4,
  },
  passwordToggleContainer: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    height: 40,
    width: 40,
    justifyContent: "center",
  },
  passwordToggleImage: {
    height: 20,
    width: 20,
  },
  textInput: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    backgroundColor: GlobalAppColor.InputBackGround,
    borderRadius: 4,
    borderWidth: 1,
    width: "100%",
    height: 42,
    paddingLeft: 16,
    paddingRight: 16,
    overflow: "hidden",
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginTop: 2,
  },
  passwordTextInput: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    fontSize: 15,
    color: "white",
    width: "90%",
    height: 52,
  },
});
