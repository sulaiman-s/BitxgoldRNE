import * as React from "react";
import { ActivityIndicator, TouchableOpacity, View, Button } from "react-native";
import { useLayout } from "hooks";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  ViewPager,
} from "@ui-kitten/components";

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from "components";
import TabBar from "./TabBar";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Ionicons } from "@expo/vector-icons";
import {
  fetchStakePageData,
  fetchBxgHistory,
  fetchWithdrawHistory,
} from "reduxKit/reducers/slices";
import ListItem from "components/list";
import { timer } from "utils/arrayFilter";

const TransactionHistory = React.memo(() => {
  const theme = useTheme();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  const [loader, setloader] = React.useState(false);
  const [floader, setfLoader] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [displayCount, setDisplayCount] = React.useState(3);


  //@ts-ignore
  const bxg_history = useSelector((state) => state.bxg_history);
  //@ts-ignore
  const withdraw_history = useSelector((state) => state.withdraw_history);
  //@ts-ignore
  const stake_page = useSelector((state) => state.stake_page);
  //@ts-ignore
  const user = useSelector((state) => state.user);


  const filterForTypeBuy = bxg_history?.filter((item: any) => item.type.includes("Buy"))
  const filterForTypeSell = bxg_history?.filter((item: any) => item.type.includes("Sell"))

  const handleShowMore = () => {
    setDisplayCount(displayCount + 3);
  };
  const fetchData = () => {
    setfLoader(true);
    //@ts-ignore
    dispatch(fetchBxgHistory(user?.id))
      .then(unwrapResult)
      //@ts-ignore
      .then((payload: any) => { })
      .catch((error: any) => {
        setfLoader(false);
        console.log(error);
      });
    //@ts-ignore
    dispatch(fetchStakePageData(user?.id))
      .then(unwrapResult)
      .then((payload: any) => { })
      .catch((error: any) => setfLoader(false));

    //@ts-ignore
    dispatch(fetchWithdrawHistory(user?.id))
      .then(unwrapResult)
      .then((payload: any) => {
        setfLoader(false);
      })
      .catch((error: any) => setfLoader(false));
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);

  React.useEffect(() => {
    setDisplayCount(3)
  }, [activeTab]);
  return (
    <Container style={styles.container}>
      <VStack level="2" style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance="control"
          title={() => <Text category="callout">Transaction History</Text>}
          accessoryLeft={() => (
            <NavigationAction status="primary" icon="arrow_left" />
          )}
          accessoryRight={() => (
            <TouchableOpacity
              style={{ width: 50 }}
              onPress={() => setRefresh(!refresh)}
            >
              <Ionicons name="reload-circle" size={30} />
            </TouchableOpacity>
          )}
        />
      </VStack>
      <Content contentContainerStyle={styles.content}>
        <TabBar
          style={styles.tabBar}
          tabs={["Buy", "Sell", "Stake", "Withdraw"]}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          swipeEnabled={true}
        >
          <VStack mh={24}>
            {floader ? (
              <ActivityIndicator
                size={"large"}
                style={{ alignSelf: "center" }}
                color={"#00FFFF"}
              />
            ) : filterForTypeBuy?.length > 0 ? (
              filterForTypeBuy?.slice(0, displayCount)?.map(
                //@ts-ignore
                (item, i) => {
                  return (
                    <ListItem
                      id={i}
                      //@ts-ignore
                      bxg={item.bxg}
                      //@ts-ignore
                      usdt={item.bxg}
                      //@ts-ignore
                      type={item.type}
                      //@ts-ignore
                      status={item.status}
                      //@ts-ignore
                      time={item.createdAt}
                    />
                  );
                }
              )

            ) : (
              <Text style={{ alignSelf: "center" }} status="primary">
                No Buy History Found.
              </Text>
            )}
            {!floader && displayCount < filterForTypeBuy?.length && (
              <Button title="Show More" onPress={handleShowMore} />
            )}
          </VStack>
          <VStack mh={24}>
            {floader ? (
              <ActivityIndicator
                size={"large"}
                style={{ alignSelf: "center" }}
                color={"#00FFFF"}
              />
            ) : filterForTypeSell?.length > 0 ? (
              filterForTypeSell?.slice(0, displayCount)
                .map(
                  //@ts-ignore
                  (item, i) => {

                    return (
                      <ListItem
                        id={i}
                        //@ts-ignore
                        bxg={item.bxg}
                        //@ts-ignore
                        usdt={item.bxg}
                        //@ts-ignore
                        type={item.type}
                        //@ts-ignore
                        status={item.status}
                        //@ts-ignore
                        time={item.createdAt}
                      />
                    );
                  }
                )
            ) : (
              <Text style={{ alignSelf: "center" }} status="primary">
                No Sell History Found.
              </Text>
            )}

            {!floader && displayCount < filterForTypeSell?.length && (
              <Button title="Show More" onPress={handleShowMore} />
            )}
          </VStack>
          <VStack mh={24}>
            {floader ? (
              <ActivityIndicator
                size={"large"}
                style={{ alignSelf: "center" }}
                color={"#00FFFF"}
              />
            ) :

              stake_page?.stakedData?.length > 0 ? (
                stake_page?.stakedData?.slice(0, displayCount)?.map(
                  //@ts-ignore
                  (item, i) => {
                    return (
                      <VStack
                        key={i}
                        border={12}
                        level="2"
                        margin={0}
                        padding={16}
                        mb={12}
                      >
                        <HStack itemsCenter mb={8}>
                          <Text category="c1">Staked BXG</Text>
                          <Text category="c1" status="info">
                            {item.bxg}
                          </Text>
                        </HStack>
                        <HStack itemsCenter mb={8}>
                          <Text category="c1">Staked Time</Text>
                          <Text category="c1" status="warning">
                            {timer(item.stake_time)}
                          </Text>
                        </HStack>
                        <HStack itemsCenter mb={8}>
                          <Text category="c1">Staked Date </Text>
                          <Text category="c1" status="success">
                            {new Date(item.stake_time).toLocaleString()}
                          </Text>
                        </HStack>
                      </VStack>
                    );
                  }
                )
              ) : (
                <Text style={{ alignSelf: "center" }} status="primary">
                  No stake History Found.
                </Text>
              )}

            {!floader && displayCount < stake_page?.stakedData?.length && (
              <Button title="Show More" onPress={handleShowMore} />
            )}
          </VStack>
          <VStack mh={24}>
            {floader ? (
              <ActivityIndicator
                size={"large"}
                style={{ alignSelf: "center" }}
                color={"#00FFFF"}
              />
            ) : withdraw_history?.length > 0 ? (

              withdraw_history?.slice(0, displayCount)?.map(
                //@ts-ignore
                (item, i) => {
                  return (
                    <VStack
                      key={i}
                      border={12}
                      level="2"
                      margin={0}
                      padding={16}
                      mb={12}
                    >
                      <HStack itemsCenter mb={8}>
                        <Text category="c1">To</Text>
                        <Text category="c2" status="info">
                          {item.wallet_address}
                        </Text>
                      </HStack>
                      <HStack itemsCenter mb={8}>
                        <Text category="c1">Token</Text>
                        <Text category="c1" status="warning">
                          {item.token_name}
                        </Text>
                      </HStack>
                      <HStack itemsCenter mb={8}>
                        <Text category="c1">Amount</Text>
                        <Text category="c1" status="warning">
                          {item.amount}
                        </Text>
                      </HStack>
                      <HStack itemsCenter mb={8}>
                        <Text category="c1">Staked Date </Text>
                        <Text category="c1" status="success">
                          {new Date(item.requested_at).toLocaleString()}
                        </Text>
                      </HStack>
                    </VStack>
                  );
                }
              )
            ) : (
              <Text style={{ alignSelf: "center" }} status="primary">
                No Withdraw History Found.
              </Text>
            )}

            {!floader && displayCount < withdraw_history?.length && (
              <Button title="Show More" onPress={handleShowMore} />
            )}
          </VStack>
        </ViewPager>
      </Content>
    </Container >
  );
});

export default TransactionHistory;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    paddingBottom: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  tabBar: {
    marginHorizontal: 16,
  },
  content: {
    paddingTop: 16,
  },
  contentWallet: {
    paddingHorizontal: 24,
  },
});
