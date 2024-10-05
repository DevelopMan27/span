import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GlobalAppColor } from "../../CONST";
import { RenderInvoiceItem } from "../Home/components/HomeView/RenderInvoiceItem";
import { CustomTextInput } from "../../components/CustomTextInput";
import {
  convertDateFormat,
  debounce,
  getUserData,
  getUserToken,
} from "../../utils";
import { useFocusEffect } from "@react-navigation/native";
import { FilterModal } from "../../components/FilterModal";
import { btoa } from "react-native-quick-base64";
import { AppliedFilters } from "../../components/FilterModal/AppliedFilters";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};
const getDate = (addDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + addDays);
  return date.toISOString().split("T")[0];
};
export const License = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    tabId: 0,
    inHouse: 0,
    approved: 0,
    invoiceNumber: false,
    modelNumber: false,
    companyName: false,
    cameraSerialNumber: false,
    startDate: getTodayDate(),
    endDate: getDate(30),
  });

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const clearAllFilters = () => {
    setFilters({
      tabId: 0,
      inHouse: 0,
      approved: 0,
      invoiceNumber: false,
      modelNumber: false,
      companyName: false,
      cameraSerialNumber: false,
      startDate: getTodayDate(),
      endDate: getDate(30),
    });
    setSearchText("");
    fetchLicenses(searchText, filters);
  };

  const applyFilter = (newFilters: any) => {
    let tabid = 0;
    let inHouse = newFilters.inHouse;
    let approved = newFilters.approved;

    if (inHouse === 1 && approved === 1) {
      tabid = 2;
    } else if (inHouse === 0 && approved === 1) {
      tabid = 1;
    } else if (approved === 0) {
      tabid = 0;
    }

    const updatedFilters = {
      ...newFilters,
      tabId: tabid,
    };

    setFilters(updatedFilters);
    fetchLicenses(searchText, updatedFilters);
  };

  const fetchLicensesDebounced = useCallback(
    debounce((text: string, filters: any) => {
      fetchLicenses(text, filters);
    }, 100),
    []
  );
  const handleSearch = (text: string) => {
    setSearchText(text);
    fetchLicenses(text, filters);
  };
  const fetchLicenses = async (searchText: string, filters: any) => {
    try {
      setLoading(true);
      const token = await getUserToken();
      const user = await getUserData();

      if (!token || !user) {
        throw new Error("User token or user data is missing.");
      }

      const filterArray = [];
      if (filters.invoiceNumber) filterArray.push("invoice_number");
      if (filters.modelNumber) filterArray.push("model_number");
      if (filters.companyName) filterArray.push("company_name");
      if (filters.cameraSerialNumber) filterArray.push("camera_serial_number");

      const dObject = {
        authorization: token,
        input: {
          tab_id: filters.tabId,
          uid: user?.data.user_id,
          utype: user?.data.user_type,
          text: searchText || "",
          limit: 10,
          offset: 0,
          filter: filterArray,
          startdate: filters.startDate,
          enddate: filters.endDate,
        },
      };
      const encodedData = btoa(JSON.stringify(dObject));
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

      const result = await response.json();
      console.log("data length--", result.sql);
      console.log("data length--", result.data.length);
      if (!result.data || result.data.length === 0) {
        setInvoiceData([]);
      } else {
        const invoiceData = result.data.map((product: any) => ({
          key: product.id,
          colors:
            product.status === "1"
              ? ["rgba(0, 128, 0, 0.3)", "rgba(255, 255, 255, 0.3)"]
              : ["rgba(10, 80, 156, 0.3)", "rgba(255, 255, 255, 0.3)"],
          borderColor: "#BEC3CC",
          statusColor:
            product.status === "1"
              ? GlobalAppColor.GREEN
              : GlobalAppColor.APPRED,
          companyName: product.company_name,
          location: `(${product.location})`,
          status: product.status === "1" ? "Approved" : "Pending",
          invoiceNo: product.invoice_number,
          date: convertDateFormat(product.created_on),
          id: product.id,
        }));
        setInvoiceData(invoiceData);
      }
    } catch (error) {
      console.error("Error fetching licenses:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLicensesDebounced(searchText, filters);
    }, [fetchLicensesDebounced])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <CustomTextInput
          inputType="Text"
          inputContainerStyle={styles.searchInput}
          placeholder="Search..."
          onChangeText={setSearchText}
          onSubmitEditing={() => handleSearch(searchText)}
          returnKeyType="search"
          value={searchText}
        />
        <Pressable onPress={toggleFilterModal} style={styles.filterButton}>
          <Image
            source={require("../../assets/filterIcon.png")}
            style={styles.filterIcon}
          />
        </Pressable>
      </View>
      <AppliedFilters filters={filters} onClearAll={clearAllFilters} />
      <View style={styles.listContainer}>
        {invoiceData.length === 0 ? (
          <View style={styles.noDataView}>
            <Text style={styles.noDataText}>No data available.</Text>
          </View>
        ) : (
          <FlashList
            data={invoiceData}
            renderItem={RenderInvoiceItem}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={SeparatorComponent}
            estimatedItemSize={100}
          />
        )}
      </View>
      <FilterModal
        modalVisible={isFilterModalVisible}
        setModalVisible={setFilterModalVisible}
        applyFilter={applyFilter}
        initialFilters={filters}
      />
    </SafeAreaView>
  );
};

const SeparatorComponent = () => <View style={{ height: 20 }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    marginHorizontal: 25,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  searchInput: {
    backgroundColor: GlobalAppColor.AppWhite,
    flex: 1,
  },
  filterButton: {
    width: 42,
    height: 42,
    borderColor: "#BEC3CC",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  filterIcon: {
    width: 32,
    height: 32,
  },
  listContainer: {
    flex: 1,
    marginTop: 5,
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
