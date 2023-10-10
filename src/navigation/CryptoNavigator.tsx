import React from "react";

import { CryptoStackParamList } from "./navigation-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Crypto03 from "screens/Crypto/Home";
import Crypto06 from "screens/Crypto/Crypto06";
import DepositTrhoughPlatform from "screens/Crypto/Deposit/DepositThroughPlatform";
import Transfer from "screens/Crypto/Transfer/Transfer";
import ExchangeBxgWithUsdt from "screens/Crypto/Withdraw/index";
import Wallet from "screens/Crypto/Wallet/wallet";

const Stack = createNativeStackNavigator<CryptoStackParamList>();

const CryptoaNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Crypto03} />
      <Stack.Screen
        name="DepositTrhoughPlatform"
        component={DepositTrhoughPlatform}
      />
      <Stack.Screen name="SellBxg" component={ExchangeBxgWithUsdt} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
};
export default CryptoaNavigator;
