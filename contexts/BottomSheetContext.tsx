import React, {
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

export interface BottomSheetContextValue {
  openSelectAdminBottomSheetFun: () => void;
  openQRScanBottomSheetFun: () => void;
  isQRScanBottomSheetOpen: boolean;
  closeQRScanBottomSheetFun: () => void;
  closeSelectAdminBottomSheetFun: () => void;
  refRBSheet?: any;
  selectAdminBSheetRef?: any;
  openUpdateUserTypeBottomSheetFun: () => void;
  closeUpdateUserTypeBottomSheetFun: () => void;
  closeProductSubCatBottomSheetFun: () => void;
  openProductSubCatBottomSheetFun: () => void;
  openAddNewPartBottomSheetFun: () => void;
  closeAddNewPartBottomSheetRefFun: () => void;
  UpdateUserTypeBSheetRef?: any;
  UpdateProductSubCatBSheetRef?: any;
  AddNewPartBottomSheetRef?: any;
}
const BottomSheetContext = createContext<BottomSheetContextValue>({
  openSelectAdminBottomSheetFun: () => {},
  openQRScanBottomSheetFun: () => {},
  isQRScanBottomSheetOpen: false,
  closeQRScanBottomSheetFun: () => {},
  closeSelectAdminBottomSheetFun: () => {},
  refRBSheet: () => {},
  openUpdateUserTypeBottomSheetFun: () => {},
  closeUpdateUserTypeBottomSheetFun: () => {},
  UpdateUserTypeBSheetRef: undefined,
  closeProductSubCatBottomSheetFun: () => {},
  openProductSubCatBottomSheetFun: () => {},
  openAddNewPartBottomSheetFun: () => {},
  closeAddNewPartBottomSheetRefFun: () => {},
  UpdateProductSubCatBSheetRef: undefined,
  AddNewPartBottomSheetRef: undefined,
});

interface BottomSheetContextProviderProps {
  children: React.ReactNode;
}

const BottomsheetContextProvider: React.FC<BottomSheetContextProviderProps> = ({
  children,
}) => {
  const refRBSheet = useRef<any>();
  const selectAdminBSheetRef = useRef<any>();
  const UpdateUserTypeBSheetRef = useRef<any>();
  const UpdateProductSubCatBSheetRef = useRef<any>();
  const AddNewPartBottomSheetRef = useRef<any>();
  const [isQRScanBottomSheetOpen, setOpenQRScanBottomSheet] =
    useState<boolean>(false);

  const openQRScanBottomSheetFun = () => {
    refRBSheet?.current?.open();
  };
  const closeQRScanBottomSheetFun = () => {
    refRBSheet?.current?.close();
  };

  const openSelectAdminBottomSheetFun = () => {
    selectAdminBSheetRef?.current?.open();
  };
  const closeSelectAdminBottomSheetFun = () => {
    selectAdminBSheetRef?.current?.close();
  };

  const openUpdateUserTypeBottomSheetFun = () => {
    UpdateUserTypeBSheetRef?.current?.open();
  };
  const closeUpdateUserTypeBottomSheetFun = () => {
    UpdateUserTypeBSheetRef?.current?.close();
  };
  const openProductSubCatBottomSheetFun = () => {
    UpdateProductSubCatBSheetRef?.current?.open();
  };
  const closeProductSubCatBottomSheetFun = () => {
    UpdateProductSubCatBSheetRef?.current?.close();
  };
  const openAddNewPartBottomSheetFun = () => {
    AddNewPartBottomSheetRef?.current?.open();
  };
  const closeAddNewPartBottomSheetRefFun = () => {
    AddNewPartBottomSheetRef?.current?.close();
  };

  const value: BottomSheetContextValue = {
    openSelectAdminBottomSheetFun,
    isQRScanBottomSheetOpen,
    openQRScanBottomSheetFun,
    closeQRScanBottomSheetFun,
    closeSelectAdminBottomSheetFun,
    closeUpdateUserTypeBottomSheetFun,
    openUpdateUserTypeBottomSheetFun,
    openProductSubCatBottomSheetFun,
    closeProductSubCatBottomSheetFun,
    openAddNewPartBottomSheetFun,
    closeAddNewPartBottomSheetRefFun,
    refRBSheet,
    selectAdminBSheetRef,
    UpdateUserTypeBSheetRef,
    UpdateProductSubCatBSheetRef,
    AddNewPartBottomSheetRef,
  };

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
    </BottomSheetContext.Provider>
  );
};

const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      "usebottomsheetcontext must be used within a BottomsheetContextProvider"
    );
  }
  return context;
};

export { BottomsheetContextProvider, useBottomSheetContext };
