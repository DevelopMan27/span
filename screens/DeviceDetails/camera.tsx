import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { DropdownComponent } from "../../components/Spinner";
import { GlobalAppColor } from "../../CONST";
import { CustomTextInput } from "../../components/CustomTextInput";

export const CameraCompo = ({
  data,
  cameraData,
  lensData,
  allData,
  parentCallBack,
}) => {
  const [companyFullName, setCompanyFullName] = useState("");
  const [newLensData, setNewLensData] = useState([]);
  const [selectedCameras, setSelectedCameras] = useState([]);
  const [selectedLens, setSelectedLens] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);

  // Function to filter data based on camera short ID
  const setmyspinner = (short, end) => {
    const company = allData.find((item) => item.company_short_name === short);

    if (company) {
      const filteredLenses = lensData.filter(
        (item) => item.company_id === company.id
      );

      // Set filtered lenses to the state
      setNewLensData(
        filteredLenses.map((item) => ({
          label: item.lens_name,
          value: item.id,
        }))
      );

      const abc = company.company_full_name.toUpperCase() + "$" + end;
      console.log(abc);
      // Add the company full name to the selected company state
      setSelectedCompany((prev) => [...prev, abc]);

      // Set the company full name to the state
      setCompanyFullName(company.company_full_name.toUpperCase());
    }
  };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setmyspinner(data[0].camera_id.substring(0, 2), data[0].camera_id.substring(2));
  //   }
  // }, [data, allData, lensData]);

  useEffect(() => {
    if (data.length > 0) {
      let cameraID = data[0].camera_id;
      if (!isNaN(cameraID.charAt(0))) {
        cameraID = cameraID.slice(1);
      }
      setmyspinner(cameraID.substring(0, 2), cameraID.substring(2));
    }
  }, [data, allData, lensData]);

  const createJSON = () => {
    return data.map((item, index) => {
      return {
        camera_serial_no: selectedCompany[index] || "",
        model: selectedCameras[index] || "",
        lens: selectedLens[index] || "",
      };
    });
  };

  // Update parent component with JSON output
  useEffect(() => {
    const jsonOutput = createJSON();
    parentCallBack(jsonOutput);
    console.log(jsonOutput); // Log the generated JSON to console (or use it as needed)
  }, [selectedCameras, selectedLens, selectedCompany]); // Update when selections change

  return data.map((item, index) => (
    <View key={index}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "nowrap",
          columnGap: 7,
        }}
      >
        {/* First input for displaying the company full name */}
        <View style={{ flex: 1 / 2 }}>
          <CustomTextInput
            inputType="Text"
            value={companyFullName} // Use company full name from state
            inputContainerStyle={{
              backgroundColor: GlobalAppColor.InputBackGround,
              borderColor: "#BEC3CC",
            }}
            editable={false}
          />
        </View>

        {/* Second input for Camera ID */}
        <View style={{ flex: 1 }}>
          <CustomTextInput
            inputType="Text"
            placeholder="Camera ID"
            value={item.camera_id.substring(2)} // Remove the first two digits
            inputContainerStyle={{
              backgroundColor: GlobalAppColor.AppWhite,
              borderColor: "#BEC3CC",
            }}
            editable={false}
          />
        </View>
      </View>

      {/* Dropdown for camera selection */}
      <DropdownComponent
        data={cameraData}
        subtitle={"Select Camera"}
        onChange={(value) => {
          setSelectedCameras((prev) => {
            const updatedCameras = [...prev];
            updatedCameras[index] = value.value; // Update the camera at the current index
            return updatedCameras;
          });
        }}
      />

      {/* Dropdown for lens selection */}
      <DropdownComponent
        data={newLensData} // Use new lens data if available
        subtitle={"Select Lens"}
        onChange={(value) => {
          setSelectedLens((prev) => {
            const updatedLenses = [...prev];
            updatedLenses[index] = value.value; // Update the lens at the current index
            return updatedLenses;
          });
        }}
      />
    </View>
  ));
};
