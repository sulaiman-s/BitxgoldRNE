import * as React from "react";
import { Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "hooks";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
} from "@ui-kitten/components";
import { Container, Content, Text, VStack, HStack } from "components";
import Images from "assets/images";
import { navigate } from "navigation/RootNavigation";
import ListItem from "components/list";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBalance,
  fetchBxgHistory,
  fetchUserData,
} from "reduxKit/reducers/slices";
import { unwrapResult } from "@reduxjs/toolkit";
import Loader from "components/Loader";
import { Ionicons } from "@expo/vector-icons";
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
  const dispatch = useDispatch();
  //@ts-ignore
  const bxgHistory = useSelector((state) => state.bxg_history);
  //@ts-ignore
  const { bxg, bnb, usdt } = useSelector((state) => state.wallet);
  //@ts-ignore
  const { id } = useSelector((state) => state.user);
  //@ts-ignore
  const [loader, setloader] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

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
  const DATA = [
    { id: 0, icon: "bxg", name: "BXG", balance: bxg, color: "#0084F4" },
    { id: 1, icon: "usdt", name: "USDT", balance: usdt, color: "#00C48C" },
    { id: 2, icon: "bnb", name: "BNB", balance: bnb, color: "#FFA26B" },
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
        <Text category="s2">{title}</Text>
      </VStack>
    );
  };

  const fetchData = () => {
    setloader(true);
    //@ts-ignore
    dispatch(fetchUserData(id))
      .then(unwrapResult)
      .then((payload: any) => {})
      //@ts-ignore
      .catch((error) => {
        setloader(false);
        console.log(error);
      });
    //@ts-ignore
    dispatch(fetchBalance(id))
      .then(unwrapResult)
      //@ts-ignore
      .catch((error) => {
        setloader(false);
        console.log(error);
      });
    //@ts-ignore
    dispatch(fetchBxgHistory(id))
      .then(unwrapResult)
      //@ts-ignore
      .then((payload: any) => {
        setloader(false);
      })
      .catch((error: any) => {
        setloader(false);
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={() => (
          <TouchableOpacity
            style={{ width: 40 }}
            onPress={() => setRefresh(!refresh)}
          >
            <Ionicons name="reload-circle" size={30} />
          </TouchableOpacity>
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
        style={{
          fontFamily: "AlbertSans-Bold",
          fontSize: 19,
        }}
        marginLeft={16}
      >
        Home
      </Text>
      <Content>
        <Content style={styles.contentCategories} horizontal>
          {DATA.map(({ color, icon, name, balance, id }, i) => {
            return (
              <VStack
                key={id}
                padding={20}
                border={8}
                style={{
                  backgroundColor: color,
                  width: 138 * (width / 375),
                  height: 152 * (height / 812),
                }}
                mr={4}
                justify="flex-start"
              >
                <Image
                  //@ts-ignore
                  source={Images.crypto[icon]}
                  style={[
                    //@ts-ignore
                    styles.icon,
                    {
                      tintColor: icon == "usdt" ? "white" : undefined,
                    },
                  ]}
                />
                <Text
                  category="callout"
                  status="white"
                  numberOfLines={1}
                  marginTop={16}
                >
                  {name}
                </Text>
                <Text category="callout" status="white" numberOfLines={1}>
                  {balance}
                </Text>
              </VStack>
            );
          })}
        </Content>
        <HStack mh={16} mt={24}>
          <IButton
            title={"Buy/Sell"}
            icon={"plus"}
            level="7"
            onPress={() => navigate("DepositTrhoughPlatform")}
          />
          <IButton
            title={"Deposit/Withdraw"}
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
        <HStack mh={16} mt={32} mb={16}>
          <Text
            category="subhead"
            // status="primary"
            style={{ fontFamily: "AlbertSans-Bold" }}
          >
            Recent Transactions
          </Text>
          <Text
            style={{ fontFamily: "AlbertSans-Bold" }}
            onPress={() => navigate("History")}
          >
            <Ionicons name="arrow-forward" size={20} color="#3366FF" />
          </Text>
        </HStack>
        <Content contentContainerStyle={styles.contentWallet}>
          {loader ? (
            <ActivityIndicator
              size={"large"}
              style={{ alignSelf: "center" }}
              color={"#00FFFF"}
            />
          ) : bxgHistory.length > 0 ? (
            bxgHistory.slice(0, 5).map(
              //@ts-ignore
              (item, i) => {
                return (
                  <ListItem
                    id={i}
                    bxg={item.bxg}
                    usdt={item.bxg}
                    type={item.type}
                    status={item.status}
                    time={item.createdAt}
                  />
                );
              }
            )
          ) : (
            <Text style={{ alignSelf: "center" }} status="primary">
              No BXG History Found.
            </Text>
          )}
        </Content>
        <Loader visible={loader} />
      </Content>
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
    alignSelf: "center",
    width: 24,
    height: 24,
    // tintColor: "text-white-color",
    // marginLeft: 16,
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
  contentCategories: {
    paddingTop: 12,
    paddingLeft: 24,
    paddingBottom: 12,
  },
});
