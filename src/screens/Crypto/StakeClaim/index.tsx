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
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Stake</Text>}
        accessoryLeft={() => <NavigationAction status="primary" />}
      />
      <Content>
        <CardSteak />
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
                />
                <Text category="c1" status="platinum" marginTop={8}>
                  Balance: 2,356.00 BXG
                </Text>
              </VStack>
              <Button children={"Stake"} style={styles.button} />
            </VStack>

            <VStack level="2">
              {DATA.map((item, index) => (
                <VStack key={index} mv={12} border={12} padding={24} level="1">
                  <HStack itemsCenter mb={8}>
                    <Text category="subhead">Staked BXG</Text>
                    <Text category="subhead" status="info">
                      {item.stake}
                    </Text>
                  </HStack>
                  <HStack itemsCenter mb={8}>
                    <Text category="subhead">Staked Time</Text>
                    <Text category="subhead" status="warning">
                      {item.timer}
                    </Text>
                  </HStack>
                  <HStack itemsCenter mb={8}>
                    <Text category="subhead">Staked Date </Text>
                    <Text category="subhead" status="success">
                      {item.date}
                    </Text>
                  </HStack>
                  <Button
                    children={"claim"}
                    style={{ marginHorizontal: 90 }}
                    size="small"
                  />
                </VStack>
              ))}
            </VStack>
          </ViewPager>
        </Content>
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
