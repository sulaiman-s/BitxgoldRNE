import React from "react";

import { CryptoStackParamList } from "./navigation-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Crypto03 from "screens/Crypto/Home";
import DepositTrhoughPlatform from "screens/Crypto/Deposit/DepositThroughPlatform";
import Transfer from "screens/Crypto/Transfer/Transfer";
import ExchangeBxgWithUsdt from "screens/Crypto/Withdraw/index";
import Wallet from "screens/Crypto/Wallet/wallet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Profile05 from "screens/Crypto/StakeClaim";
import Profile02 from "screens/Crypto/Profile";
import TransactionHistory from "screens/Crypto/Transaction";
import Buy from "screens/Crypto/Profile/Buy";
import Sell from "screens/Crypto/Profile/Sell";
import Stake from "screens/Crypto/Profile/Stake";
import Withdraw from "screens/Crypto/Profile/Withdraw";

const Tab = createBottomTabNavigator();
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
      <Stack.Screen name="History" component={TransactionHistory} />
      <Stack.Screen name="Buy" component={Buy} />
      <Stack.Screen name="Sell" component={Sell} />
      <Stack.Screen name="Stakee" component={Stake} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
    </Stack.Navigator>
  );
};

const CryptoTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 12, fontFamily: "AlbertSans-Regular" },
        tabBarActiveTintColor: "#3366FF",
        headerTitleStyle: { fontFamily: "AlbertSans-Regular" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home1"
        component={CryptoaNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
          title: "Home",
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Rewards"
        component={Reward}
        options={{
          tabBarIcon: ({ focused,size, color }) => (
            focused?
            <MaterialCommunityIcons
              name="gift-open"
              size={size}
              color={color}
            />:
            <MaterialCommunityIcons
              name="gift"
              size={size}
              color={color}
            />
          ),
          
        }}
      /> */}
      <Tab.Screen
        name="Stake"
        component={Profile05}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="stack-exchange"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile02}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CryptoTabNav;
