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
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader";
import SuccessModel from "components/SuccessModel";
import { fetchBalance } from "reduxKit/reducers/slices";
import axiosInstance from "utils/axiosInstance";
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

  const dispatch = useDispatch();
  const [walletAddress, setWallet] = React.useState("");
  const [tokenValue, setTokenValue] = React.useState("");
  //@ts-ignore
  const { bxg, usdt, bnb } = useSelector((state) => state.wallet);
  //@ts-ignore
  const { id } = useSelector((state) => state.user);
  const [loader, setLoader] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [err, setError] = React.useState<any>(null);

  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(1));

  const handleWidthdraw = async () => {
    setLoader(true);
    const inpvalue = Number(tokenValue);
    if (walletAddress === "") {
      setLoader(false);
      setError("Please Enter Wallet Address");
      return;
    }
    if (inpvalue === 0) {
      setLoader(false);
      setError("Please Enter Amount");
      return;
    }
    //@ts-ignore
    const token = selectedIndex.row;

    if (token === 1) {
      if (inpvalue > bxg) {
        setLoader(false);
        setError("Insufficient BXG Balance");
        return;
      }
    } else if (token === 2) {
      if (inpvalue > bnb) {
        setLoader(false);
        setError("Insufficient Balance");
        return;
      }
    } else if (token === 0) {
      if (inpvalue > usdt) {
        setLoader(false);
        setError("Insufficient Balance");
        return;
      }
    }
    const token_name =
      //@ts-ignore
      selectedIndex.row == 0
        ? "usdt"
        : //@ts-ignore
        selectedIndex.row == 1
        ? "bxg"
        : //@ts-ignore
        selectedIndex.row == 2
        ? "bnb"
        : "bxg";

    const requestBody = {
      user_id: id,
      amount: inpvalue,
      wallet_address: walletAddress,
    };
    //@ts-ignore
    try {
      await axiosInstance
        .post("/api/withdrawcrypto/" + token_name, requestBody)
        .then((res: any) => {
          setLoader(false);
          if (res.data.status) {
            //@ts-ignore
            dispatch(fetchBalance(id));
            setShowSuccess(true);
          }
        })
        .catch((err: any) => {
          setLoader(false);
          setError(err.response.data.message);
        });
    } catch (error: any) {
      setLoader(false);
      setError(error.message);
    }
  };

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
            <Input
              style={styles.input}
              placeholder="0x00000000000000"
              onChangeText={(t) => setWallet(t)}
            />
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
              <Input
                placeholder="100"
                style={styles.search}
                size="giant"
                onChangeText={(t) => setTokenValue(t)}
              />
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
                    : "BXG"
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
              {`Balance: ${
                //@ts-ignore
                selectedIndex.row == 0
                  ? `${usdt} USDT`
                  : //@ts-ignore
                  selectedIndex.row == 1
                  ? `${bxg} BXG`
                  : //@ts-ignore
                  selectedIndex.row == 2
                  ? `${bnb} BNB`
                  : `${bxg} BXG`
              }`}
            </Text>
          </VStack>
        </VStack>
        {err ? (
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              marginHorizontal: 15,
              color: "red",
            }}
          >
            {err}
          </Text>
        ) : null}
      </Content>
      <Button
        children={"Transfer Now"}
        style={styles.button}
        onPress={handleWidthdraw}
      />
      <Loader visible={loader} />
      <SuccessModel
        modalVisible={showSuccess}
        name={"Buy"}
        msg={`Successfully sent ${tokenValue} ${
          //@ts-ignore
          selectedIndex.row == 0
            ? "USDT"
            : //@ts-ignore
            selectedIndex.row == 1
            ? "BXG"
            : //@ts-ignore
            selectedIndex.row == 2
            ? "BNB"
            : "BXG"
        }`}
        isName={true}
        // isbank={true}
        isSubmit={true}
        onPress={() => {
          setShowSuccess(!showSuccess);
          goBack();
        }}
      />
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
