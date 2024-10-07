import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalAppColor } from "../../CONST";

interface AppliedFiltersProps {
  filters: {
    tabId: number;
    startDate: string;
    endDate: string;
    invoiceNumber: boolean;
    modelNumber: boolean;
    companyName: boolean;
    cameraSerialNumber: boolean;
  };
  onClearAll: () => void;
}

export const AppliedFilters: React.FC<AppliedFiltersProps> = ({
  filters,
  onClearAll,
}) => {
  const getTabName = (tabId: number) => {
    switch (tabId) {
      case 0:
        return "All";
      case 1:
        return "Outside";
      case 2:
        return "InHouse";
      default:
        return "";
    }
  };

  const appliedFilters = [
    getTabName(filters.tabId),
    filters.invoiceNumber ? "Invoice Number" : null,
    filters.modelNumber ? "Model Number" : null,
    filters.companyName ? "Company Name" : null,
    filters.cameraSerialNumber ? "Camera Serial Number" : null,
    `From: ${filters.startDate}`,
    `To: ${filters.endDate}`,
  ].filter(Boolean);

  if (appliedFilters.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.filterLabel}>Filter:</Text>
        <View style={styles.filtersContainer}>
          {appliedFilters.map((filter, index) => (
            <View key={index} style={styles.filterItem}>
              <Text style={styles.filterText}>{filter}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: GlobalAppColor.AppLightBlue,
  },
  headerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  filterLabel: {
    fontSize: 14,
    color: "#333",
    marginRight: 8,
    alignSelf: "flex-start",
    marginTop: 4, // Add some top margin to align with the first line of filters
  },
  filtersContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterItem: {
    marginRight: 8,
    marginBottom: 4,
  },
  filterText: {
    color: "black",
    fontSize: 14,
  },
  clearButton: {
    marginLeft: "auto",
    alignSelf: "flex-start",
    marginTop: 4, // Add some top margin to align with the first line of filters
  },
  clearButtonText: {
    color: GlobalAppColor.AppBlue,
    fontSize: 14,
    fontWeight: "bold",
  },
});
