import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HomeStyle } from "../Home/style";
import { GlobalAppColor } from "../../CONST";
import { RenderInvoiceItem } from "../Home/components/HomeView/RenderInvoiceItem";
import { CustomTextInput } from "../../components/CustomTextInput";
import { Fontisto } from "@expo/vector-icons";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import {
  convertDateFormat,
  debounce,
  getUserData,
  getUserToken,
} from "../../utils";
import { MachineRecord } from "../../type";
import { btoa, atob } from "react-native-quick-base64";
import { CheckBox } from "react-native-elements";

export const License = () => {
  const [invoiceData, setInvoiceData] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(invoiceData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const fetchLicensesDebounced = useCallback(
    debounce((text: string) => {
      fetchLicenses(text);
    }, 5000),
    []
  );

  const fetchLicenses = async (searchText: string) => {
    try {
      //console.log("searched text===>", searchText);

      const token = await getUserToken();
      const user = await getUserData();

      if (!token || !user) {
        throw new Error("User token or user data is missing.");
      }

      const dObject = {
        authorization: token,
        input: {
          tab_id: "",
          offset: "0",
          limit: "10",
          uid: user?.data.user_id,
          utype: 2,
          text: searchText ?? "m",
          filter: [""],
        },
      };

      //console.log("usertype",user?.data.user_type)
      //console.log("user",user?.data.user_id)

      const encodedData = btoa(JSON.stringify(dObject));
      //console.log("encoded data====>", encodedData);

      const finalData = { data: encodedData };

      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/filter_product.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      //console.log("response status---->", response.status);
      //console.log("response headers---->", response.headers);

      // Log the response as text
      let responseText = await response.text();
      //console.log("Raw Response Text:", responseText);

      // Remove any extraneous content by extracting only the JSON part
      const jsonResponseStart = responseText.indexOf("{");
      const jsonResponseEnd = responseText.lastIndexOf("}") + 1;
      responseText = responseText.substring(jsonResponseStart, jsonResponseEnd);

      try {
        const result = JSON.parse(responseText);
        //console.log("Parsed API Response:", result);

        if (!result.data) {
          throw new Error("No data found in the response.");
        }

        const invoiceData = result.data.map((product: MachineRecord) => {
          return {
            key: product.id,
            colors:
              product.status == "0"
                ? ["rgba(0, 128, 0, 0.3)", "rgba(255, 255, 255, 0.3)"]
                : ["rgba(10, 80, 156, 0.3)", "rgba(255, 255, 255, 0.3)"],
            borderColor: "#BEC3CC",
            statusColor: GlobalAppColor.APPRED,
            companyName: product.company_name,
            location: `(${product.location})`,
            status: product.status == "1" ? "Approved" : "Pending",
            invoiceNo: product.invoice_number,
            date: convertDateFormat(product.created_on),
            id: product.id,
          };
        });

        if (invoiceData.length > 0) {
          setInvoiceData(invoiceData);
        } else {
          console.warn("No invoice data available.");
        }
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
      }
    } catch (error) {
      console.error("Error fetching licenses:", error.message);
    }
  };

  useEffect(() => {
    setFilteredData(
      invoiceData?.filter(
        (item) =>
          item?.companyName
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase()) ||
          item?.invoiceNo?.toLowerCase()?.includes(searchText.toLowerCase()) ||
          item?.location?.toLowerCase()?.includes(searchText.toLowerCase()) ||
          item?.status?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, invoiceData]);

  useEffect(() => {
    fetchLicensesDebounced(searchText);
  }, [searchText, fetchLicensesDebounced]);

  return (
    <SafeAreaView style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <View
        style={{
          marginHorizontal: 25,
          marginTop: 28,
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          columnGap: 8,
        }}
      >
        <CustomTextInput
          inputType="Text"
          inputContainerStyle={{
            backgroundColor: GlobalAppColor.AppWhite,
            flex: 1,
          }}
          placeholder="Search..."
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
        <Pressable
          onPress={toggleModal}
          style={{
            width: 42,
            height: 42,
            borderColor: "#BEC3CC",
            borderWidth: 1,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
          }}
        >
          <Image
            source={require("../../assets/filterIcon.png")}
            style={{ width: 32, height: 32 }}
          />
        </Pressable>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 31,
          marginTop: 5,
          flex: 1,
        }}
      >
        {isModalVisible && <Text style={{margin:25}}>Filters</Text>}

        {filteredData.length === 0 ? (
          <View style={styles.noDataView}>
            <Text style={styles.noDataText}>No data available.</Text>
          </View>
        ) : (
          <FlashList
            data={filteredData}
            renderItem={RenderInvoiceItem}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={SeparatorComponent}
            estimatedItemSize={100}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const SeparatorComponent = () => <View style={{ height: 20 }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    marginTop: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  noDataView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#888",
  },
});
