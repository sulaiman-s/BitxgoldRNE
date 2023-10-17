import * as React from "react";
import {
  ActivityIndicator,
  Image,
  ImageRequireSource,
  TouchableOpacity,
} from "react-native";
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
} from "@ui-kitten/components";

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
  IDivider,
} from "components";
import Images from "assets/images";
import TabBarProfile from "../../../components/TabBarProfile";
import CardSteak from "./CardSteak";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "utils/axiosInstance";
import { useState } from "react";
import {
  fetchBalance,
  fetchBxgHistory,
  fetchStakePageData,
} from "reduxKit/reducers/slices";
import { unwrapResult } from "@reduxjs/toolkit";
import { getType, timer } from "utils/arrayFilter";
import SuccessModel from "components/SuccessModel";
import Loader from "components/Loader";
import { Ionicons } from "@expo/vector-icons";
interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const Profile05 = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const { stakedData, amountclaimed, amountstaked, amountAlreadyStaked } =
    //@ts-ignore
    useSelector((state) => state.stake_page);
  //@ts-ignore
  const { bxg } = useSelector((state) => state.wallet);
  //@ts-ignore
  const { id } = useSelector((state) => state.user);
  //@ts-ignore
  const [erro, setError] = React.useState<any>(null);
  const [floader, setfLoader] = React.useState(false);
  const [stake, setstake] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  const handleStake = async () => {
    setstake(true);
    setLoader(true);
    if (stakeAmount <= 0) {
      setLoader(false);
      setError("Please enter valid amount to stake.");
    } else if (stakeAmount > bxg) {
      setLoader(false);
      setError("Insufficient BXG.");
    } else {
      try {
        const requestBody = {
          user_id: id,
          bxg: stakeAmount,
        };
        //@ts-ignore
        await axiosInstance
          .post("/api/stake/", requestBody)
          .then((res) => {
            if (res.data === "Staked Successfully.") {
              setLoader(false);
              //@ts-ignore
              dispatch(fetchBalance(id));
              //@ts-ignore
              dispatch(fetchStakePageData(id));
              setShowSuccess(true);
            } else {
              setLoader(false);
              setError("Transaction Failed");
              console.log(res.data);
            }
          })
          .catch((error) => {
            setLoader(false);
            setError(error.response.data.message);
          });
      } catch (error: any) {
        setLoader(false);
        //console.log(error, "Transaction Failed");
        setError(error.message);
      }
    }
  };

  const handleClaim = async (field_id: any) => {
    setstake(false);
    setLoader(true);
    let requestBody = {
      user_id: id,
      type: "claim",
    };
    console.log(requestBody);
    try {
      //@ts-ignore
      await axiosInstance
        .put("/api/stake/" + field_id, requestBody)
        .then((res) => {
          if (res.data === "claimed ") {
            setLoader(false);
            //@ts-ignore
            dispatch(fetchBalance(id));
            //@ts-ignore
            dispatch(fetchStakePageData(id));
            setShowSuccess(true);
          }
        })
        .catch((err) => {
          setLoader(false);
          //@ts-ignore
          alert(err.response.data.message);
          console.log(err.response.data.message);
        });

      //console.log(data, "data");
    } catch (error) {
      setLoader(false);
      //@ts-ignore
      alert(error.message);
    }
  };

  React.useEffect(() => {
    setfLoader(true);
    //@ts-ignore
    dispatch(fetchStakePageData(id))
      .then(unwrapResult)
      .then((payload: any) => {
        setfLoader(false);
      })
      .catch((error: any) => setfLoader(false));
    return () => setError("");
  }, [refresh]);
  function getDate(stake_time: any): any {
    throw new Error("Function not implemented.");
  }

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Stake</Text>}
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
      <Content>
        <CardSteak
          totalAmountStacked={amountstaked}
          totalAmountClaimed={amountclaimed}
        />
        <TabBarProfile
          tabs={["STAKE", "CLAIM"]}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          style={styles.tabBar}
        />
        <Content contentContainerStyle={styles.content}>
          <ViewPager selectedIndex={activeIndex} onSelect={setActiveIndex}>
            <VStack border={12} level="1" mt={50}>
              <VStack mh={12} mv={10} mb={30}>
                <HStack mb={8}>
                  <Text category="callout" status="platinum">
                    Amount
                  </Text>
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
                      <Text marginHorizontal={8} category="callout">
                        {"BXG"}
                      </Text>
                      {/* <Icon pack="assets" name="caret_down" style={styles.caret} /> */}
                    </HStack>
                  )}
                  onChangeText={(t) => {
                    setError(null);
                    setStakeAmount(Number(t));
                  }}
                  keyboardType="numeric"
                />
                <Text category="c1" status="platinum" marginTop={8}>
                  {`Balance: ${bxg} BXG`}
                </Text>
                {erro ? (
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                      marginHorizontal: 15,
                      color: "red",
                    }}
                  >
                    {erro}
                  </Text>
                ) : undefined}
              </VStack>
              <Button
                children={"Stake"}
                style={styles.button}
                onPress={handleStake}
              />
            </VStack>

            <VStack level="2">
              {floader ? (
                <ActivityIndicator
                  size={"large"}
                  style={{ alignSelf: "center" }}
                  color={"#00FFFF"}
                />
              ) : stakedData.length > 0 ? (
                stakedData.map(
                  //@ts-ignore
                  (item, index) => (
                    <VStack
                      key={index}
                      mv={12}
                      border={12}
                      padding={24}
                      level="1"
                    >
                      <HStack itemsCenter mb={8}>
                        <Text category="subhead">Staked BXG</Text>
                        <Text category="subhead" status="info">
                          {item.bxg}
                        </Text>
                      </HStack>
                      <HStack itemsCenter mb={8}>
                        <Text category="subhead">Staked Time</Text>
                        <Text category="subhead" status="warning">
                          {timer(item.stake_time)}
                        </Text>
                      </HStack>
                      <HStack itemsCenter mb={8}>
                        <Text category="subhead">Staked Date </Text>
                        <Text category="subhead" status="success">
                          {new Date(item.stake_time).toLocaleString()}
                        </Text>
                      </HStack>
                      <Button
                        children={() => (
                          <Text category="c1" style={{ color: "white" }}>
                            Claim
                          </Text>
                        )}
                        style={{ marginHorizontal: 90 }}
                        size="small"
                        onPress={
                          getType(item.stake_time) === "Claim"
                            ? () => handleClaim(item.id)
                            : () => console.log("disabled")
                        }
                        status={
                          getType(item.stake_time) === "Claim"
                            ? "success"
                            : "control"
                        }
                        disabled={
                          getType(item.stake_time) === "Claim" ? false : true
                        }
                      />
                    </VStack>
                  )
                )
              ) : (
                <Text
                  category="s1"
                  status="info"
                  style={{ alignSelf: "center" }}
                >
                  No Staked Found.
                </Text>
              )}
            </VStack>
          </ViewPager>
        </Content>
        <Loader visible={loader} />
        <SuccessModel
          modalVisible={showSuccess}
          name={"Stake"}
          msg={
            stake
              ? `Successfully stake ${stakeAmount} BXG`
              : `Reward Claimed Successfully.`
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

export default Profile05;

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
    marginBottom: 18,
  },
  // tabBar: {
  //   marginHorizontal: 24,
  //   marginTop: 16,
  //   marginBottom: 8,
  // },
  content: {
    paddingBottom: 40,
    marginHorizontal: 16,
  },
  tabBar: {
    borderRadius: 12,
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
  },
});

const DATA = [
  {
    id: "1",
    volumn: "40x",
    apy: 39.8,
    earn: "BNB + Fees",
    reward: "12BNB",
    timer: "7m 25d 14h",
    date: "18 Feb 2023",
    stake: 34,
  },
  {
    id: "2",
    volumn: "40x",
    apy: 39.8,
    earn: "BNB + Fees",
    reward: "12BNB",
    timer: "7m 25d 14h",
    date: "18 Feb 2023",
    stake: 12,
  },
  {
    id: "3",
    volumn: "40x",
    apy: 39.8,
    earn: "BNB + Fees",
    reward: "12BNB",
    timer: "7m 25d 14h",
    date: "18 Feb 2023",
    stake: 12,
  },
];
