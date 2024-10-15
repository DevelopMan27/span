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
import { GlobalAppColor } from "../../CONST";
import DateTimePicker from "react-native-ui-datepicker";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons"; // Importing Ionicons from react-native-vector-icons
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../navigation/routesNames";

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
      <View
        style={{
          borderColor: GlobalAppColor.GREY,
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
        }}
      >
        <View style={styles.datePickerWrapper}>
          <Text style={styles.dateButtonText}>
          {date ? date.toISOString().split("T")[0] : "Select Date"} {/* Show "Select Date" if blank */}
          </Text>
          <Icon
            name="calendar-outline"
            size={20}
            color="#000"
            style={styles.icon}
          />
        </View>
      </View>
      {showPicker && (
        <DateTimePicker mode="single" date={date || new Date()} onChange={handleDateChange} />
      )}
    </TouchableOpacity>
  );
};


export const FilterModal = ({
  modalVisible,
  setModalVisible,
  applyFilter,
  initialFilters}) => {
  const [filters, setFilters] = useState(initialFilters);
  const { navigate } = useNavigation(); 
  
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleTabPress = (inHouse, approved) => {
    setFilters({ ...filters, inHouse, approved });
  };

  const handleCheckboxChange = (field) => {
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
          <View style={{ display: "flex", flexDirection: "row" }}>
            <CustomDatePicker
              label="Start Date:"
              date={filters.startDate ? new Date(filters.startDate) : new Date()} // Default to a new Date if empty
              onDateChange={(params) =>
                setFilters({
                  ...filters,
                  startDate: params.date.toISOString().split("T")[0],
                })
              }
            />

            <CustomDatePicker
              label="End Date:"
              date={filters.endDate ? new Date(filters.endDate) : new Date()} // Default to a new Date if empty
              onDateChange={(params) =>
                setFilters({
                  ...filters,
                  endDate: params.date.toISOString().split("T")[0],
                })
              }
            />
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                { marginRight: 10 },
                { flex: 1 }, // Ensure both buttons take equal space
              ]}
              onPress={() => setModalVisible(false)} // Correct cancel behavior
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                { flex: 1 },
              ]}
              onPress={handleApply}
            >
              <Text style={styles.buttonText}>APPLY</Text>
            </Pressable>
          </View>
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
  datePickerContainer: {
    padding: 10,
    width: "50%",
  },
  datePickerWrapper: {
    flexDirection: "row", // Align text and icon in a row
    alignItems: "center", // Vertically center the text and icon
    borderColor: GlobalAppColor.AppGrey,
    justifyContent: "space-between", // Align text to the left and icon to the right
  },
  dateButtonText: {
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginLeft: 10, // Add space between the text and the icon
  },
});
