import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import DateTimePicker from "react-native-ui-datepicker";
import { CheckBox } from "react-native-elements";

const CustomDatePicker = ({ label, date, onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => setShowPicker(!showPicker);

  const handleDateChange = (params) => {
    onDateChange(params);
    setShowPicker(false);
  };

  return (
    <TouchableOpacity onPress={togglePicker} style={styles.datePickerContainer}>
      <Text style={styles.dateLabel}>{label}</Text>
      <TouchableOpacity onPress={togglePicker} style={styles.dateButton}>
        <Text style={styles.dateButtonText}>
          {date.toISOString().split("T")[0]}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker mode="single" date={date} onChange={handleDateChange} />
      )}
    </TouchableOpacity>
  );
};

export const FilterModal = ({
  modalVisible,
  setModalVisible,
  applyFilter,
  initialFilters,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  applyFilter: (filters: any) => void;
  initialFilters: any;
}) => {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleTabPress = (inHouse: number, approved: number) => {
    setFilters({ ...filters, inHouse, approved });
  };

  const handleCheckboxChange = (field: string) => {
    setFilters({ ...filters, [field]: !filters[field] });
  };

  const handleApply = () => {
    applyFilter(filters);
    setModalVisible(false);
  };

  return (
    <Modal
      statusBarTranslucent={false}
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      style={styles.modal}
    >
      <ScrollView style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.tabContainer}>
            <Pressable
              style={[
                styles.tabButton,

                filters.approved === 0 && styles.activeTab,
              ]}
              onPress={() => handleTabPress(0, 0)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  filters.approved === 0 && styles.activeTabText,
                ]}
              >
                All
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                filters.inHouse === 1 &&
                  filters.approved === 1 &&
                  styles.activeTab,
              ]}
              onPress={() => handleTabPress(1, 1)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  filters.inHouse === 1 &&
                    filters.approved === 1 &&
                    styles.activeTabText,
                ]}
              >
                In House
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                filters.inHouse === 0 &&
                  filters.approved === 1 &&
                  styles.activeTab,
              ]}
              onPress={() => handleTabPress(0, 1)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  filters.inHouse === 0 &&
                    filters.approved === 1 &&
                    styles.activeTabText,
                ]}
              >
                Onsite
              </Text>
            </Pressable>
          </View>

          <CheckBox
            title="Invoice Number"
            checked={filters.invoiceNumber}
            onPress={() => handleCheckboxChange("invoiceNumber")}
          />
          <CheckBox
            title="Model Number"
            checked={filters.modelNumber}
            onPress={() => handleCheckboxChange("modelNumber")}
          />
          <CheckBox
            title="Company Name"
            checked={filters.companyName}
            onPress={() => handleCheckboxChange("companyName")}
          />
          <CheckBox
            title="Camera Serial Number"
            checked={filters.cameraSerialNumber}
            onPress={() => handleCheckboxChange("cameraSerialNumber")}
          />

          <CustomDatePicker
            label="Start Date:"
            date={new Date(filters.startDate)}
            onDateChange={(params) =>
              setFilters({
                ...filters,
                startDate: params.date.toISOString().split("T")[0],
              })
            }
          />

          <CustomDatePicker
            label="End Date:"
            date={new Date(filters.endDate)}
            onDateChange={(params) =>
              setFilters({
                ...filters,
                endDate: params.date.toISOString().split("T")[0],
              })
            }
          />

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={handleApply}
          >
            <Text style={styles.buttonText}>Apply</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "white",
  },
  modalView: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: GlobalAppColor.AppBlue,
    alignItems: "center",
    backgroundColor: "#E8E8E8",
  },
  activeTab: {
    backgroundColor: GlobalAppColor.AppBlue,
  },
  tabButtonText: {
    color: GlobalAppColor.AppBlue,
  },
  activeTabText: {
    color: "white",
  },
  dateLabel: {
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: GlobalAppColor.AppBlue,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.8,
  },
});
