import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  Clipboard,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { GlobalAppColor, GlobalStyle } from "../../../../CONST";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { DetailItem } from "./DetailedItem";
import { HomeStyle } from "../../style";
import { FlashList } from "@shopify/flash-list";
import { RenderInvoiceItem } from "./RenderInvoiceItem";
import BottomSheet from "../../../../components/BottomSheetComponent";
import { useBottomSheetContext } from "../../../../contexts/BottomSheetContext";
import { SystemTypeBottomSheetChild } from "./SystemTypeBottomSheetChild";
import { AdminBottomSheetChild } from "./AdminBottomSheetChild";
import { useEffect, useState } from "react";
import { DateModal } from "../../../../components/DateModal";
import {
  generateSPANMaintenanceUserPassword,
  generateSPANUserPassword,
} from "../../../../dailyPassowrd";
import SendIntentAndroid from "react-native-send-intent";
import { date } from "yup";
import { btoa, atob } from "react-native-quick-base64";
import {
  convertDateFormat,
  getData,
  getGreetingMessage,
  getUserData,
  getUserToken,
} from "../../../../utils";
import { MachineRecord } from "../../../../type";
import { useNavigation } from "@react-navigation/native";
import { RouteNames } from "../../../../navigation/routesNames";
import { RefreshControl } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export const HomeView = () => {
  const {
    refRBSheet,
    selectAdminBSheetRef,
    openSelectAdminBottomSheetFun,
    closeQRScanBottomSheetFun,
  } = useBottomSheetContext();
  const [name, setName] = useState("");

  const [note, setNote] = useState("");
  const { navigate } = useNavigation();
  const greetingsWithName = `${getGreetingMessage()}, ${name}!`;
  const [invoiceData, setInvoiceData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [todayLogin, setTodayLogin] = useState("");
  const [tomorrowLogin, setTomorrowLogin] = useState("");
  const [todayExit, setTodayExit] = useState("");
  const [tomorrowExit, setTomorrowExit] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   getProductList();
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // };
  const onRefresh = async () => {
    setRefreshing(true);
    await getProductList();
    setRefreshing(false);
  };
  const onPress = () => {
    closeQRScanBottomSheetFun();
    setTimeout(openSelectAdminBottomSheetFun, 1000);

  };

  useEffect(() => {
    const updatePasswords = () => {
      const d = date.getDate();
      const m = date.getMonth();
      const y = date.getFullYear();
      const nextDate = new Date(date);
      nextDate.setDate(d + 1);
      const nextD = nextDate.getDate();
      const nextM = nextDate.getMonth();
      const nextY = nextDate.getFullYear();

      setTodayLogin(generateSPANUserPassword(d, m, y));
      setTomorrowLogin(generateSPANUserPassword(nextD, nextM, nextY));
      setTodayExit(generateSPANMaintenanceUserPassword(d, m, y));
      setTomorrowExit(generateSPANMaintenanceUserPassword(nextD, nextM, nextY));
    };

    updatePasswords();
  }, [date]);

  function getNextDay(date: Date) {
    // Step 1: Create a Date object from the given date
    let givenDate = new Date(date);

    // Step 2: Add one day to the date
    givenDate.setDate(givenDate.getDate() + 1);

    // Step 3: Format the new date using toLocaleDateString
    return new Date(givenDate);
  }

  const sharePass = () => {
    //console.log("share my password");
    const message =
      `*SPAN - Daily Password*\n\n` +
      `*Today :* ` +
      new Date(date)?.toLocaleDateString() +
      `\n` +
      `*User Name :* ` +
      name +
      `\n` +
      `*Login Password :* ` +
      todayLogin +
      `\n` +
      `*Exit Password :* ` +
      todayExit +
      `\n\n` +
      `*Tomorrow :* ` +
      getNextDay(date)?.toLocaleDateString() +
      `\n` +
      `*User Name :* ` +
      name +
      `\n` +
      `*Login Password :* ` +
      tomorrowLogin +
      `\n` +
      `*Exit Password :* ` +
      tomorrowExit +
      ``;

    let url = "whatsapp://send?text=" + message;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp Opened");
      })
      .catch(() => {
        alert("Make sure Whatsapp installed on your device");
      });
  };

  const copyPass = () => {
    //console.log("share my password");
    const message =
      `*SPAN - Daily Password*\n\n` +
      `*Today :* ` +
      new Date(date)?.toLocaleDateString() +
      `\n` +
      `*User Name :* ` +
      name +
      `\n` +
      `*Login Password :* ` +
      todayLogin +
      `\n` +
      `*Exit Password :* ` +
      todayExit +
      `\n\n` +
      `*Tomorrow :* ` +
      getNextDay(date)?.toLocaleDateString() +
      `\n` +
      `*User Name :* ` +
      name +
      `\n` +
      `*Login Password :* ` +
      tomorrowLogin +
      `\n` +
      `*Exit Password :* ` +
      tomorrowExit +
      ``;

    Clipboard.setString(message);
    ToastAndroid.showWithGravity(
      "Password details have been copied!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
    // Alert.alert("Copied to Clipboard", "Password details have been copied!");
  };

  const getProductList = async () => {
    setLoading(true);
    setInvoiceData([]);
    try {
      const token = await getUserToken();
      const userData = await getUserData();
      const dObject = {
        authorization: token,
        input: {
          id: userData?.id,
          type: userData?.data.user_type,
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

      // console.log("my data --------", result.data.latest_products);
      setName(result.data.data.username);

      setNote(result.data.message);

      const invoiceData = result.data?.latest_products?.map(
        (product: MachineRecord) => {
          const inid = product.invoice_number.split(" ");
          const invoice = inid[0];
          return {
            key: product.id,
            colors:
              product.status != "0"
                ? ["rgba(0, 128, 0, 0.3)", "rgba(255, 255, 255, 0.3)"]
                : ["rgba(10, 80, 156, 0.3)", "rgba(255, 255, 255, 0.3)"],
            borderColor: "#BEC3CC",
            statusColor:
              product.status == 1
                ? GlobalAppColor.GREEN
                : GlobalAppColor.APPRED,
            companyName: product.company_name,
            location: `(${product.location})`,
            status: product.status == 1 ? "Approved" : "Pending",
            invoiceNo: invoice,
            date: convertDateFormat(product.created_on),
            id: product.id,
            page:"home"
          };
        }
      );

      if (invoiceData) {
        setInvoiceData(invoiceData);
      }
      console.log(invoiceData)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    getProductList();
  }, []));

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={GlobalAppColor.AppBlue} size={"large"} />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={HomeStyle.scrollViewStyle}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={HomeStyle.greetingsParent}>
          <Text
            style={[GlobalStyle.TextStyle500_25_16]}
            onPress={() => {
              refRBSheet?.current?.open();
            }}
          >
            {greetingsWithName}
          </Text>
          {note && (
            <Text
              style={[
                GlobalStyle.TextStyle500_25_16,
                {
                  color: GlobalAppColor.AppGrey,
                },
              ]}
            >
              {note}
            </Text>
          )}
        </View>

        <View style={HomeStyle.dailyPasswordParent}>
          <View style={HomeStyle.dailyPasswordHeader}>
            <MaterialCommunityIcons
              name="calendar-edit"
              size={24}
              color="black"
              style={{ opacity: 0.2 }}
              onPress={() => setShow(true)}
            />
            <Text
              style={[
                GlobalStyle.TextStyle700_20_25,
                { color: GlobalAppColor.AppBlue },
              ]}
            >
              Daily Password
            </Text>

            <MaterialIcons
              name="share"
              size={24}
              color="black"
              style={{ opacity: 0.2 }}
              onPress={() => sharePass()}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#000000",
              opacity: 0.1,
              marginTop: 14,
            }}
          ></View>
          <View style={{ marginTop: 15 }}>
            <DetailItem
              label={"Today"}
              value={new Date(date)?.toLocaleDateString()}
            />
            <DetailItem label={"User Name"} value={name} />
            <DetailItem label={"Login Password"} value={todayLogin} />
            <DetailItem label={"Exit Password"} value={todayExit} />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#000000",
              opacity: 0.1,
              marginTop: 14,
            }}
          ></View>
          <View style={{ marginTop: 15 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ flex: 10 }}>
                <DetailItem
                  label={"Tomorrow"}
                  value={getNextDay(date)?.toLocaleDateString()}
                />
                <DetailItem label={"User Name"} value={name} />
                <DetailItem label={"Login Password"} value={tomorrowLogin} />
                <DetailItem label={"Exit Password"} value={tomorrowExit} />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="content-copy"
                  size={24}
                  color="black"
                  style={{
                    opacity: 0.2,
                  }}
                  onPress={() => copyPass()}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={HomeStyle.InVoiceItemParent}>
          <FlashList
            data={invoiceData}
            renderItem={RenderInvoiceItem}
            keyExtractor={(item) => item.key}
            ItemSeparatorComponent={SeparatorComponent}
            estimatedItemSize={100}
            ListFooterComponent={() => {
              return (
                invoiceData.length > 3 && (
                  <Text
                    onPress={() => {
                      navigate(RouteNames.License);
                    }}
                    style={[
                      GlobalStyle.TextStyle700_20_25,
                      {
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        textDecorationStyle: "solid",
                        textDecorationLine: "underline",
                        marginTop: 28,
                      },
                    ]}
                  >
                    View More
                  </Text>
                )
              );
            }}
          />
        </View>
      </ScrollView>
      <BottomSheet bottomSheetRef={refRBSheet}>
        <SystemTypeBottomSheetChild onPress={onPress} />
      </BottomSheet>
      <BottomSheet height={511} bottomSheetRef={selectAdminBSheetRef}>
        <AdminBottomSheetChild />
      </BottomSheet>
      {show && (
        <DateModal
          date={date}
          setDate={setDate}
          modalVisible={show}
          setModalVisible={setShow}
        />
      )}
    </>
  );
};
const SeparatorComponent = () => <View style={{ height: 20 }} />;

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  systemOptionContainer: {
    paddingVertical: 13,
    paddingHorizontal: 19,
    backgroundColor: "#EDF4FF",
    borderWidth: 1,
    borderColor: "#BEC3CC",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionPart1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    columnGap: 15,
  },
  selectionCircle: {
    width: 24,
    height: 24,
    backgroundColor: "#D2D2D2",
    borderRadius: 100,
  },
});
