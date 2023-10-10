import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";
import { Text, VStack, HStack, IDivider } from "components";
import Images from "assets/images";
const ListItem = ({
  //@ts-ignore
  type,
  //@ts-ignore
  status,
}) => {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <VStack border={12} level="2" margin={0} padding={16} mb={12}>
      <HStack itemsCenter>
        <HStack itemsCenter>
          <Image
            source={Images.crypto.bxg}
            //@ts-ignore
            style={styles.coin}
          />
          <Text category="s2" status="platinum">
            BXG
          </Text>
        </HStack>
        <Text category="s2" status="primary">
          10
        </Text>
      </HStack>

      <HStack itemsCenter mv={12}>
        <HStack itemsCenter justify="center">
          <Image
            source={Images.crypto.usdt}
            //@ts-ignore
            style={styles.coin}
          />
          <Text category="s2" status="platinum">
            Usdt
          </Text>
        </HStack>
        <Text category="s2" status="primary">
          43.12
        </Text>
      </HStack>
      {showAll && (
        <>
          <HStack itemsCenter mb={12}>
            <HStack itemsCenter>
              <Text category="s2" status="platinum">
                Type
              </Text>
            </HStack>
            <Text category="s2" status="primary">
              {type}
            </Text>
          </HStack>
          <HStack itemsCenter mb={12}>
            <HStack itemsCenter>
              <Text category="s2" status="platinum">
                Status
              </Text>
            </HStack>
            <Text
              category="s2"
              status={status == "accepted" ? "success" : "danger"}
            >
              {status}
            </Text>
          </HStack>
          <HStack itemsCenter mb={12}>
            <HStack itemsCenter>
              <Text category="s2" status="platinum">
                Time
              </Text>
            </HStack>
            <Text category="c1" status="primary">
              2023-07-18 06:28 pm
            </Text>
          </HStack>
        </>
      )}
      <HStack
        itemsCenter
        justify="center"
        onPress={() => {
          setShowAll(!showAll);
        }}
      >
        <Text category="h8" marginBottom={1} status="primary">
          {showAll ? "Show less" : "Show more"}
        </Text>
        {showAll ? (
          <Icon pack="assets" name="undo" style={styles.caretDown} />
        ) : (
          <Icon pack="assets" name="caret_down" style={styles.caretDown} />
        )}
      </HStack>
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
    marginRight: 12,
  },
});
