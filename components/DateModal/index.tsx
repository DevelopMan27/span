import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "react-native-ui-datepicker";

export const DateModal = ({
  modalVisible,
  setModalVisible,
  date,
  setDate,
}: {
  modalVisible: boolean;
  setModalVisible: any;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const { navigate } = useNavigation();
  //   const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      statusBarTranslucent={false}
      isVisible={modalVisible}
      onDismiss={() => setModalVisible(false)}
      style={{
        width: "97%",
        margin: 0,
        padding: 0,
        display: "flex",
        alignSelf: "center",
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { marginHorizontal: 26 }]}>
          <View style={{ marginTop: 14 }}>
            <DateTimePicker
              mode="single"
              date={date}
              onChange={(params) => {
                setDate(params.date);
              }}
            />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { width: "100%", marginTop: 36 },
              pressed && styles.pressed,
            ]}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text
              style={[
                GlobalStyle.TextStyle500_25_16,
                { fontSize: 16, color: GlobalAppColor.White },
              ]}
            >
              Ok
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  modalView: {
    paddingHorizontal: 26,
    width: "100%",
    margin: 20,
    backgroundColor: "#EDF4FF",
    borderRadius: 6,
    paddingBottom: 30,
    paddingTop: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  pressed: {
    backgroundColor: "#083D75",
  },
});
