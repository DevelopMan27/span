import {
  ImageURISource,
  StyleProp,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { RouteNames } from "./navigation/routesNames";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  [RouteNames.HomeScreen]: undefined;
  [RouteNames.About]: undefined;
  [RouteNames.DrawerNavigation]: undefined;
  [RouteNames.SCANQR]: undefined;
  [RouteNames.Login]: undefined;
  [RouteNames.Register]: undefined;
  [RouteNames.OTP]: {
    confirm: FirebaseAuthTypes.ConfirmationResult;
    name?: string;
    mobile?: string;
    email?: string;
    designation?: string;
  };
  [RouteNames.LicenseDetails]: {
    id: string;
  };
  [RouteNames.NotificationList]: undefined;
  [RouteNames.License]: undefined;
  [RouteNames.UserList]: undefined;
  [RouteNames.UserDetails]: {
    id: string;
  };
  [RouteNames.Parts]: undefined;
  [RouteNames.Products_sub_category]: undefined;
  [RouteNames.Products_category_master]: undefined;
  [RouteNames.IO_serial_number]: undefined;
  [RouteNames.IPC_service_tag]: undefined;
  [RouteNames.Lens_info]: undefined;
  [RouteNames.Comp_lens_serial]: undefined;
  [RouteNames.UserProfile]: undefined;
};

export interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  handlePasswordVisibility?: () => void;
  rightIcon?: "eye" | "eye-off";
  inputType: "Password" | "Text" | "Email";
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

export interface User {
  name: string;
  mobile: string;
  email: string;
  id: string;
  designation?: "Admin" | "Super User" | "Regular User";
  updatedAt?: number;
  createdAt?: number;
}

type UserData = {
  user_id: string;
  user_name: string;
  user_mobile: string;
  user_fb_id: string;
  user_type: string;
  user_api_token: string;
  user_status: string;
  user_deviceId: string | null;
  designation: string;
};

export type TokenData = {
  token: string;
  username: string;
  id: string;
  role: string;
  eat: number;
  data: UserData;
};

export interface MachineRecord {
  id: string;
  qr_string: string;
  invoice_number: string;
  purchase_number: string;
  machine_name: string;
  model_number: string;
  company_name: string;
  ipc_service_tag: string;
  io_service_number: string;
  lens_info: string;
  setup_version: string;
  engineer_id: string;
  qc_id: string;
  remark: string;
  key: string;
  in_house_flag: string;
  created_on: string;
  expiry_date: string;
  status: string;
  location: string;
  barcode: string;
  two_d_code: string;
  changed_json: string;
  uni_casting_admin: string;
}

interface BasicInfo {
  id: string;
  qr_string: string;
  invoice_number: string;
  purchase_number: string;
  machine_name: string;
  model_number: string;
  company_name: string;
  ipc_service_tag: string;
  io_service_number: string;
  lens_info: string;
  setup_version: string;
  engineer_id: string;
  qc_id: string;
  remark: string;
  key: string;
  in_house_flag: string;
  created_on: string;
  expiry_date: string;
  status: string;
  location: string;
  barcode: string;
  two_d_code: string;
  changed_json: null | string;
  uni_casting_admin: null;
  engineer_name: null;
  qc_name: null;
}

interface CategoryDetail {
  category_name: string;
  sub_category: string; // Assuming you'll parse this as JSON later
}

interface CameraDetail {
  camera_serial: string;
  model: string;
  lens_name: string;
}

export interface ProductInfoType {
  basicInfo: BasicInfo;
  categoryDetails: CategoryDetail[];
  cameraDetails: CameraDetail[];
  changedJson: null | string;
}

export interface dataTypeSubCat {
  sub_cat_id: string;
  category_id: string;
  p_index: string;
  sub_cat_name: string;
  status: string;
}
export interface dataTypeCatMaster {
  cat_id: string;
  cat_name: string;
  status: string;
}

export interface dataTypeIOMaster {
  id: string;
  io_name: string;
  status: string;
}
export interface dataTypeIPCTAGMaster {
  id: string;
  tag_name: string;
  status: string;
}
export interface dataTypeLenceaster {
  id: string;
  lens_name: string;
  status: string;
}
export interface dataTypeComLenceSerial {
  id: string;
  lens_name: string;
  company_id: string;
  status: string;
}
