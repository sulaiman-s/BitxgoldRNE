import * as React from "react";
import { View } from "react-native";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "@ui-kitten/components";

import { RootStackParamList } from "./navigation-types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import AuthNavigator from "./AuthNavigator";
import CryptoTabNav from "./CryptoNavigator";
import { useSelector } from "react-redux";

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  const themes = useTheme();
  //@ts-ignore
  const id = useSelector((state) => state.user?.id);

  return (
    <NavigationContainer ref={navigationRef}>
      <View
        style={{ backgroundColor: themes["background-basic-color-1"], flex: 1 }}
      >
        {id ? <CryptoTabNav /> : <AuthNavigator />}
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
