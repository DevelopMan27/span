import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";
import SystemOption from "./SystemOption";
import React, { useEffect, useState } from "react";
import { makeRemote } from "react-native-reanimated/lib/typescript/reanimated2/mutables";
import { useNavigation } from "@react-navigation/native";
import { useBottomSheetContext } from "../../../../contexts/BottomSheetContext";
import { getUserData, getUserToken, storeData } from "../../../../utils";
import { btoa, atob } from "react-native-quick-base64";
import { getData } from "../../../../utils";

export const AdminBottomSheetChild = () => {
  const { navigate } = useNavigation();
  const {
    openQRScanBottomSheetFun,
    openSelectAdminBottomSheetFun,
    closeSelectAdminBottomSheetFun,
  } = useBottomSheetContext();
  const [QR_STSTEM_TYPE, setQR_SYSTEM_TYPE] = useState("");

  const [systemType, setSystemType] = useState<
    | "Admin1"
    | "Admin2"
    | "Admin3"
    | "Admin4"
    | "Admin5"
    | "Admin6"
    | undefined
    | string
  >(undefined);

  const [options, setOptions] = useState([]);

  const getAdminUserList = async () => {
    const token = await getUserToken();
    const userData = await getUserData();
    const dObject = {
      authorization: token,
      input: {
        id: userData?.id,
      },
    };

    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };

    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/master.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );
    const result = await response.json();
    // console.log("admins", result.data.additional_data.admins);
    // console.log("Super Users", result.data.additional_data.super_users);
    // console.log("type", userData?.data.user_type);
    // console.log("choice", QR_STSTEM_TYPE);

    const stype = await getSystemAndAdminData();

    let adminList = [];
    console.log("s type =====   ",stype);

    if (stype ===  "In House") {
      adminList = [
        ...result?.data?.additional_data?.admins?.map((admin) => ({
          label: admin.username,
          value: admin.id,
        })),
        ...result?.data?.additional_data?.super_users?.map((superUser) => ({
          label: superUser.username,
          value: superUser.id,
        })),
      ];
    } else if (stype === "On Site") {
      adminList = result?.data?.additional_data?.admins?.map((admin) => ({
        label: admin.username,
        value: admin.id,
      }));
    }
   
    console.log("admin selected", adminList);

  
    if (adminList.length > 0) {
      setOptions(adminList);
    }
  };

  const handleAdminChange = async (admin: string) => {
    setSystemType(admin.value);
    try {
      await storeData("QR_STSTEM_ADMIN", JSON.stringify(admin));
    } catch (error) {
      console.error("Error saving system type:", error);
    }
  };

  const getSystemAndAdminData = async () => {
    try {
        // Retrieve the QR_SYSTEM_TYPE data
        const QR_STSYEM_TYPEs = await getData("QR_SYSTEM_TYPE");
        
        // Check if QR_STSYEM_TYPEs is a string and remove surrounding quotes if present
        if (typeof QR_STSYEM_TYPEs === 'string') {
            const qrSystemType = QR_STSYEM_TYPEs.replace(/^"|"$/g, '');
            return qrSystemType;
        } else {
            // Handle unexpected data type
            console.warn("QR_SYSTEM_TYPE is not a string:", QR_STSYEM_TYPEs);
            return null; // or return a default value if needed
        }
    } catch (error) {
        console.error("Error fetching QR_SYSTEM_TYPE:", error);
        return null; // or handle the error as needed
    }
};


  useEffect(() => {
    getAdminUserList();
  }, []);

  if (!options) {
    return (
      <View
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          flex: 1,
          marginTop: "10px",
        }}
      >
        <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
      </View>
    );
  }
  return (
    <>
      <View
        style={[
          styles.container,
          {
            display: "flex",
            flexDirection: "column",
          },
        ]}
      >
        <Text style={[GlobalStyle.TextStyle600_20_27, { alignSelf: "center" }]}>
          Select Admin
        </Text>
        <View style={{ display: "flex", height: "80%" }}>
          {options.length > 0 ? (
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ marginTop: 29 }}>
                  <SystemOption
                    label={item.label}
                    selected={systemType === item.value}
                    onPress={() => handleAdminChange(item)}
                  />
                </View>
              )}
            />
          ) : (
            <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
          )}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 25,
          display: "flex",
          flex: 1,
          width: "100%",
          paddingHorizontal: 28,
        }}
      >
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => {
            closeSelectAdminBottomSheetFun();
            navigate("QRScan");
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 16, color: GlobalAppColor.White },
            ]}
          >
            Next
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
