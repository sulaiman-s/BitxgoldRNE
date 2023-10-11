import * as React from "react";
import {
  FlatList,
  Image,
  ImageRequireSource,
  ToastAndroid,
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
  const [activeIndex, setActiveIndex] = React.useState(0);

  const showToast = (message: any) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const qrValue = "0x0000000000000000000000";
  const handleCopy = () => {
    Clipboard.setStringAsync(qrValue);
    showToast("Text copied!");
  };

  const { show: showTo, hide: hideTo, modalRef: modalTo } = useModal();
  const { show: showFrom, hide: hideFrom, modalRef: modalFrom } = useModal();

  const [coinFrom, setCoinFrom] = React.useState(DATA[0]);
  const [showAll, setShowAll] = React.useState(true);

  const renderFriendItem = React.useCallback(
    ({ name, amount, level }: FriendProps) => {
      return <FriendItem level={level} name={name} amount={amount} />;
    },
    []
  );

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Wallet</Text>}
        accessoryLeft={() => <NavigationAction status="primary" />}
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
              placeholder="Search author"
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

const dataWallet = [
  {
    id: "0",
    name: "Available Bxg",
    amount: "56.23 BXG",
  },
  {
    id: "1",
    name: "Staked Bxg",
    amount: "32 BXG",
  },
  {
    id: "2",
    name: "Referral Bonus",
    amount: "11 USDT",
  },
  {
    id: "3",
    name: "Available Bnb",
    amount: "0.4367 BNB",
  },
  {
    id: "4",
    name: "Available Usdt",
    amount: "12 USDT",
  },
  {
    id: "5",
    name: "Total Earnings",
    amount: "0.24 BXG",
  },
  {
    id: "6",
    name: "Staking Referral Bonus",
    amount: "0.1 BXG",
  },
];

const DATA: CoinFromProps[] = [
  { id: "1", image: Images.crypto.bitcoin, code: "BTC" },
  { id: "2", image: Images.crypto.eth, code: "ETH" },
  { id: "3", image: Images.crypto.sol, code: "SOL" },
];
