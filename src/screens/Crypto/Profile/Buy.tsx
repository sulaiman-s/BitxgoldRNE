import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationAction, Text, VStack } from "components";
import ListItem from "components/list";
import { Button, TopNavigation } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchBxgHistory } from "reduxKit/reducers/slices";

const Buy = () => {
  //@ts-ignore
  const bxg_history = useSelector((state) => state.bxg_history);
  //@ts-ignore
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [floader, setfLoader] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [displayCount, setDisplayCount] = React.useState(3);

  const handleShowMore = () => {
    setDisplayCount(displayCount + 3);
  };

  const filterForTypeBuy = bxg_history?.filter((item: any) =>
    item.type.includes("Buy")
  );
  const fetchData = () => {
    setfLoader(true);
    //@ts-ignore
    dispatch(fetchBxgHistory(user?.id))
      .then(unwrapResult)
      //@ts-ignore
      .then((payload: any) => {
        setfLoader(false);
      })
      .catch((error: any) => {
        setfLoader(false);
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [refresh]);
  return (
    <View style={{ paddingTop: 40, flex: 1 }}>
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Buy</Text>}
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
      <ScrollView style={{ paddingBottom: 15 }}>
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
                    key={i}
                    id={i}
                    //@ts-ignore
                    bxg={item.bxg}
                    //@ts-ignore
                    usdt={item.usdt}
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

export default Buy;

const styles = StyleSheet.create({});
