import React from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalFont, GlobalAppColor } from "../../../../CONST";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../../../navigation/routesNames";

const InvoiceItem = ({
  colors,
  borderColor,
  statusColor,
  companyName,
  location,
  status,
  invoiceNo,
  date,
  id,
}) => {
  const { navigate } = useNavigation();
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginHorizontal: 25,
        borderWidth: 1,
        borderColor: borderColor,
        paddingRight: 20,
        paddingTop: 22,
        paddingLeft: 20,
        paddingBottom: 17,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        rowGap: 5,
        flex: 1,
      }}
    >
      <Pressable
        onPress={() => {
          navigate(RouteNames.LicenseDetails, {
            id: id,
          });
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              display: "flex",
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: GlobalFont.OpenSans_600SemiBold,
                fontSize: 20,
                lineHeight: 27.24,
                color: GlobalAppColor.Black,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {companyName}
            </Text>
            <Text
              style={{
                fontFamily: GlobalFont.OpenSans_600SemiBold,
                fontSize: 11,
                lineHeight: 14.98,
                color: GlobalAppColor.BlackWithOpacity,
              }}
            >
              {location}
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: statusColor,
              borderRadius: 6,
              padding: 7,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: GlobalFont.OpenSans_400Regular,
                fontSize: 11,
                lineHeight: 14.98,
                color: statusColor,
              }}
            >
              {status}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontFamily: GlobalFont.OpenSans_600SemiBold,
              fontSize: 16,
              lineHeight: 25,
              color: GlobalAppColor.AppGrey,
            }}
            numberOfLines={2}
          >
            Invoice No: {invoiceNo}
          </Text>
          <Text
            style={{
              fontFamily: GlobalFont.OpenSans_600SemiBold,
              fontSize: 16,
              lineHeight: 25,
              color: GlobalAppColor.AppGrey,
            }}
          >
            Date: {date}
          </Text>
        </View>
      </Pressable>
    </LinearGradient>
  );
};

export default InvoiceItem;
