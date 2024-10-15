import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
import { FilterModal } from "../../components/FilterModal/index";
import { btoa } from "react-native-quick-base64";
import { AppliedFilters } from "../../components/FilterModal/AppliedFilters";

// Helper function to get today's date in YYYY-MM-DD format
const getDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};
const getTodayDate = (addDays = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - addDays);
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
    startDate: "",
    endDate: "",
  });

  // Pagination states
  const [offset, setOffset] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);

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
      startDate: "", // Initially blank
      endDate: "", // Initially blank
    });

    setSearchText("");
    setOffset(0);
    fetchLicenses("", filters, 0);
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
    setOffset(0); // Reset offset
    fetchLicenses(searchText, updatedFilters, 0);
  };

  const fetchLicensesDebounced = useCallback(
    debounce((text: string, filters: any) => {
      fetchLicenses(text, filters, offset);
    }, 0),
    []
  );

  const handleSearch = (text: string) => {
    setSearchText(text);
    setOffset(0); // Reset offset
    fetchLicenses(text, filters, 0);
  };

  const fetchLicenses = async (
    searchText: string,
    filters: any,
    offset: number
  ) => {
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
          offset: Number(offset),
          filter: filterArray,
          startdate: filters.startDate,
          enddate: filters.endDate,
        },
      };

      console.log("offset --- -- - ", dObject);
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
      console.log("result", result.sql);

      if (!result.data || result.data.length === 0) {
        setInvoiceData([]);
        setHasMoreData(false);
      } else {
        const newInvoiceData = result.data.map((product: any) => ({
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
          status: product.status === 1 ? "Approved" : "Pending",
          invoiceNo: product.invoice_number,
          date: convertDateFormat(product.created_on),
          id: product.id,
          page:"licence"
        }));

        if (offset === 0) {
          setInvoiceData(newInvoiceData);
        } else {
          setInvoiceData((prevData) => [...prevData, ...newInvoiceData]);
        }
      }
    } catch (error) {
      console.error("Error fetching licenses:", error);
      setInvoiceData([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchLicensesDebounced(searchText, filters, offset);
    }, [fetchLicensesDebounced])
  );

  const handleLoadMore = () => {
    if (hasMoreData && !loading && invoiceData.length >= 10) {
      setOffset(Number(offset) + 10);
      fetchLicenses(searchText, filters, offset);
    }
  };

  console.log(filters);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          inputType="Text"
          inputContainerStyle={styles.searchInput}
          placeholder="Search..."
          onChangeText={setSearchText}
          onSubmitEditing={() => handleSearch(searchText)}
          returnKeyType="search"
          value={searchText}
          style={{
            backgroundColor: GlobalAppColor.AppWhite,
            marginRight: 10,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#BEC3CC",
            flex: 10,
            height: 42,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        />
        <Pressable onPress={toggleFilterModal} style={styles.filterButton}>
          <Image
            source={require("../../assets/filterIcon.png")}
            style={styles.filterIcon}
          />
        </Pressable>
      </View>
      {Object.values(filters).some(
        (filter) =>
          filter !== null && filter !== "" && filter !== false && filter !== 0
      ) && <AppliedFilters filters={filters} onClearAll={clearAllFilters} />}

      {loading && offset === 0 ? ( // Loading when fetching the first page
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
        </View>
      ) : (
        <View style={styles.listContainer}>
          {invoiceData.length === 0 ? (
           <View style={styles.noDataContainer}>
           <Image source={require('../../assets/nodata.png')}   style={styles.noDataImage} />
           {/* <Text style={styles.noDataText}>No data found</Text> */}
         </View>
          ) : (
            <FlashList
              data={invoiceData}
              renderItem={RenderInvoiceItem}
              estimatedItemSize={20}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              onEndReached={handleLoadMore}
              // ItemSeparatorComponent={SeparatorComponent}
              onEndReachedThreshold={0.5} // Trigger when reaching 50% from the end
              ListFooterComponent={
                loading && offset > 0 ? ( // Show loading spinner at bottom when fetching more data
                  <ActivityIndicator
                    color={GlobalAppColor.AppBlue}
                    style={styles.listFooterLoader}
                    size="small"
                  />
                ) : null
              }
            />
          )}
        </View>
      )}

      {/* {isFilterModalVisible && (
        <FilterModal
          modalVisible={isFilterModalVisible}
          onClose={toggleFilterModal}
          filters={filters}
          onApplyFilter={applyFilter}
        />
      )} */}
      <FilterModal
        modalVisible={isFilterModalVisible}
        setModalVisible={setFilterModalVisible}
        applyFilter={applyFilter}
        initialFilters={filters}
      />
    </SafeAreaView>
  );
};
// const SeparatorComponent = () => <View style={{ height: 20 }} />;

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
    display: "flex",
  },
  searchInput: {
    backgroundColor: GlobalAppColor.AppWhite,
    flex: 10,
  },
  filterButton: {
    width: 52,
    height: 42,
    borderColor: "#BEC3CC",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    flex: 2,
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
    textAlign: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#888",
    margin: "auto",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImage: {
    width: 250, // Set appropriate width for the image
    height: 250, // Set appropriate height for the image
    resizeMode: 'contain', // Optional: adjust the resize mode
  },
  listFooterLoader: {
    marginVertical: 20,
  },
});
