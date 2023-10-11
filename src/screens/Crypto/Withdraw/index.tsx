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
  IndexPath,
  Select,
  SelectItem,
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
import { Picker } from "@react-native-picker/picker";
import TabBarProfile from "../../../components/TabBarProfile";

interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const ExchangeBxgWithUsdt = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState();

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

  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  //@ts-ignore
  const displayValue = dropdown[selectedIndex.row];

  const [coinFrom, setCoinFrom] = React.useState(DATA[0]);
  const [showAll, setShowAll] = React.useState(true);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Withdraw</Text>}
        accessoryLeft={() => <NavigationAction status="primary" />}
      />
      <Content>
        <TabBarProfile
          tabs={["Sell BXG", "Transfer BXG"]}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          style={styles.tabBar}
        />
        <Content contentContainerStyle={styles.content}>
          <ViewPager selectedIndex={activeIndex} onSelect={setActiveIndex}>
            <VStack border={12} level="1" margin={12} mt={50}>
              <VStack mh={24} mt={16}>
                <HStack mb={8}>
                  <Text category="callout">Sell</Text>
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
                        category="s2"
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
              <VStack mh={24} mv={10}>
                <HStack mb={8}>
                  <Text category="callout">Recieve</Text>
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
                      <Text marginHorizontal={8} category="s2">
                        {"USDT"}
                      </Text>
                      {/* <Icon pack="assets" name="caret_down" style={styles.caret} /> */}
                    </HStack>
                  )}
                />
                <Text
                  category="c1"
                  status="platinum"
                  marginTop={8}
                  marginBottom={20}
                >
                  Balance: 2,356.00 usdt
                </Text>
              </VStack>
            </VStack>

            <VStack border={12} level="1" margin={12} mt={50}>
              <VStack mh={24} mt={16}>
                <HStack mb={8}>
                  <Text category="callout">Wallet Address</Text>
                </HStack>
                <Input style={styles.input} placeholder="0x00000000000000" />
              </VStack>
              <VStack mh={24} mt={16} mv={10}>
                <HStack mb={-8}>
                  <Text category="callout">Amount</Text>
                </HStack>
                <HStack
                  mt={16}
                  mb={5}
                  itemsCenter
                  style={{
                    borderWidth: 1,
                    borderColor: "#E8E8E8",
                    borderRadius: 16,
                    width: "100%",
                    height: 60,
                  }}
                >
                  <Input placeholder="100" style={styles.search} size="giant" />
                  <Select
                    selectedIndex={selectedIndex}
                    value={
                      //@ts-ignore
                      selectedIndex.row == 0
                        ? "USDT"
                        : //@ts-ignore
                        selectedIndex.row == 1
                        ? "BXG"
                        : //@ts-ignore
                        selectedIndex.row == 2
                        ? "BNB"
                        : "USDT"
                    }
                    size="large"
                    status="control"
                    style={styles.select}
                    //@ts-ignore
                    onSelect={(index) => setSelectedIndex(index)}
                  >
                    <SelectItem title="USDT" />
                    <SelectItem title="BXG" />
                    <SelectItem title="BNB" />
                  </Select>
                </HStack>
                <Text category="c1" status="platinum" marginBottom={20}>
                  Balance: 2,356.89 BXG
                </Text>
              </VStack>
            </VStack>
          </ViewPager>
        </Content>
      </Content>
      <Button
        children={activeIndex === 0 ? "Sell Now" : "Transfer Now"}
        style={styles.button}
      />
    </Container>
  );
});

export default ExchangeBxgWithUsdt;

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
    borderRadius: 12,
    // borderTopLeftRadius: 24,
    // borderTopRightRadius: 24,
  },
  content: {
    paddingBottom: 40,
  },
  select: {
    flex: 0.6,
    borderLeftWidth: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderLeftColor: "#E8E8E8",
    backgroundColor: "background-basic-color-1",
    height: "100%",
    justifyContent: "center",
  },
  search: {
    flex: 1,
    backgroundColor: "background-basic-color-1",
    borderColor: "transparent",
    justifyContent: "center",
    borderRadius: 12,
    height: "100%",
  },
});

const DATA: CoinFromProps[] = [
  { id: "1", image: Images.crypto.bitcoin, code: "BTC" },
  { id: "2", image: Images.crypto.eth, code: "ETH" },
  { id: "3", image: Images.crypto.sol, code: "SOL" },
];

const dropdown = ["BXG", "USDT", "BNB"];
