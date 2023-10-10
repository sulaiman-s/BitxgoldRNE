import * as React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "hooks";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
  Button,
} from "@ui-kitten/components";
import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
  IDivider,
} from "components";
import Images from "assets/images";
import Tab from "../Crypto01/Tab";
import { navigate } from "navigation/RootNavigation";
import Wallet from "./Wallet";
import ListItem from "components/list";
import BottomTab from "components/BottomTab";

interface IButtonProps {
  onPress?(): void;
  title: string;
  icon: string;
  level: string;
}

const Crypto03 = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [showAll, setShowAll] = React.useState(true);

  const dataWallet = [
    {
      id: "0",
      name: "Available Bxg",
      icon: "life",
      color: "#215191",
      // total_transactions: 795.2,
      amount: "56.23 BXG",
      type: "sell",
      status: "accepted",
    },
    {
      id: "1",
      name: "Staked Bxg",
      icon: "entertainment",
      color: "#4B9BAE",
      // total_transactions: 177.6,
      amount: "32 BXG",
      type: "sell",
      status: "rejected",
    },
    {
      id: "2",
      name: "Referral Bonus",
      icon: "shopping",
      color: "#949398",
      // total_transactions: 511.2,
      amount: "11 USDT",
      type: "buy",
      status: "accepted",
    },
    {
      id: "6",
      name: "Available Bnb",
      icon: "education",
      color: "#FE9870",
      // total_transactions: 170.4,
      amount: "0.4367 BNB",
      type: "sell",
      status: "declined",
    },
  ];

  const IButton = ({ onPress, title, icon, level }: IButtonProps) => {
    return (
      <VStack itemsCenter onPress={onPress} minWidth={104 * (width / 375)}>
        <VStack>
          <Icon pack="assets" name={icon} style={styles.iconButton} />
          <Image
            source={Images.shape}
            style={{
              tintColor: theme[`background-basic-color-${level}`],
              zIndex: -10,
            }}
          />
        </VStack>
        <Text>{title}</Text>
      </VStack>
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={() => (
          <NavigationAction status="primary" icon="share" />
        )}
        accessoryLeft={() => (
          <Image
            source={Images.logo}
            //@ts-ignore
            style={styles.logo}
          />
        )}
      />
      <Text
        style={{ fontFamily: "AlbertSans-Bold", fontSize: 19 }}
        marginLeft={16}
      >
        Home
      </Text>
      <Content>
        <VStack level="6" padding={16} mh={20} border={12} mt={16}>
          <HStack itemsCenter mb={12}>
            <Text status="white">Your total value:</Text>
            <HStack itemsCenter>
              <Icon pack="assets" name="eye" style={styles.icon} />
              <Icon pack="assets" name="info" style={styles.icon} />
            </HStack>
          </HStack>
          <Text
            category="h4"
            status="white"
            marginBottom={14}
            //@ts-ignore
            padding={10}
          >
            $100,246.31
            <Text category="h7" status="white">
              {" "}
              +12%
            </Text>
          </Text>
          <HStack justify="flex-start">
            {LIST_COIN.map((item, i) => {
              return (
                <Image
                  source={item}
                  key={i}
                  //@ts-ignore
                  style={styles.coin}
                />
              );
            })}
          </HStack>
        </VStack>
        <HStack mh={16} mt={24}>
          <IButton
            title={"Desposit"}
            icon={"plus"}
            level="7"
            onPress={() => navigate("DepositTrhoughPlatform")}
          />
          <IButton
            title={"Withdraw"}
            icon={"arrow_down"}
            level="8"
            onPress={() => navigate("SellBxg")}
          />
          <IButton
            title={"Tranfer"}
            icon={"arrow_upright"}
            level="5"
            onPress={() => navigate("Transfer")}
          />
        </HStack>
        <Text
          style={{ fontFamily: "AlbertSans-Bold" }}
          marginLeft={16}
          marginTop={32}
          marginBottom={16}
        >
          Buy & Sell History
        </Text>
        <Content contentContainerStyle={styles.contentWallet}>
          {dataWallet.map((wallet, i) => {
            return <ListItem type={wallet.type} status={wallet.status} />;
          })}
        </Content>
      </Content>
      <BottomTab />
    </Container>
  );
});

export default Crypto03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  inputSlipage: {
    flex: 1,
    marginLeft: 24,
    padding: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 32,
    marginLeft: 10,
  },
  caretDown: {
    tintColor: "background-basic-color-5",
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: "text-white-color",
    marginLeft: 16,
  },
  coin: {
    width: 16,
    height: 16,
    marginRight: 12,
  },
  iconButton: {
    width: 20,
    height: 20,
    position: "absolute",
    zIndex: 10,
    top: 22,
    left: 22,
    tintColor: "text-white-color",
  },
  contentWallet: {
    paddingHorizontal: 24,
  },
});
const LIST_COIN = [Images.crypto.bxg, Images.crypto.bnb, Images.crypto.usdt];
const TAB = [
  {
    id: "4",
    image: Images.crypto.bnb,
    name: "Binance",
    describe: "BNB",
    price: 14.44,
    change: 8.06,
  },
  {
    id: "1",
    image: Images.crypto.bitcoin,
    name: "Bitcoin",
    describe: "BTC",
    price: 14.44,
    change: 8.06,
  },
  {
    id: "2",
    image: Images.crypto.eth,
    name: "Ethereum",
    describe: "ETH",
    price: 14.44,
    change: 8.06,
  },
  {
    id: "4",
    image: Images.crypto.sol,
    name: "Solana",
    describe: "SOL",
    price: 14.44,
    change: 8.06,
  },
];
