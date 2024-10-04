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

const getListOfAllCat = async () => {
  try {
    const token = await getUserToken();
    const user = await getUserData();

    const dObject = {
      authorization: token,
      input: {
        req_type: "view_list",
      },
    };

    const encodedData = btoa(JSON.stringify(dObject));
    const response = await fetch(
      `https://hum.ujn.mybluehostin.me/span/v1/products_category_master_all.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encodedData }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.data) {
      throw new Error("Invalid response format");
    }

    // Transform the categories data
    const formattedData = result.data.map(({ cat_id, cat_name }) => ({
      label: cat_name,
      value: cat_id,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error; // re-throw the error after logging it
  }
};

export const AddLenseInfoBottomSheet = ({
  getListOfAllProducts,
}: {
  getListOfAllProducts: () => void;
}) => {
  const { closeAddNewPartBottomSheetRefFun } = useBottomSheetContext();
  const [updatedName, setUpdatedName] = useState<string | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const updateProductSub = async (status: "disable" | "update" | "enable") => {
    const token = await getUserToken();

    const dObject = {
      authorization: token,
      input: {
        lens_id: "",
        lens_name: updatedName,
        req_type: "create",
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    //console.log("===", dObject);
    const finalData = { data: encodedData };
    //console.log("finalData", JSON.stringify(finalData));
    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/lens_info_all.php",
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

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getListOfAllCat();
      setCategories(data);
    } catch (error) {
      // Handle error, e.g., show a notification to the user
      console.error("Error fetching categories:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <View style={styles.container}>
        <Text style={[GlobalStyle.TextStyle600_20_27, { alignSelf: "center" }]}>
          Add New Lense Info
        </Text>
        <CustomTextInput
          inputType="Text"
          inputContainerStyle={{
            backgroundColor: GlobalAppColor.AppWhite,
            // flex: 1,
            marginTop: 58,
          }}
          placeholder="Enter lense info"
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
