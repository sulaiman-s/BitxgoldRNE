import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import { Text, VStack, HStack, IDivider } from "components";
import Images from "assets/images";
const ListItem = ({
  //@ts-ignore
  type,
  //@ts-ignore
  bxg,
  //@ts-ignore
  usdt,
  //@ts-ignore
  status,
  //@ts-ignore
  time,
  //@ts-ignore
  id,
}) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <VStack key={id} border={12} level="2" margin={0} padding={16} mb={12}>
      <HStack itemsCenter>
        <HStack itemsCenter justify="flex-start">
          <Text category="c1" status="platinum">
            BXG
          </Text>
          <Image
            source={Images.crypto.bxg}
            //@ts-ignore
            style={styles.coin}
          />
        </HStack>
        <Text category="c1" status="primary">
          {bxg}
        </Text>
      </HStack>

      <HStack itemsCenter mv={12}>
        <HStack itemsCenter justify="center">
          <Text category="c1" status="platinum">
            Usdt
          </Text>
          <Image
            source={Images.crypto.usdt}
            //@ts-ignore
            style={styles.coin}
          />
        </HStack>
        <Text category="c1" status="primary">
          {usdt}
        </Text>
      </HStack>
      {/* {showAll && ( */}
      <>
        <HStack itemsCenter mb={12}>
          <HStack itemsCenter>
            <Text category="c1" status="platinum">
              Type
            </Text>
          </HStack>
          <Text category="c1" status="primary">
            {type}
          </Text>
        </HStack>
        <HStack itemsCenter mb={12}>
          <HStack itemsCenter>
            <Text category="c1" status="platinum">
              Status
            </Text>
          </HStack>
          <Text
            category="c1"
            status={status == "accepted" ? "success" : "danger"}
          >
            {status}
          </Text>
        </HStack>
        <HStack itemsCenter mb={12}>
          <HStack itemsCenter>
            <Text category="c1" status="platinum">
              Date/Time
            </Text>
          </HStack>
          <Text category="c1" status="primary">
            {new Date(time).toLocaleString()}
          </Text>
        </HStack>
      </>
      {/* )} */}
      {/* <HStack
        itemsCenter
        justify="center"
        onPress={() => {
          setShowAll(!showAll);
        }}
      >
        <Text category="c1" marginBottom={1} status="primary">
          {showAll ? "Show less" : "Show more"}
        </Text>
        {showAll ? (
          <Icon pack="assets" name="undo" style={styles.caretDown} />
        ) : (
          <Icon pack="assets" name="caret_down" style={styles.caretDown} />
        )}
      </HStack> */}
    </VStack>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  caretDown: {
    tintColor: "blue",
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  inputSlipage: {
    flex: 1,
    marginLeft: 24,
    padding: 4,
    borderRadius: 12,
    alignItems: "center",
  },
  coin: {
    width: 16,
    height: 16,
    marginRight: 3,
  },
});
