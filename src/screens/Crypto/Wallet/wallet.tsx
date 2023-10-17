import * as React from "react";
import {
  FlatList,
  Image,
  ImageRequireSource,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout, useModal } from "hooks";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Input,
  Icon,
  Button,
  ViewPager,
} from "@ui-kitten/components";

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from "components";
import Images from "assets/images";
import BottomTab from "components/BottomTab";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";
import keyExtractor from "utils/keyExtractor";
import FriendItem, { FriendProps } from "./FriendItem";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "components/Loader";
import { fetchBalance } from "reduxKit/reducers/slices";

interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const Wallet = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [refresh, setRefresh] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();
  const {
    bxg,
    bxg_staked,
    total_earning,
    referal_bonus,
    staking_referral_bonus,
    usdt,
    bnb,
  } =
    //@ts-ignore
    useSelector((state) => state.wallet);
  //@ts-ignore
  const { id } = useSelector((state) => state.user);

  const showToast = (message: any) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const qrValue = "0x0000000000000000000000";
  const handleCopy = () => {
    Clipboard.setStringAsync(qrValue);
    showToast("Text copied!");
  };

  const dataWallet = [
    {
      id: "0",
      name: "Available Bxg",
      amount: `${bxg ? bxg : 0.0} BXG`,
    },
    {
      id: "1",
      name: "Staked Bxg",
      amount: `${bxg_staked ? bxg_staked : 0.0} BXG`,
    },
    {
      id: "2",
      name: "Referral Bonus",
      amount: `${referal_bonus ? referal_bonus : 0.0} USDT`,
    },
    {
      id: "3",
      name: "Available Bnb",
      amount: `${bnb ? bnb : 0.0} BNB`,
    },
    {
      id: "4",
      name: "Available Usdt",
      amount: `${usdt ? usdt : 0.0} USDT`,
    },
    {
      id: "5",
      name: "Total Earnings",
      amount: `${total_earning ? total_earning : 0.0} BXG`,
    },
    {
      id: "6",
      name: "Staking Referral Bonus",
      amount: `${staking_referral_bonus ? staking_referral_bonus : 0.0} BXG`,
    },
  ];

  const renderFriendItem = React.useCallback(
    ({ name, amount, level }: FriendProps) => {
      return <FriendItem level={level} name={name} amount={amount} />;
    },
    []
  );

  React.useEffect(() => {
    setLoader(true);
    //@ts-ignore
    dispatch(fetchBalance(id))
      .then(unwrapResult)
      .then((payload: any) => {
        setLoader(false);
      })
      .catch((error: any) => {
        setLoader(false);
        console.log(error);
      });
  }, [refresh]);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Wallet</Text>}
        accessoryLeft={() => <NavigationAction status="primary" />}
        accessoryRight={() => (
          <TouchableOpacity
            style={{ width: 50 }}
            onPress={() => setRefresh(!refresh)}
          >
            <Ionicons name="reload-circle" size={30} />
          </TouchableOpacity>
        )}
      />
      {/* <Content> */}
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingRight: 18,
            }}
          >
            <Input
              accessoryLeft={(props) => (
                <Icon
                  {...props}
                  pack="assets"
                  name="search16"
                  style={styles.icon}
                />
              )}
              placeholder="Search"
              style={styles.input}
              size="small"
            />
          </View>
        )}
        contentContainerStyle={[
          styles.flatListFriend,
          { paddingBottom: bottom + 60 },
        ]}
        scrollEventThrottle={16}
        data={dataWallet}
        keyExtractor={keyExtractor}
        //@ts-ignore
        renderItem={({ item }) => (
          <FriendItem level={"1"} name={item.name} amount={item.amount} />
        )}
        numColumns={2}
      />
      {/* </Content> */}
      <Loader visible={loader} />
    </Container>
  );
});

export default Wallet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  caret: {
    width: 12,
    height: 12,
    tintColor: "text-basic-color",
  },
  logo: {
    width: 16,
    height: 16,
  },
  input: {
    backgroundColor: "background-basic-color-1",
    marginBottom: 16,
    alignSelf: "center",
    borderRadius: 15,
    marginHorizontal: 15,
  },
  buttonSwap: {
    width: 48,
    height: 48,
    alignSelf: "center",
    marginVertical: 4,
  },
  info: {
    width: 16,
    height: 16,
    tintColor: "text-platinum-color",
    marginLeft: 4,
  },
  inputSlipage: {
    flex: 1,
    marginLeft: 24,
    padding: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  caretDown: {
    tintColor: "background-basic-color-5",
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  button: {
    marginHorizontal: 24,
    marginTop: 18,
    marginBottom: 18,
  },
  tabBar: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    paddingBottom: 40,
  },
  icon: {
    marginLeft: 12,
  },
  flatListFriend: {
    paddingLeft: 16,
  },
});

const DATA: CoinFromProps[] = [
  { id: "1", image: Images.crypto.bitcoin, code: "BTC" },
  { id: "2", image: Images.crypto.eth, code: "ETH" },
  { id: "3", image: Images.crypto.sol, code: "SOL" },
];
