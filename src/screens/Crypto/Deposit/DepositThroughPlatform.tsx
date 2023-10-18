import * as React from "react";
import { Image, ImageRequireSource } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout } from "hooks";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Input,
  Button,
  ViewPager,
  Spinner,
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

import TabBarProfile from "../../../components/TabBarProfile";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  fetchBalance,
  fetchBxgHistory,
  fetchGoldRatio,
} from "reduxKit/reducers/slices";
import axiosInstance from "utils/axiosInstance";
import Loader from "components/Loader";
import SuccessModel from "components/SuccessModel";

interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const DepositTrhoughPlatform = React.memo(() => {
  const theme = useTheme();
  const { goBack, navigate } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const dispatch = useDispatch();
  //@ts-ignore
  const ratio = useSelector((state) => state.gold_ratio.ratio);
  //@ts-ignore
  const { bxg, usdt } = useSelector((state) => state.wallet);
  //@ts-ignore
  const { id } = useSelector((state) => state.user);
  const [bxgInp, setBxgInp] = React.useState("1");
  const [bxgInp1, setBxgInp1] = React.useState("1");

  const [err, setError] = React.useState<any>(null);
  const [floader, setfLoader] = React.useState(false);
  const [buy, setBuy] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const fetchdata = () => {
    setfLoader(true);
    //@ts-ignore
    dispatch(fetchGoldRatio())
      .then(unwrapResult)
      .then((payload: any) => {
        setfLoader(false);
      })
      .catch((error: any) => {
        setfLoader(false);
        console.log(error.message);
      });
  };

  const handleBuy = async () => {
    setBuy(true);
    setLoader(true);
    const usdtinp = Number(bxgInp) * ratio;
    if (Number(bxgInp) <= 0) {
      setLoader(false);
      setError("Please enter a valid amount.");
    } else {
      const requestBody = {
        user_id: id,
        bxg: Number(bxgInp),
        usdt: usdtinp.toFixed(2),
      };
      //@ts-ignore
      await axiosInstance
        .post("/api/bxg/buy", requestBody)
        .then((res) => {
          if (res.data === "Purchasing Successfull.") {
            setLoader(false);
            //@ts-ignore
            dispatch(fetchBalance(id));
            //@ts-ignore
            dispatch(fetchBxgHistory(id));
            setShowSuccess(true);
          } else {
            setLoader(false);
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          setError(err.response.data.message);
        });
    }
  };

  const handleSell = async () => {
    setBuy(false);
    setLoader(true);
    const usdtinp = Number(bxgInp1) * ratio;
    if (Number(bxgInp1) <= 0) {
      setLoader(false);
      setError("Please enter a valid amount.");
    } else if (Number(bxgInp1) > bxg) {
      setLoader(false);
      setError("Insufficient BXG.");
    } else {
      const requestBody = {
        user_id: id,
        bxg: Number(bxgInp1),
        usdt: usdtinp.toFixed(2),
      };
      //@ts-ignore
      await axiosInstance
        .post("/api/bxg/sell", requestBody)
        .then((res) => {
          if (res.data === "Sold Successfuly.") {
            setLoader(false);
            //@ts-ignore
            dispatch(fetchBalance(id));
            //@ts-ignore
            dispatch(fetchBxgHistory(id));
            setShowSuccess(true);
          } else {
            setLoader(false);
            setError(res.data.message);
          }
        })
        .catch((err) => {
          setLoader(false);
          setError(err.response.data.message);
        });
    }
  };

  React.useEffect(() => {
    fetchdata();
  }, []);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Buy | Sell</Text>}
        accessoryLeft={() => <NavigationAction status="primary" />}
      />
      <Content>
        <TabBarProfile
          tabs={["Buy", "Sell"]}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          style={styles.tabBar}
        />
        <Content contentContainerStyle={styles.content}>
          <ViewPager selectedIndex={activeIndex} onSelect={setActiveIndex}>
            <VStack border={12} level="1" margin={12} mt={50}>
              <VStack mh={24} mt={16}>
                <HStack mb={8}>
                  <Text category="callout">Recieve</Text>
                </HStack>
                <Input
                  style={styles.input}
                  accessoryRight={() => (
                    <HStack itemsCenter>
                      <Image
                        source={Images.crypto.bxg}
                        //@ts-ignore
                        style={styles.logo}
                      />
                      <Text
                        // style={{ fontFamily: "AlbertSans-Regular" }}
                        marginHorizontal={8}
                        category="callout"
                      >
                        {"BXG"}
                      </Text>
                      {/* <Icon pack="assets" name="caret_down" style={styles.caret} /> */}
                    </HStack>
                  )}
                  onChangeText={(t) => {
                    setError(null);
                    setBxgInp(t);
                  }}
                  value={bxgInp}
                  keyboardType="numeric"
                />
                <Text category="c1" status="platinum" marginTop={8}>
                  {`Balance: ${bxg} BXG`}
                </Text>
              </VStack>
              <VStack mh={24} mv={10} mb={30}>
                <HStack mb={8}>
                  <Text category="callout" status="platinum">
                    Spend
                  </Text>
                </HStack>
                <Input
                  style={styles.input}
                  accessoryRight={() => (
                    <HStack itemsCenter>
                      <Image
                        source={Images.crypto.usdt}
                        //@ts-ignore
                        style={styles.logo}
                      />
                      <Text marginHorizontal={8} category="callout">
                        {"USDT"}
                      </Text>
                      {/* <Icon pack="assets" name="caret_down" style={styles.caret} /> */}
                    </HStack>
                  )}
                  accessoryLeft={
                    floader
                      ? () => (
                          <VStack itemsCenter style={{ width: 16, height: 16 }}>
                            <Spinner size="small" status="info" />
                          </VStack>
                        )
                      : undefined
                  }
                  //@ts-ignore
                  value={(Number(bxgInp) * ratio).toFixed(2).toString()}
                  disabled
                />
                <Text category="c1" status="platinum" marginTop={8}>
                  {`Balance: ${usdt} USDT`}
                </Text>
              </VStack>
            </VStack>

            <VStack border={12} level="1" margin={12} mt={50}>
              <VStack mh={24} mt={16}>
                <HStack mb={8}>
                  <Text category="callout">Sell</Text>
                </HStack>
                <Input
                  style={styles.input}
                  accessoryRight={() => (
                    <HStack itemsCenter>
                      <Image
                        source={Images.crypto.bxg}
                        //@ts-ignore
                        style={styles.logo}
                      />
                      <Text
                        // style={{ fontFamily: "AlbertSans-Regular" }}
                        marginHorizontal={8}
                        category="s2"
                      >
                        {"BXG"}
                      </Text>
                      {/* <Icon pack="assets" name="caret_down" style={styles.caret} /> */}
                    </HStack>
                  )}
                  onChangeText={(t) => {
                    setError(null);
                    setBxgInp1(t);
                  }}
                  value={bxgInp1}
                  keyboardType="numeric"
                />
                <Text category="c1" status="platinum" marginTop={8}>
                  {`Balance: ${bxg} BXG`}
                </Text>
              </VStack>
              <VStack mh={24} mv={10}>
                <HStack mb={8}>
                  <Text category="callout">Recieve</Text>
                </HStack>
                <Input
                  style={styles.input}
                  accessoryRight={() => (
                    <HStack itemsCenter>
                      <Image
                        source={Images.crypto.usdt}
                        //@ts-ignore
                        style={styles.logo}
                      />
                      <Text marginHorizontal={8} category="s2">
                        {"USDT"}
                      </Text>
                      {/* <Icon pack="assets" name="caret_down" style={styles.caret} /> */}
                    </HStack>
                  )}
                  accessoryLeft={
                    floader
                      ? () => (
                          <VStack itemsCenter style={{ width: 16, height: 16 }}>
                            <Spinner size="small" status="info" />
                          </VStack>
                        )
                      : undefined
                  }
                  disabled
                  value={(Number(bxgInp1) * ratio).toFixed(2).toString()}
                />
                <Text
                  category="c1"
                  status="platinum"
                  marginTop={8}
                  marginBottom={20}
                >
                  {`Balance: ${usdt} USDT`}
                </Text>
              </VStack>
            </VStack>
          </ViewPager>
        </Content>
        {err ? (
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              marginHorizontal: 15,
              color: "red",
            }}
          >
            {err}
          </Text>
        ) : null}
        <Button
          children={activeIndex === 0 ? "Buy Now" : "Sell Now"}
          style={styles.button}
          onPress={activeIndex === 0 ? handleBuy : handleSell}
        />
        <Loader visible={loader} />
        <SuccessModel
          modalVisible={showSuccess}
          name={"Buy"}
          msg={
            buy
              ? "Successfully bought " +
                parseFloat(bxgInp) +
                "BXG with " +
                (parseFloat(bxgInp) * parseFloat(ratio)).toFixed(2) +
                "USDT"
              : "Request Processed successfully to sell " +
                parseFloat(bxgInp1) +
                "BXG for " +
                (parseFloat(bxgInp1) * parseFloat(ratio)).toFixed(2) +
                "USDT"
          }
          isName={true}
          // isbank={true}
          isSubmit={true}
          onPress={() => {
            setShowSuccess(!showSuccess);
            goBack();
          }}
        />
      </Content>
    </Container>
  );
});

export default DepositTrhoughPlatform;

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
    bottom: 0,
  },
  content: {
    paddingBottom: 40,
  },
  tabBar: {
    borderRadius: 12,
  },
});
