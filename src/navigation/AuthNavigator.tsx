import React from "react";

import { AuthStackParamList } from "./navigation-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn02 from "screens/Auth/SignIn02";
import ForgotPassword from "screens/Auth/ForgotPassword";
import Verify from "screens/Auth/Verify";
import CreateAccount from "screens/Auth/CreateAccount";
import Authenticate from "screens/Auth/Authenticate";
import Success from "components/success";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn02} />
      <Stack.Screen name="SignUp" component={CreateAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen name="Authenticate" component={Authenticate} />
      <Stack.Screen name="success" component={Success} />
      <Stack.Screen name="verify" component={Verify} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
