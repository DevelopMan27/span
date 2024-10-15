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
import React, { useCallback, useEffect, useState } from "react";
import { PopUpModal } from "../../components/PopUp";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
  const [errors, setErrors] = useState({});

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

  const navigatation = useNavigation();
  const createProduct = async () => {
    // Determine the inhouse flag based on QR_STSTEM_TYPE
    setInhouse(JSON.parse(QR_STSTEM_TYPE) === "In House" ? "1" : "0");
    console.log(inhouse);
    if (inhouse === "0") {
      const newErrors = {};
    
      // Validate company name and location
      console.log("comName", comName);
      if (!comName) {
        newErrors.comName = "Company Name Is Required.";
      } else if (!comLoc) {
        newErrors.comLoc = "Company Location Is Required.";
      }
    
      // Validate computer info
      else if (!computerInfo.label) {
        newErrors.computerInfo = "Computer Info Must Be Selected.";
        console.log(newErrors.computerInfo);
      } else if (!modalval) {
        newErrors.modalval = "Computer Service Number Must Be Selected.";
        console.log(newErrors.modalval);
      } else if (!ioInfo) {
        newErrors.ioInfo = "IO Info Must Be Filled Out.";
      } else if (ioInfo && layouts) {
        if (!inputval) {
          newErrors.inputval = "Input Value Must Be Filled Out.";
        } else if (!outputval) {
          newErrors.outputval = "Output Value Must Be Filled Out.";
        } else if (!primaryInfo.MACHINE) {
          newErrors.primaryInfo = newErrors.primaryInfo || {};
          newErrors.primaryInfo.MACHINE = "Mac ID Must Be Filled Out.";
        }
      }
    
      // Validate remark and setup version
      if (remark === "") {
        newErrors.remark = "Work Order Must Be Filled Out.";
        console.log("error", remark);
      }
      if (!formik.values.setupversion) {
        newErrors.setupversion = "Setup Version Must Be Filled Out.";
        console.log("error", formik.values.setupversion);
      }else if(formik.values.setupversion){
        const dotCount = (
          formik.values.setupversion.match(/\./g) || []
        ).length;
        if(dotCount != 3){
          newErrors.setupversion = "Setup Version Must Be contain 3 dots";
        }
      }else if (!camSerialInfo) {
        newErrors.camSerialInfo = "Camera Serial Number Must Be Filled Out.";
      } else if (Array.isArray(camSerialInfo)) {
        for (let i = 0; i < camSerialInfo.length; i++) {
          if (!camSerialInfo[i].model) {
            newErrors.camSerialInfo = newErrors.camSerialInfo || {};
            newErrors.camSerialInfo[`model${i + 1}`] = `Camera Model ${i + 1} Must Be Selected.`;
          }
          if (!camSerialInfo[i].lens) {
            newErrors.camSerialInfo = newErrors.camSerialInfo || {};
            newErrors.camSerialInfo[`lens${i + 1}`] = `Lens ${i + 1} Must Be Selected.`;
          }
        }
      }
    
      // Set the errors to display under the respective fields
      setErrors(newErrors);
    
      // If any errors exist, stop the function execution
      if (Object.keys(newErrors).length > 0) {
        console.log("Validation errors:", newErrors);
        return;
      }
    }
    
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
        company_name: inhouse === "1" ? "SPAN" : comName,
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
        setup_version: formik.values.setupversion,
        engineer_id: uid,
        qc_id: QR_STSTEM_ADMIN,
        remark: remark,
        key: key,
        in_house_flag: inhouse,
        location: inhouse === "1" ? "AHMEDABAD" : comLoc,
        changed_json: parsedResult["SECONDARY INFO"],
        uni_casting_admin: QR_STSTEM_ADMIN,
        camera_serial_number: camSerialInfo,
      },
    };
    const encodedData = btoa(JSON.stringify(dObject));
    const finalData = { data: encodedData };
    console.log(remark);
    console.log(formik.values.setupversion);


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
      if (result.data === true) {
        setModalVisible(true);
        // Reset form fields
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
      } else {
        Alert.alert("Error", "Failed to create product. Please try again.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      Alert.alert("Error", "An error occurred while creating the product.");
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

  useFocusEffect(
    useCallback(() => {
      getProductList();
      userData();
      getSystemAndAdminData();
    }, [])
  );

  // useEffect(() => {
  //   getProductList();
  //   userData();
  //   getSystemAndAdminData();
  // }, []);

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
                    placeholder=""
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
                  errorMessage={errors.comName}
                  value={QR_STSTEM_TYPE === '"In House"' ? "SPAN" : comName}
                  editable={QR_STSTEM_TYPE === '"In House"' ? false : true}
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
                  value={QR_STSTEM_TYPE === '"In House"' ? "AHMEDABAD" : comLoc}
                  editable={QR_STSTEM_TYPE === '"In House"' ? false : true}
                  onChange={(event) => {
                    event.persist(); // Persist the event to avoid it being reused
                    setComLoc(event.nativeEvent.text); // Use the text from nativeEvent if you need more control
                  }}
                  errorMessage={errors.comLoc}
                />
              </View>
            </View>
            {QR_STSTEM_TYPE != '"In House"' && (
              <>
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
                    Computer Info:
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 8,
                    }}
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
                      errorMessage={errors.computerInfo}
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
                      errorMessage={errors.modalval}
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
                    }}
                    errorMessage={errors.ioInfo}
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
                          style={{
                            width: "auto",
                            display: "flex",
                            flex: 1 / 2,
                          }}
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
                        <View
                          style={{ width: "auto", display: "flex", flex: 1 }}
                        >
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
                            errorMessage={errors.inputval}
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
                          style={{
                            width: "auto",
                            display: "flex",
                            flex: 1 / 2,
                          }}
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
                        <View
                          style={{ width: "auto", display: "flex", flex: 1 }}
                        >
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
                            errorMessage={errors.outputval}
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
                          style={{
                            width: "auto",
                            display: "flex",
                            flex: 1 / 2,
                          }}
                        >
                          <CustomTextInput
                            inputType="Text"
                            value="MAC ID"
                            inputContainerStyle={{
                              backgroundColor: GlobalAppColor.InputBackGround,
                              borderColor: "#BEC3CC",
                            }}
                          />
                        </View>
                        <View
                          style={{ width: "auto", display: "flex", flex: 1 }}
                        >
                          <CustomTextInput
                            inputType="Text"
                            inputContainerStyle={{
                              backgroundColor: GlobalAppColor.AppWhite,
                              borderColor: "#BEC3CC",
                            }}
                            editable={true}
                            value={formik.values.macid}
                            onChange={(text) =>
                              formik.setFieldValue("macid", text)
                            }
                            // errorMessage={errors.primaryInfo.MACHINE}
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
                        errors={errors}
                      />
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
                    Work Order:
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 8,
                    }}
                  >
                    <CustomTextInput
                      inputType="Text"
                      placeholder="Enter Work Order"
                      inputContainerStyle={{
                        backgroundColor: GlobalAppColor.White,
                      }}
                      value={remark}
                      onChangeText={(text) => {
                        setRemark(text); // Pass the raw text value
                      }}
                      errorMessage={errors.remark}
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
                    Setup Version:
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 8,
                    }}
                  >
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
                      errorMessage={errors.setupversion}
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
                    Engineer Name:
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: 8,
                    }}
                  >
                    <CustomTextInput inputType="Text" value={name} editable={false}/>
                  </View>
                </View>
              </>
            )}
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
