import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HStack, NavigationAction, Text, VStack } from "components";
import { Button, TopNavigation } from "@ui-kitten/components";
import { timer } from "utils/arrayFilter";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchWithdrawHistory } from "reduxKit/reducers/slices";
import { Ionicons } from "@expo/vector-icons";

const Withdraw = () => {
  //@ts-ignore
  const withdraw_history = useSelector((state) => state.withdraw_history);
  //@ts-ignore
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [floader, setfLoader] = React.useState(false);
  const [displayCount, setDisplayCount] = React.useState(3);
  const [refresh, setRefresh] = React.useState(false);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 3);
  };

  const fetchData = () => {
    setfLoader(true);
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

  return (
    <View style={{ paddingTop: 40, flex: 1 }}>
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Withdraw</Text>}
        accessoryLeft={() => (
          <NavigationAction status="primary" icon="arrow_left" />
        )}
        accessoryRight={() => (
          <TouchableOpacity
            style={{ width: 40 }}
            onPress={() => setRefresh(!refresh)}
          >
            <Ionicons name="reload-circle" size={30} />
          </TouchableOpacity>
        )}
      />
      <ScrollView>
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
                      <Text category="c1">Date/Time </Text>
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
            <Button
              children={() => (
                <Text category="subhead" status="primary">
                  show more
                </Text>
              )}
              onPress={handleShowMore}
              size="small"
              status="basic"
              style={{ marginBottom: 12 }}
              //   accessoryRight={()=><Ionicons name="chevron-down" />}
            />
          )}
        </VStack>
      </ScrollView>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({});
