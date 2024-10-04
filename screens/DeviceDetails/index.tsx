import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { GlobalAppColor, GlobalFont, GlobalStyle } from "../../CONST";
import { CustomTextInput } from "../../components/CustomTextInput";
import React, { useEffect, useState } from "react";
import { PopUpModal } from "../../components/PopUp";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DropdownComponent } from "../../components/Spinner";
import { btoa } from "react-native-quick-base64";
import {
  convertDateFormat,
  getData,
  getGreetingMessage,
  getUserData,
  getUserToken,
} from "../../utils";
import { CameraCompo } from "./camera";
import Toast from "react-native-toast-message";
import { RouteNames } from "../../navigation/routesNames";

export const DeviceDetails = () => {
  const route = useRoute();
  const { parsedResult } = route.params;
  const { data } = route.params;
  //console.log("mydata", parsedResult);
  const primaryInfo = parsedResult["PRIMARY INFORMATION"];
  // console.log("Primary Information page:", primaryInfo);
  // console.log("Primary Information page:", primaryInfo.CAMERAS.length);
  //console.log("SECONDARY Information page:", parsedResult[""]);
  const [QR_STSTEM_TYPE, setQR_SYSTEM_TYPE] = useState("");
  const [QR_STSTEM_ADMIN, setQR_SYSTEM_ADMIN] = useState("");
  //console.log("mydata", parsedResult);

  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [layouts, setLayouts] = useState(false);
  const userData = async () => {
    const userDetails = await getUserData();
    if (userDetails) {
      setName(userDetails?.data?.user_name);
      setUid(userDetails?.data?.user_id);
    }
  };

  // Accessing specific fields
  const date = primaryInfo["DATE"];
  const machine = primaryInfo["MACHINE"];
  const hdd = primaryInfo["HDD"];
  const gu = primaryInfo["GU"];
  const invoice = primaryInfo["INVOICE"];
  const io = primaryInfo["IO"];
  const poid = primaryInfo["PO_ID"];
  const product = primaryInfo["PRODUCT"];
  const productNo = primaryInfo["PRODUCT NO"];
  const key = primaryInfo["Key"];
  const cameras = primaryInfo["CAMERAS"];

  const [invoiceData, setInvoiceData] = useState([]);
  const [lensData, setLensData] = useState([]);
  const [cameraData, setCameraData] = useState([]);
  const [ioData, setIoData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [comName, setComName] = useState("");
  const [comLoc, setComLoc] = useState("");
  const [cameraName, setCameraName] = useState("");
  const [computerInfo, setComputerInfo] = useState("");
  const [ioInfo, setIoInfo] = useState("");
  const [camSerialInfo, setCamSerialInfo] = useState("");
  const [inputval, setInputval] = useState("");
  const [outputval, setOutputval] = useState("");
  const [remark, setRemark] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalval, setModalval] = useState("");
  const [inhouse, setInhouse] = useState("");
  const [admin, setAdmin] = useState("");

  const DeviceSchema = Yup.object().shape({
    invoiceNumber: Yup.string(),
    purchaseNumber: Yup.string(),
    modelNumber: Yup.string(),
    companyName: Yup.string(),
    companyLocation: Yup.string(),
    serviceTag: Yup.string(),
    serviceNo: Yup.string(),
    ioServiceNo: Yup.string(),
    inputs: Yup.string(),
    outputs: Yup.string(),
    macid: Yup.string(),
    setupverion: Yup.string(),
    remark: Yup.string(),
  });

  const handleCallback = (childData) => {
    setCamSerialInfo(childData);
  };

  const formik = useFormik({
    validationSchema: DeviceSchema,
    enableReinitialize: true,
    initialValues: {
      invoiceNumber: invoice,
      purchaseNumber: poid,
      modelNumber: "",
      companyName: "",
      companyLocation: "",
      serviceTag: "",
      serviceNo: "",
      macid: "",
      setupverion: "",
      remark: "",
    },
    onSubmit: async (values) => {
      //   checkUser();
      // //console.log("values", values);
      // signInWithPhoneNumber(values.mobile);
    },
  });

  console.log("pindex", primaryInfo["PRODUCT NO"]);
  console.log("type -----   ", QR_STSTEM_TYPE);
  // const createProduct = async () => {
  //   let productNoString = primaryInfo["PRODUCT NO"]; // The string
  //   let productNoArray = productNoString.split(",");

  //   const token = await getUserToken();
  //   const userData = await getUserData();
  //   const dObject = {
  //     authorization: token,
  //     input: {
  //       p_index: productNoArray, // Assuming this is an array data
  //       qr_string: data,
  //       invoice_number:
  //         invoice.toUpperCase() +
  //         "$" +
  //         hdd["validity"] +
  //         " " +
  //         hdd["id"] +
  //         "$" +
  //         gu["validity"] +
  //         " " +
  //         gu["id"],
  //       purchase_number: poid,
  //       machine_name: machine,
  //       model_number: hdd["id"] + "-" + modalval,
  //       company_name: comName,
  //       ipc_service_tag: computerInfo.label + "\r\n" + modalval,
  //       io_service_number:
  //         ioInfo +
  //         "\n" +
  //         inputval +
  //         "\n" +
  //         outputval +
  //         "\n" +
  //         primaryInfo.MACHINE,
  //       lens_info: "",
  //       setup_version: formik.values.setupverion.toString(),
  //       engineer_id: uid,
  //       qc_id: "2",
  //       remark: remark,
  //       key: key,
  //       in_house_flag: "0",
  //       location: comLoc,
  //       changed_json: parsedResult["SECONDARY INFO"],
  //       uni_casting_admin: null,
  //       camera_serial_number: camSerialInfo,
  //     },
  //   };

  //   console.log(dObject);

  //   const encodedData = btoa(JSON.stringify(dObject));
  //   const finalData = { data: encodedData };

  //   try {
  //     const response = await fetch(
  //       "https://hum.ujn.mybluehostin.me/span/v1/addproduct.php",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(finalData),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     // If the response indicates success, show an alert
  //     if (result.success) {
  //       // Adjust based on the response structure
  //       Alert.alert("Success", "Product has been created successfully!");
  //     } else {
  //       Alert.alert("Error", "Failed to create product. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //     Alert.alert("Error", "An error occurred while creating the product.");
  //   }
  // };

  const navigatation = useNavigation();
  const createProduct = async () => {
    if (JSON.parse(QR_STSTEM_TYPE) == "In House") {
      setInhouse("1");
    } else {
      setInhouse("0");
    }
    console.log(inhouse);
    if (JSON.parse(QR_STSTEM_TYPE) != "In House") {
      if (
        !invoice ||
        !hdd["validity"] ||
        !hdd["id"] ||
        !gu["validity"] ||
        !gu["id"] ||
        !poid ||
        !machine ||
        !modalval ||
        !comName ||
        !computerInfo.label ||
        !inputval ||
        !outputval ||
        !primaryInfo.MACHINE ||
        !formik.values.setupversion ||
        !remark ||
        !comLoc ||
        !camSerialInfo
      ) {
        Alert.alert("Validation Error", "All fields must be filled out.");
        return; // Stop the function if validation fails
      }
    }

    // Perform validation first for individual fields
    // if (!primaryInfo["PRODUCT NO"]) {
    //   Alert.alert("Validation Error", "Product No must be filled out.");
    //   return;
    // }
    // if (!invoice) {
    //   Alert.alert("Validation Error", "Invoice must be filled out.");
    //   return;
    // }
    // if (!hdd["validity"]) {
    //   Alert.alert("Validation Error", "HDD validity must be filled out.");
    //   return;
    // }
    // if (!hdd["id"]) {
    //   Alert.alert("Validation Error", "HDD ID must be filled out.");
    //   return;
    // }
    // if (!gu["validity"]) {
    //   Alert.alert("Validation Error", "GU validity must be filled out.");
    //   return;
    // }
    // if (!gu["id"]) {
    //   Alert.alert("Validation Error", "GU ID must be filled out.");
    //   return;
    // }
    // if (!poid) {
    //   Alert.alert("Validation Error", "Purchase Number must be filled out.");
    //   return;
    // }
    // if (!machine) {
    //   Alert.alert("Validation Error", "Machine Name must be filled out.");
    //   return;
    // }

    // if (!comName) {
    //   Alert.alert("Validation Error", "Company Name must be filled out.");
    //   return;
    // }
    // if (!comLoc) {
    //   Alert.alert("Validation Error", "Company Location must be filled out.");
    //   return;
    // }
    // if (!computerInfo.label) {
    //   Alert.alert("Validation Error", "Computer Info must be selected.");
    //   return;
    // }
    // if (!modalval) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Computer Service Number must be filled out."
    //   );
    //   return;
    // }
    // if (!ioInfo) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Computer Service Number must be filled out."
    //   );
    //   return;
    // }
    // if (ioInfo && layouts) {
    //   if (!inputval) {
    //     Alert.alert("Validation Error", "Input Value must be filled out.");
    //     return;
    //   }
    //   if (!outputval) {
    //     Alert.alert("Validation Error", "Output Value must be filled out.");
    //     return;
    //   }
    //   if (!primaryInfo.MACHINE) {
    //     Alert.alert("Validation Error", "Mac Id must be filled out.");
    //     return;
    //   }
    // }
    // console.log(camSerialInfo);
    // if (!camSerialInfo) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Camera Serial Number must be filled out."
    //   );
    //   return;
    // }
    // if (camSerialInfo && Array.isArray(camSerialInfo)) {
    //   for (let i = 0; i < camSerialInfo.length; i++) {
    //     if (!camSerialInfo[i].model) {
    //       Alert.alert("Validation Error", `Camera model ${i + 1} must be selected.`);
    //       return;
    //     }
    //     if (!camSerialInfo[i].lens) {
    //       Alert.alert("Validation Error", `Lens ${i + 1} must be selected.`);
    //       return;
    //     }
    //   }
    // }

    // if (!remark) {
    //   Alert.alert("Validation Error", "Work Order must be filled out.");
    //   return;
    // }
    // if (!formik.values.setupversion) {
    //   Alert.alert("Validation Error", "Setup Version must be filled out.");
    //   return;
    // }
    // if (!uid) {
    //   Alert.alert("Validation Error", "Engineer ID must be filled out.");
    //   return;
    // }

    // if (!key) {
    //   Alert.alert("Validation Error", "Key must be filled out.");
    //   return;
    // }

    // if (!parsedResult["SECONDARY INFO"]) {
    //   Alert.alert("Validation Error", "Secondary Info must be filled out.");
    //   return;
    // }

    let productNoString = primaryInfo["PRODUCT NO"];
    let productNoArray = productNoString.split(",");

    const token = await getUserToken();
    const userData = await getUserData();

    const dObject = {
      authorization: token,
      input: {
        p_index: productNoArray,
        qr_string: data,
        invoice_number:
          invoice.toUpperCase() +
          "$" +
          hdd["validity"] +
          " " +
          hdd["id"] +
          "$" +
          gu["validity"] +
          " " +
          gu["id"],
        purchase_number: poid,
        machine_name: machine,
        model_number: hdd["id"] + "-" + modalval,
        company_name: comName,
        ipc_service_tag: computerInfo.label + "\r\n" + modalval,
        io_service_number:
          ioInfo +
          "\n" +
          inputval +
          "\n" +
          outputval +
          "\n" +
          primaryInfo.MACHINE,
        lens_info: "",
        setup_version: formik.values.setupversion, // Typo corrected
        engineer_id: uid,
        qc_id: QR_STSTEM_ADMIN,
        remark: remark,
        key: key,
        in_house_flag: inhouse,
        location: comLoc,
        changed_json: parsedResult["SECONDARY INFO"],
        uni_casting_admin: QR_STSTEM_ADMIN,
        camera_serial_number: camSerialInfo,
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    console.log(dObject);

    try {
      const response = await fetch(
        "https://hum.ujn.mybluehostin.me/span/v1/addproduct.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        console.log("network");
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("result done", result);
      if (result.data == true) {
        // ToastAndroid.showWithGravity("")
        Alert.alert("Success", "Product has been created successfully!");

        setModalval("");
        setComName("");
        setComputerInfo("");
        setIoInfo("");
        setInputval("");
        setOutputval("");
        setUid("");
        setRemark("");
        setComLoc("");
        setCamSerialInfo("");
        navigatation.navigate(RouteNames.HomeScreen);
      } else {
        Alert.alert("Error", "Failed to create product. Please try again.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      // Alert.alert("Error", "An error occurred while creating the product.");
    }
  };

  const getProductList = async () => {
    //console.log("sadfdghmjgfdsadsADV");
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

    setAllData(result.data.additional_data.mast_company_info);
    setLensData(result.data.additional_data.mast_comp_lens_serial);
    setIoData(
      result.data.additional_data.mast_io_serial_number.map((item) => ({
        label: item.io_name,
        value: item.id,
      }))
    );
    setCompanyData(
      result.data.additional_data.mast_ipc_service_tag.map((item) => ({
        label: item.tag_name,
        value: item.id,
      }))
    );

    setCameraData(
      result.data.additional_data.mast_lens_info.map((item) => ({
        label: item.lens_name,
        value: item.id,
      }))
    );
    //console.log("my results ----- company lens info --  ",lensData);
    // console.log("my results ----- company lens info -- ", JSON.stringify(result.data.additional_data, null, 2));
    const invoiceData = result.data?.latest_products?.map(
      (product: MachineRecord) => {
        const inid = product.invoice_number.split(" ");
        const invoice = inid[0];
        return {
          key: product.id,
          colors:
            product.status == "0"
              ? ["rgba(0, 128, 0, 0.3)", "rgba(255, 255, 255, 0.3)"]
              : ["rgba(10, 80, 156, 0.3)", "rgba(255, 255, 255, 0.3)"],
          borderColor: "#BEC3CC",
          statusColor:
            product.status == "1"
              ? GlobalAppColor.GREEN
              : GlobalAppColor.APPRED,
          companyName: product.company_name,
          location: `(${product.location})`,
          status: product.status == "1" ? "Approved" : "Pending",
          invoiceNo: invoice,
          date: convertDateFormat(product.created_on),
          id: product.id,
        };
      }
    );

    if (invoiceData) {
      setInvoiceData(invoiceData);
    }
  };

  const getSystemAndAdminData = async () => {
    const QR_ADMIN_TYPEs = await getData("QR_STSTEM_ADMIN");
    const QR_STSYEM_TYPEs = await getData("QR_SYSTEM_TYPE");
    const ab = JSON.parse(QR_ADMIN_TYPEs);
    setQR_SYSTEM_ADMIN(ab.value);
    console.log("set admin", ab.label);
    setQR_SYSTEM_TYPE(QR_STSYEM_TYPEs);
  };

  useEffect(() => {
    getProductList();
    userData();
    getSystemAndAdminData();
  }, []);

  return (
    <>
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            marginHorizontal: 26,
            marginVertical: 23,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: 13,
              flex: 1,
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Invoice Number :
              </Text>
              <CustomTextInput
                inputType="Text"
                placeholder="Enter Invoice No"
                value={formik.values.invoiceNumber}
                onChangeText={(text) => {
                  formik.setFieldValue("invoiceNumber", text);
                }}
                editable={false}
              />
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Purchase Number:
              </Text>
              <CustomTextInput
                inputType="Text"
                value={formik.values.purchaseNumber}
                placeholder="Enter Purchase No"
                editable={false}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 5,
              }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Model Number:
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  columnGap: 7,
                  // flex: 1,
                }}
              >
                <View style={{ width: "auto", display: "flex", flex: 1 / 2 }}>
                  <CustomTextInput
                    inputType="Text"
                    value={primaryInfo["HDD"]["id"]}
                    inputContainerStyle={{
                      backgroundColor: GlobalAppColor.AppWhite,
                      borderColor: "#BEC3CC",
                    }}
                  />
                </View>
                <View style={{ width: "auto", display: "flex", flex: 1 }}>
                  <CustomTextInput
                    inputType="Text"
                    placeholder="Enter Purchase No"
                    value={modalval}
                    editable={false}
                  />
                </View>
              </View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Company Info:
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", rowGap: 8 }}
              >
                {/* <Text>{JSON.parse(QR_STSTEM_TYPE)}</Text> */}
                {/* <CustomTextInput
                  inputType="Text"
                  placeholder="Enter Company Name"
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.AppWhite,
                  }}
                  onChangeText={(text) => setComName(text)} // Use onChangeText to get the input value directly
                /> */}
                <CustomTextInput
                  inputType="Text"
                  placeholder="Enter Company Name"
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.White,
                  }}
                  value={QR_STSTEM_TYPE === "In House" ? "SPAN" : comName}
                  onChange={(event) => {
                    event.persist(); // Persist the event to avoid it being reused
                    setComName(event.nativeEvent.text); // Use the text from nativeEvent if you need more control
                  }}
                />

                {/* <CustomTextInput
                  inputType="Text"
                  placeholder="Enter Company Location"
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.AppWhite,
                  }}
                  onChange={(text) => setComLoc(text)}
                /> */}

                <CustomTextInput
                  inputType="Text"
                  placeholder="Enter Company Location"
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.White,
                  }}
                  value={comLoc}
                  onChange={(event) => {
                    event.persist(); // Persist the event to avoid it being reused
                    setComLoc(event.nativeEvent.text); // Use the text from nativeEvent if you need more control
                  }}
                />
              </View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Computer Info:
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", rowGap: 8 }}
              >
                {/* <CustomTextInput
                  inputType="Text"
                  placeholder=""
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.AppWhite,
                  }}
                /> */}
                <DropdownComponent
                  data={companyData}
                  subtitle={"Select Item"}
                  onChange={(Text) => {
                    setComputerInfo(Text);
                  }}
                />
                <CustomTextInput
                  inputType="Text"
                  placeholder="Enter Service No"
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.White,
                  }}
                  onChangeText={(text) => {
                    setModalval(text);
                  }}
                />
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 5,
              }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                I/O Info:
              </Text>
              {/* <CustomTextInput
                inputType="Text"
                placeholder=""
                inputContainerStyle={{
                  backgroundColor: GlobalAppColor.AppWhite,
                }}
              /> */}
              <DropdownComponent
                data={ioData}
                subtitle={"Select Item"}
                onChange={(item) => {
                  //console.log(item.label);
                  const val = item.label;
                  if (val.includes("COGNEX")) {
                    setLayouts(false);
                  } else if (val.includes("BECKHOFF")) {
                    setLayouts(true);
                  } else {
                    setLayouts(false);
                  }
                  setIoInfo(item.label);
                  // setIsFocus(false);
                }}
              />
              {layouts && (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      columnGap: 7,
                      // flex: 1,
                    }}
                  >
                    <View
                      style={{ width: "auto", display: "flex", flex: 1 / 2 }}
                    >
                      <CustomTextInput
                        inputType="Text"
                        value="INPUT"
                        inputContainerStyle={{
                          backgroundColor: GlobalAppColor.InputBackGround,
                          borderColor: "#BEC3CC",
                        }}
                        editable={false}
                      />
                    </View>
                    <View style={{ width: "auto", display: "flex", flex: 1 }}>
                      <CustomTextInput
                        inputType="Text"
                        placeholder=""
                        inputContainerStyle={{
                          backgroundColor: GlobalAppColor.AppWhite,
                          borderColor: "#BEC3CC",
                        }}
                        value={inputval} // Ensure this is the field name you defined in formik's initial values
                        onChangeText={(text) => {
                          setInputval(text); // Pass the raw text value
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      columnGap: 7,
                      // flex: 1,
                    }}
                  >
                    <View
                      style={{ width: "auto", display: "flex", flex: 1 / 2 }}
                    >
                      <CustomTextInput
                        inputType="Text"
                        value="OUTPUT"
                        editable={false}
                        inputContainerStyle={{
                          backgroundColor: GlobalAppColor.InputBackGround,
                          borderColor: "#BEC3CC",
                        }}
                      />
                    </View>
                    <View style={{ width: "auto", display: "flex", flex: 1 }}>
                      <CustomTextInput
                        inputType="Text"
                        placeholder=""
                        inputContainerStyle={{
                          backgroundColor: GlobalAppColor.AppWhite,
                          borderColor: "#BEC3CC",
                        }}
                        value={outputval}
                        onChangeText={(text) => {
                          setOutputval(text); // Pass the raw text value
                        }}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      columnGap: 7,
                      // flex: 1,
                    }}
                  >
                    <View
                      style={{ width: "auto", display: "flex", flex: 1 / 2 }}
                    >
                      <CustomTextInput
                        inputType="Text"
                        value="MAC ID"
                        editable={false}
                        inputContainerStyle={{
                          backgroundColor: GlobalAppColor.InputBackGround,
                          borderColor: "#BEC3CC",
                        }}
                      />
                    </View>
                    <View style={{ width: "auto", display: "flex", flex: 1 }}>
                      <CustomTextInput
                        inputType="Text"
                        placeholder={primaryInfo.MACHINE}
                        inputContainerStyle={{
                          backgroundColor: GlobalAppColor.AppWhite,
                          borderColor: "#BEC3CC",
                        }}
                        editable={false}
                        value={formik.values.macid}
                        onChange={(text) => formik.setFieldValue("macid", text)}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 5,
              }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Camera Info:
              </Text>
              {primaryInfo.CAMERAS.length > 0 &&
                cameraData.length > 0 &&
                lensData.length > 0 &&
                allData.length > 0 && (
                  <CameraCompo
                    data={primaryInfo.CAMERAS}
                    cameraData={cameraData}
                    lensData={lensData}
                    allData={allData}
                    parentCallBack={handleCallback}
                  />
                )}
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Work Order:
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", rowGap: 8 }}
              >
                <CustomTextInput
                  inputType="Text"
                  placeholder="Enter Work Order"
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.White,
                  }}
                  value={remark}
                  onChange={(Text) => {
                    setRemark(Text);
                  }}
                />
              </View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Setup Version:
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", rowGap: 8 }}
              >
                {/* <CustomTextInput
                  inputType="Text"
                  placeholder=""
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.AppWhite,
                  }}
                  value={formik.values.setupverion}
                  onChange={(Text) => {
                    formik.setFieldValue("setupverion", Text);
                  }}
                /> */}

                <CustomTextInput
                  inputType="Text"
                  placeholder="Setup version"
                  inputContainerStyle={{
                    backgroundColor: GlobalAppColor.White,
                  }}
                  value={formik.values.setupversion} // Corrected typo
                  onChangeText={(text) => {
                    formik.setFieldValue("setupversion", text);
                  }}
                  onBlur={() => {
                    const dotCount = (
                      formik.values.setupversion.match(/\./g) || []
                    ).length;
                    if (dotCount !== 3) {
                      Alert.alert(
                        "Invalid Input",
                        "Value must contain three dots."
                      );
                    }
                  }}
                />
              </View>
            </View>
            <View
              style={{ display: "flex", flexDirection: "column", rowGap: 5 }}
            >
              <Text
                style={[
                  GlobalStyle.TextStyle500_25_16,
                  { fontSize: 14, lineHeight: 25 },
                ]}
              >
                Engineer Name:
              </Text>
              <View
                style={{ display: "flex", flexDirection: "column", rowGap: 8 }}
              >
                <CustomTextInput inputType="Text" placeholder={name} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={{ display: "flex", marginHorizontal: 26, marginBottom: 30 }}
        >
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => {
              createProduct();
            }}
          >
            <Text
              style={[
                GlobalStyle.TextStyle500_25_16,
                { fontSize: 16, color: GlobalAppColor.White },
              ]}
            >
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
      {modalVisible && (
        <PopUpModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 31,
    paddingBottom: 29,
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
