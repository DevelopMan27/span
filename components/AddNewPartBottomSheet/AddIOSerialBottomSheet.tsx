import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import React, { useCallback, useEffect, useState } from "react";
import { getUserData, getUserToken } from "../../utils";
import { btoa } from "react-native-quick-base64";
import {
  dataTypeCatMaster,
  dataTypeIOMaster,
  dataTypeSubCat,
} from "../../type";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useBottomSheetContext } from "../../contexts/BottomSheetContext";
import RNPickerSelect from "react-native-picker-select";
import { Dropdown } from "react-native-element-dropdown";

interface Category {
  label: string;
  value: string;
}

export const AddIOSerialBottomSheet = ({
  getListOfAllProducts,
}: {
  getListOfAllProducts: () => void;
}) => {
  const { closeAddNewPartBottomSheetRefFun } = useBottomSheetContext();
  const [updatedName, setUpdatedName] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);

  const updateProductSub = async (status: "disable" | "update" | "enable") => {
    const token = await getUserToken();

    const dObject = {
      authorization: token,
      input: {
        id: "",
        io_name: updatedName,
        req_type: "create",
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    //console.log("===", dObject);
    const finalData = { data: encodedData };
    //console.log("finalData", JSON.stringify(finalData));
    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/io_serial_number_all.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );

    const result = await response.json();
    //console.log("===result", result);
    getListOfAllProducts();
    closeAddNewPartBottomSheetRefFun();
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[GlobalStyle.TextStyle600_20_27, { alignSelf: "center" }]}>
          Add New IO Serial number
        </Text>
        <CustomTextInput
          inputType="Text"
          inputContainerStyle={{
            backgroundColor: GlobalAppColor.AppWhite,
            // flex: 1,
            marginTop: 58,
          }}
          placeholder="Enter IO serial number"
          value={updatedName}
          onChangeText={(text) => {
            setUpdatedName(text);
          }}
        />
        {/* <Dropdown
          style={[
            styles.dropdown,
            { marginTop: 24 },
            isFocus && { borderColor: "blue" },
          ]}
          // placeholderStyle={styles.placeholderStyle}
          // selectedTextStyle={styles.selectedTextStyle}
          // inputSearchStyle={styles.inputSearchStyle}
          // iconStyle={styles.iconStyle}
          data={categories}
          search
          inputSearchStyle={{ backgroundColor: GlobalAppColor.AppWhite }}
          containerStyle={{ backgroundColor: GlobalAppColor.AppWhite }}
          itemContainerStyle={{ backgroundColor: GlobalAppColor.AppWhite }}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        /> */}
        <Pressable
          style={({ pressed }) => [
            { marginTop: 56 },
            styles.button,
            pressed && styles.pressed,
          ]}
          onPress={() => updateProductSub("update")}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 16, color: GlobalAppColor.White },
            ]}
          >
            Save
          </Text>
        </Pressable>
      </View>
    </>
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
    // justifyContent: "space-between",
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

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
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
