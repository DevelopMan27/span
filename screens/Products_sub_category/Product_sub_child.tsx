import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import { useState } from "react";
import { getUserToken } from "../../utils";
import { btoa } from "react-native-quick-base64";
import { dataTypeSubCat } from "../../type";
import { CustomTextInput } from "../../components/CustomTextInput";
import { useBottomSheetContext } from "../../contexts/BottomSheetContext";

export const Product_sub_child = ({
  data,
  getListOfAllProducts,
}: {
  data: dataTypeSubCat | undefined;
  getListOfAllProducts: () => void;
}) => {
  const { closeProductSubCatBottomSheetFun } = useBottomSheetContext();
  const [updatedName, setUpdatedName] = useState<string | undefined>(undefined);

  const updateProductSub = async (status: "disable" | "update" | "enable") => {
    const token = await getUserToken();

    const dObject = {
      authorization: token,
      input: {
        sub_cat_id: data?.sub_cat_id,
        category_id: status === "disable" ? "" : data?.category_id,
        sub_cat_name: status === "disable" ? "" : updatedName,
        req_type: status,
        p_index: data?.p_index,
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    //console.log("===", dObject);
    const finalData = { data: encodedData };
    //console.log("finalData", JSON.stringify(finalData));
    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/products_sub_category_all.php",
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
    closeProductSubCatBottomSheetFun();
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[GlobalStyle.TextStyle600_20_27, { alignSelf: "center" }]}>
          {data?.sub_cat_name}
        </Text>
        <CustomTextInput
          inputType="Text"
          inputContainerStyle={{
            backgroundColor: GlobalAppColor.AppWhite,
            // flex: 1,
            marginTop: 58,
          }}
          placeholder=""
          value={updatedName ?? data?.sub_cat_name}
          onChangeText={(text) => {
            setUpdatedName(text);
          }}
        />
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
        <Pressable
          style={({ pressed }) => [
            {
              display: "flex",
              height: 48,
              width: "auto",
              backgroundColor: data?.status === "1" ? "#D8E0EC" : "#cb4335",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 32,
            },
            { width: "100%", marginTop: 25 },
            pressed && {
              opacity: 0.7,
            },
          ]}
          onPress={async () => {
            if (data?.status === "1") {
              Alert.alert(
                "Activate Confirmation",
                "Are you sure you want to Activate the item?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      await updateProductSub(
                        data?.status === "1" ? "enable" : "disable"
                      );
                    },
                  },
                ]
              );
            } else {
              // Show a confirmation alert
              Alert.alert(
                "Deactivate Confirmation",
                "Are you sure you want to Deactivate the item?",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async () => {
                      await updateProductSub(
                        data?.status === "1" ? "enable" : "disable"
                      );
                    },
                  },
                ]
              );
            }
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              {
                fontSize: 16,
                color:
                  data?.status === "1"
                    ? GlobalAppColor.Black
                    : GlobalAppColor.White,
              },
            ]}
          >
            {data?.status === "1" ? "Active" : "Deactivate"}
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
});
