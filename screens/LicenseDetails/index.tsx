import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../CONST";
import { SimpleLineIcons } from "@expo/vector-icons";
import { styles } from "../DeviceDetails";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ProductInfoType, RootStackParamList } from "../../type";
import { RouteNames } from "../../navigation/routesNames";
import React, { useEffect, useState } from "react";
import {
  formatDateForProductDetails,
  getData,
  getUserToken,
} from "../../utils";
import { btoa } from "react-native-quick-base64";
import CameraDetails from "./CameraDetails";

type LicenseDetailsProps = RouteProp<
  RootStackParamList,
  RouteNames.LicenseDetails
>;

export const LicenseDetails = () => {
  const [loading, setLoading] = useState(false);
  const {
    params: { id },
  } = useRoute<LicenseDetailsProps>();

  const [productDetails, setProductDetails] = useState<
    ProductInfoType | undefined
  >(undefined);

  const getProductDetails = async (id: string) => {
    const token = await getUserToken();
    const dObject = {
      authorization: token,
      input: {
        pro_id: id,
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    //console.log("finalData", JSON.stringify(finalData));
    const response = await fetch(
      "https://hum.ujn.mybluehostin.me/span/v1/singleproduct.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      }
    );
    const result = await response.json();
    console.log("result===", JSON.stringify(result, null, 2));
    setProductDetails(result);
  };

  const abc = productDetails?.basicInfo.io_service_number.split("\n");
  console.log(abc);
  const inid = productDetails?.basicInfo.invoice_number.split(" ");
  const invoice = inid ? inid[0] : null;
  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  if (loading || !productDetails) {
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
        }}
      >
        <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
      </View>
    );
  }
  const sendNotification = async (
    expoToken: string,
    title: string,
    message: string,
    id: String
  ) => {
    try {
      const token = await getUserToken();
      //console.log("token=========>", token);
      //console.log("expoToken====>", expoToken);
      const dObject = {
        to: expoToken,
        title: title,
        body: message,
        screen: "LicenseDetails",
      };

      //console.log("dObject====>", dObject);

      const encodedData = btoa(JSON.stringify(dObject));
      // const finalData = { data: dObject };
      //console.log("finalData_________________notification", encodedData);
      //console.log("expoToken", expoToken);
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/push_notification.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dObject),
        }
      );
      const result = await response.json();
      //console.log("notification_send_result", result);
    } catch (error) {
      console.error("Error Sending notification:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("loading   ", loading);

  const getUserDetails = async (id: string) => {
    try {
      const token = await getUserToken();
      const dObject = {
        authorization: token,
        input: {
          req_type: "view",
          id: id,
          username: "",
          designation: "",
          email: "",
        },
      };
      const encodedData = btoa(JSON.stringify(dObject));
      const finalData = { data: encodedData };
      //console.log("finalData", JSON.stringify(finalData));
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/single_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      const result = await response.json();
      //console.log("result======>", result);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const generateLicenseKey = async (action) => {
    console.log(action);

    try {
      const tokens = await getUserToken();
      const dObject = {
        authorization: tokens,
        input: {
          pro_id: productDetails.basicInfo.id,
          status: action,
        },
      };
      const encodedData = btoa(JSON.stringify(dObject));
      const finalData = { data: encodedData };
      //console.log("finalData", JSON.stringify(finalData));
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/handle_product.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      const result = await response.json();
      const token = await getData("EXPO_TOKEN");

      getUserDetails(productDetails?.basicInfo?.engineer_id);
      if (action == 1) {
        Alert.alert("Approved", "Product approved successfully..");
      } else {
        Alert.alert("Rejected", "Product rejected successfully..");
      }
      const engineerName =
        productDetails?.basicInfo?.engineer_name || "Engineer";
      if (token && productDetails?.basicInfo?.company_name && engineerName) {
        let msg = "";
        if (action == 1) {
          msg = "Product approved successfully.";
        } else {
          msg = "Product rejected successfully.";
        }
        sendNotification(
          token,
          productDetails?.basicInfo?.company_name,
          msg,
          productDetails?.basicInfo?.id
        );
        
      }
      //console.log("result======>", result);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        display: "flex",
        flex: 1,
        marginHorizontal: 26,
        marginTop: 26,
        paddingBottom: 10,
      }}
      contentContainerStyle={{
        paddingBottom: 40,
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
          style={[
            GlobalStyle.TextStyle500_25_16,
            { fontSize: 16, lineHeight: 25, color: "#00000080", flex: 1 },
          ]}
        >
          Invoice # {invoice}
        </Text>
        <Text
          style={[
            GlobalStyle.TextStyle500_25_16,
            { fontSize: 16, lineHeight: 25, color: "#00000080" },
          ]}
        >
          PO # {productDetails?.basicInfo.purchase_number}
        </Text>
      </View>
      <View style={{ marginTop: 13 }}>
        <Text
          style={[
            GlobalStyle.TextStyle600_20_27,
            { fontSize: 22, lineHeight: 25 },
          ]}
        >
          {productDetails?.basicInfo.company_name}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 13,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            columnGap: 6,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SimpleLineIcons name="location-pin" size={15} color="black" />
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 16, lineHeight: 25, color: "#00000080" },
            ]}
          >
            {productDetails?.basicInfo.location}
          </Text>
        </View>
        <Text
          style={[
            GlobalStyle.TextStyle500_25_16,
            { fontSize: 16, lineHeight: 25, color: "#00000080" },
          ]}
        >
          {productDetails?.basicInfo?.created_on &&
            formatDateForProductDetails(
              new Date(productDetails?.basicInfo?.created_on)
            )}
        </Text>
      </View>
      <View style={{ marginTop: 26 }}></View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: "#000000CC",
          opacity: 0.1,
        }}
      ></View>

      <View style={{ marginTop: 15 }}>
        <View style={{ display: "flex", flexDirection: "row", columnGap: 3 }}>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            Machine:
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            {productDetails?.basicInfo?.machine_name}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", columnGap: 3 }}>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            Model No :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25 },
            ]}
          >
            {productDetails?.basicInfo?.model_number}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 11 }}></View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: "#000000CC",
          opacity: 0.1,
        }}
      ></View>
      <View
        style={{
          marginTop: 11,
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
        }}
      >
        <Text style={[GlobalStyle.TextStyle500_25_16]}>Computer Info :</Text>
        <View style={{ marginLeft: 28, display: "flex", flexDirection: "row" }}>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            Make :{" "}
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            {/* Beckhoff CPU C6930-0040 */}
            {productDetails?.basicInfo.ipc_service_tag}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 11,
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
        }}
      >
        <Text style={[GlobalStyle.TextStyle500_25_16]}>
          Input / 0utput Info :
        </Text>
        <View style={{ marginLeft: 28, display: "flex", flexDirection: "row" }}>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            Make :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            {/* BECKHOFF CX8190 */}
            {abc?.[0] ? abc[0] : ""}
          </Text>
        </View>
        <View style={{ marginLeft: 28, display: "flex", flexDirection: "row" }}>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            INPUT :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            {abc?.[1] ? abc[1] : ""}
          </Text>
        </View>
        <View style={{ marginLeft: 28, display: "flex", flexDirection: "row" }}>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            OUTPUT :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            {abc?.[2] ? abc[2] : ""}
          </Text>
        </View>
        <View style={{ marginLeft: 28, display: "flex", flexDirection: "row" }}>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            MAC ID :
          </Text>
          <Text
            style={[
              GlobalStyle.TextStyle400_25_16,
              { fontSize: 14, lineHeight: 25, color: "#000000CC" },
            ]}
          >
            {abc?.[3] ? abc[3] : ""}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 11,
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
        }}
      >
        <Text style={[GlobalStyle.TextStyle500_25_16]}>
          Camera & Lens Info :
        </Text>
        {productDetails?.cameraDetails?.map((camera, index) => (
          <>
            <View key={index}>
              <CameraDetails
                label="Camera Serial"
                value={camera.camera_serial}
              />
              <CameraDetails label="Model" value={camera.model} />
              <CameraDetails label="Lens" value={camera.lens_name} />
            </View>
            <View style={{ marginBottom: 6 }}></View>
          </>
        ))}
      </View>
      <View style={{ marginTop: 13 }}></View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: "#000000CC",
          opacity: 0.1,
        }}
      ></View>
      <View style={{ marginTop: 15 }}></View>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 3 }}>
        <Text
          style={[
            GlobalStyle.TextStyle500_25_16,
            { fontSize: 14, lineHeight: 25 },
          ]}
        >
          Setup Version :
        </Text>
        <Text
          style={[
            GlobalStyle.TextStyle400_25_16,
            { fontSize: 14, lineHeight: 25 },
          ]}
        >
          {/* 1.3.4.5 */}
          {productDetails?.basicInfo?.setup_version}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 3 }}>
        <Text
          style={[
            GlobalStyle.TextStyle500_25_16,
            { fontSize: 14, lineHeight: 25 },
          ]}
        >
          Engineer :
        </Text>
        <Text
          style={[
            GlobalStyle.TextStyle400_25_16,
            { fontSize: 14, lineHeight: 25 },
          ]}
        >
          {/* Amit Patel */}
          {productDetails?.basicInfo?.engineer_name}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 3 }}>
        <Text
          style={[
            GlobalStyle.TextStyle500_25_16,
            { fontSize: 14, lineHeight: 25 },
          ]}
        >
          Work Order :
        </Text>
        <Text
          style={[
            GlobalStyle.TextStyle400_25_16,
            { fontSize: 14, lineHeight: 25 },
          ]}
        >
          {productDetails.basicInfo.remark}
        </Text>
      </View>
      <View style={{ marginTop: 13 }}></View>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: "#000000CC",
          opacity: 0.1,
        }}
      ></View>
      <View style={{ marginTop: 15 }}></View>
      {/* {productDetails?.basicInfo?.status === 0 ? (
        <>
          <Text style={[GlobalStyle.TextStyle500_25_16]}>Licence Key :</Text>
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              {
                fontSize: 18,
                lineHeight: 25,
                letterSpacing: 0.1,
                shadowColor: "#000",
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              },
            ]}
          >
            {productDetails?.basicInfo?.key}
          </Text>
        </>
      ) : (
        ""
      )} */}
      {console.log("status===============>", productDetails?.basicInfo?.status)}
      {productDetails?.basicInfo?.status == 0 ? (
        <>
          <Pressable
            onPress={() => generateLicenseKey(1)}
            disabled={loading}
            style={{
              width: "100%",
              height: 50,
              backgroundColor: GlobalAppColor.AppBlue,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text
                style={[GlobalStyle.TextStyle500_25_16, { color: "#ffffff" }]}
              >
                Approve
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => generateLicenseKey(2)}
            disabled={loading}
            style={{
              width: "100%",
              height: 50,
              backgroundColor: GlobalAppColor.AppBlue,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text
                style={[GlobalStyle.TextStyle500_25_16, { color: "#ffffff" }]}
              >
                Reject
              </Text>
            )}
          </Pressable>
        </>
      ) : (
        <View
          style={{
            width: "100%",
            marginTop: 11,
            backgroundColor: "#EDF4FF",
            height: 42,
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#D0D5DD",
          }}
        >
          <Text
            style={[
              GlobalStyle.TextStyle500_25_16,
              {
                fontSize: 18,
                lineHeight: 25,
                letterSpacing: 0.1,
                shadowColor: "#000",
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              },
            ]}
          >
            {/* DJA23-2JDN3-FJ4KK-AS99J */}
            {productDetails?.basicInfo?.key}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
