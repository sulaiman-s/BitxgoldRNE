import * as React from "react";
import { Image, ImageRequireSource, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayout, useModal } from "hooks";
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Input,
  Icon,
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
} from "components";
import Images from "assets/images";
import TabBar from "./TabBar";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from "expo-clipboard";

interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const DepositTrhoughPlatform = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const showToast = (message: any) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const qrValue = "0x0000000000000000000000";
  const handleCopy = () => {
    Clipboard.setStringAsync(qrValue);
    showToast("Text copied!");
  };

  const { show: showTo, hide: hideTo, modalRef: modalTo } = useModal();
  const { show: showFrom, hide: hideFrom, modalRef: modalFrom } = useModal();

  const [coinFrom, setCoinFrom] = React.useState(DATA[0]);
  const [showAll, setShowAll] = React.useState(true);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Deposit</Text>}
        accessoryLeft={() => <NavigationAction status="primary" />}
      />
      <Content>
        <TabBar
          style={styles.tabBar}
          tabActive={activeIndex}
          onChangeTab={setActiveIndex}
          tabs={["By Platform", "QR-Code"]}
          backgroundTabActive={theme["background-basic-color-5"]}
          backgroundTab={theme["background-basic-color-3"]}
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
                    <HStack onPress={showFrom} itemsCenter>
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
                />
                <Text category="c1" status="platinum" marginTop={8}>
                  Balance: 2,356.89 BXG
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
                    <HStack onPress={showFrom} itemsCenter>
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
                />
                <Text category="c1" status="platinum" marginTop={8}>
                  Balance: 2,356.00 usdt
                </Text>
              </VStack>
            </VStack>

            <VStack
              border={12}
              level="1"
              margin={12}
              mt={50}
              justify="center"
              itemsCenter
            >
              <VStack mh={24} mt={16} itemsCenter>
                <QRCode value={qrValue} size={200} />
                <Text style={{ marginTop: 4 }} category="callout">
                  Wallet Address:
                </Text>
                <Text category="footnote" style={{ marginBottom: 20 }}>
                  0x0000000000000000000000000
                </Text>
                <VStack style={{ width: "100%" }}></VStack>
              </VStack>
            </VStack>
          </ViewPager>
        </Content>
      </Content>
      <Button
        children={activeIndex === 0 ? "Buy Now" : "Copy"}
        style={styles.button}
        onPress={() => {
          if (activeIndex === 1) {
            handleCopy();
          }
        }}
      />
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
    marginBottom: 18,
  },
  tabBar: {
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    paddingBottom: 40,
  },
});

const DATA: CoinFromProps[] = [
  { id: "1", image: Images.crypto.bitcoin, code: "BTC" },
  { id: "2", image: Images.crypto.eth, code: "ETH" },
  { id: "3", image: Images.crypto.sol, code: "SOL" },
];
