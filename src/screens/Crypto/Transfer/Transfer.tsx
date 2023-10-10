import * as React from "react";
import { Image, ImageRequireSource } from "react-native";
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
  Select,
  SelectItem,
  IndexPath,
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

interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const Transfer = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const { show: showTo, hide: hideTo, modalRef: modalTo } = useModal();
  const { show: showFrom, hide: hideFrom, modalRef: modalFrom } = useModal();

  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const dropdown = ["BXG", "USDT", "BNB"];
  //@ts-ignore
  const displayValue = dropdown[selectedIndex.row];

  const [coinFrom, setCoinFrom] = React.useState(DATA[0]);
  const [showAll, setShowAll] = React.useState(true);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={() => <Text category="callout">Transfer</Text>}
        accessoryLeft={() => <NavigationAction status="primary" />}
      />
      <Content>
        <Text center status="info">
          Transfer <Text status="platinum">BNB, USDT & BXG at BitXGold</Text>
        </Text>

        <VStack border={12} level="1" margin={12} mt={50}>
          <VStack mh={24} mt={16}>
            <HStack mb={8}>
              <Text category="callout">Wallet Address</Text>
            </HStack>
            <Input style={styles.input} placeholder="0x00000000000000" />
          </VStack>
          <VStack mh={24} mt={16}>
            <HStack mb={8}>
              <Text category="callout">Token</Text>
            </HStack>
            <Select
              value={displayValue}
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}
            >
              <SelectItem title="BXG" />
              <SelectItem title="USDT" />
              <SelectItem title="BNB" />
            </Select>
          </VStack>
          <VStack mh={24} mv={10}>
            <HStack mb={8}>
              <Text category="callout">Value</Text>
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
      </Content>
      <Button children={"Transfer Now"} style={styles.button} />
    </Container>
  );
});

export default Transfer;

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
    marginVertical: 8,
  },
});

const DATA: CoinFromProps[] = [
  { id: "1", image: Images.crypto.bitcoin, code: "BTC" },
  { id: "2", image: Images.crypto.eth, code: "ETH" },
  { id: "3", image: Images.crypto.sol, code: "SOL" },
];
