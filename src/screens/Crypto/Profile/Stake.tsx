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
import { Ionicons } from "@expo/vector-icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchStakePageData } from "reduxKit/reducers/slices";

const Stake = () => {
  //@ts-ignore
  const stake_page = useSelector((state) => state.stake_page);
  //@ts-ignore
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = React.useState(false);
  const [floader, setfLoader] = React.useState(false);
  const [displayCount, setDisplayCount] = React.useState(3);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 3);
  };

  const fetchData = () => {
    setfLoader(true);
    //@ts-ignore
    dispatch(fetchStakePageData(user?.id))
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
        title={() => <Text category="callout">Stake</Text>}
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
          ) : stake_page?.stakedData?.length > 0 ? (
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
                      <Text category="c1">Elapsed Time</Text>
                      <Text category="c1" status="warning">
                        {timer(item.stake_time)}
                      </Text>
                    </HStack>
                    <HStack itemsCenter mb={8}>
                      <Text category="c1">Staked Date/Time </Text>
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
              No Stake History Found.
            </Text>
          )}
          {!floader && displayCount < stake_page?.stakedData?.length && (
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

export default Stake;

const styles = StyleSheet.create({});
