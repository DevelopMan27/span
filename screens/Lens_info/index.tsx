import { RouteProp, useRoute } from "@react-navigation/native";
import {
  RootStackParamList,
  dataTypeCatMaster,
  dataTypeIOMaster,
  dataTypeIPCTAGMaster,
  dataTypeLenceaster,
  dataTypeSubCat,
} from "../../type";
import { RouteNames } from "../../navigation/routesNames";
import {
  getStatusText,
  getUserData,
  getUserToken,
  statusColorMap,
  statusColorMapParts,
  userTypeTextMap,
} from "../../utils";
import { useEffect, useState } from "react";
import { btoa } from "react-native-quick-base64";
import { Pressable, ScrollView, Text, View } from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import { FlashList } from "@shopify/flash-list";
import BottomSheet from "../../components/BottomSheetComponent";
import { useBottomSheetContext } from "../../contexts/BottomSheetContext";
import { UpdateUserTypeChild } from "../UserDetails/UpdateUserTypeChild";
import { Product_cat_master_child } from "../Products_category_master/Product_cat_master_child";
import { IO_serial_child } from "../IO_serial_number/IO_serial_child";
import { IPC_service_child } from "../IPC_service_tag/IPC_service_child";
import { Lence_info_child } from "./Lence_info_child";
import { AddCategoryBottomSheet } from "../../components/AddNewPartBottomSheet/AddCategoryBottomSheet";
import { AddLenseInfoBottomSheet } from "../../components/AddNewPartBottomSheet/AddLenseInfoBottomSheet";
// import { IPC_service_child } from "./IPC_service_child";
// import { IO_serial_child } from "./IO_serial_child";
// import { Product_cat_master_child } from "./Product_cat_master_child";
// import { Product_sub_child } from "./Product_sub_child";

type PartDetailsProps = RouteProp<
  RootStackParamList,
  RouteNames.Products_category_master
>;

export const Lens_info = () => {
  // //console.log("NNNNNNN", name);
  const {
    UpdateProductSubCatBSheetRef,
    openProductSubCatBottomSheetFun,
    AddNewPartBottomSheetRef,
    openAddNewPartBottomSheetFun,
  } = useBottomSheetContext();
  const [selectedData, setSelectedData] = useState<
    dataTypeLenceaster | undefined
  >(undefined);

  const [data, setData] = useState<dataTypeLenceaster[]>([]);
  const getListOfAllProducts = async () => {
    const token = await getUserToken();
    const user = await getUserData();

    const dObject = {
      authorization: token,
      input: {
        lens_id: "",
        lens_name: "",
        req_type: "view_list",
      },
    };

    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    //console.log("finalData", finalData);
    const response = await fetch(
      `https://hum.ujn.mybluehostin.me/span/v1/lens_info_all.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );
    const result = await response.json();
    //console.log("result", result);
    setData(result.data);
  };

  useEffect(() => {
    getListOfAllProducts();
  }, []);
  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingHorizontal: 25,
          marginTop: 24,
        }}
      >
        <Pressable
          style={({ pressed }) => [
            { marginTop: 0, marginBottom: 27 },
            {
              display: "flex",
              height: 48,
              width: "auto",
              backgroundColor: "#0A509C",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 32,
            },
            pressed && {
              backgroundColor: "#083D75",
            },
          ]}
          onPress={() => openAddNewPartBottomSheetFun()}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 16, color: GlobalAppColor.White },
            ]}
          >
            Add new Lens info
          </Text>
        </Pressable>
        <View style={{ display: "flex", flex: 1 }}>
          <FlashList
            data={data}
            estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item, target, extraData }) => {
              return (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [
                    {
                      padding: 13,
                      borderWidth: 1,
                      borderRadius: 6,
                      borderColor: "#BEC3CC",
                      marginBottom: 22,
                    },
                    { backgroundColor: "#E0E0E0 " },
                  ]}
                  android_ripple={{ color: "#D3D3D3" }}
                  onPress={() => {
                    setSelectedData(item);
                    openProductSubCatBottomSheetFun();
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={
                        (GlobalStyle.TextStyle600_20_27,
                        { fontSize: 14, lineHeight: 19 })
                      }
                    >
                      {/* {item.username} */}
                      {item.lens_name}
                    </Text>
                    <View
                      style={{
                        borderColor: statusColorMapParts[item.status] || "#000",
                        borderWidth: 1,
                        paddingHorizontal: 15,
                        paddingVertical: 7,
                        borderRadius: 6,
                      }}
                    >
                      <Text
                        style={{
                          color: statusColorMapParts[item.status] || "#000",
                        }}
                      >
                        {item.status === "1" ? "Deactive" : "Active"}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
      <BottomSheet height={450} bottomSheetRef={UpdateProductSubCatBSheetRef}>
        <Lence_info_child
          data={selectedData}
          getListOfAllProducts={getListOfAllProducts}
        />
      </BottomSheet>
      <BottomSheet height={500} bottomSheetRef={AddNewPartBottomSheetRef}>
        <AddLenseInfoBottomSheet getListOfAllProducts={getListOfAllProducts} />
      </BottomSheet>
    </>
  );
};
