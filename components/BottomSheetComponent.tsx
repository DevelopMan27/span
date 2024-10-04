import { View } from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { GlobalAppColor } from "../CONST";

const BottomSheet = ({ bottomSheetRef, children, height = 343 }) => {
  return (
    <RBSheet
      ref={bottomSheetRef}
      height={height}
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressBack={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.5)",
        },
        draggableIcon: {
          backgroundColor: "#ECF0F4",
          width: 100,
        },
        container: {
          backgroundColor: GlobalAppColor.AppWhite,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      }}
    >
      <View>{children}</View>
    </RBSheet>
  );
};

export default BottomSheet;
