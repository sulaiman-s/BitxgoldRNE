import * as React from "react";
import { useLayout } from "hooks";
import { ImageSourcePropType } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Button,
} from "@ui-kitten/components";

import { Text, HStack, VStack } from "components";
interface IFriendProps {
  id: number;
  avatar: ImageSourcePropType;
  name: string;
  mutualFriends: number;
}
export interface FriendProps {
  level?: "1" | "2" | "3" | "4";
  name: string;
  amount: string;
}
const FriendItem = ({ level = "1", name, amount }: FriendProps) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <VStack
      style={[styles.container, { width: (width - 64) / 2 }]}
      level={level}
    >
      <Text category="callout" marginBottom={8} center>
        {name}
      </Text>
      <Text status="snow" category="subhead" marginBottom={16} center>
        {amount}
      </Text>
    </VStack>
  );
};

export default FriendItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 16,
    marginBottom: 16,
    height: 150,
  },
  avatar: {
    marginTop: 24,
    marginBottom: 18,
  },
});
