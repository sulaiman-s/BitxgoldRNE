import * as React from 'react';
import {View} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';

import {RootStackParamList} from './navigation-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import SplashScreen from 'screens/Spash/SplashScreen';
import AuthNavigator from './AuthNavigator';
import ProfileNavigator from './ProfileNavigator';
import ReadingaNavigator from './ReadingNavigator';
import CryptoNavigator from './CryptoNavigator';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  const themes = useTheme();

  return (
    <NavigationContainer ref={navigationRef}>
      <View
        style={{backgroundColor: themes['background-basic-color-1'], flex: 1}}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="Crypto" component={CryptoNavigator} />
          <Stack.Screen name="Profile" component={ProfileNavigator} />
          <Stack.Screen name="Reading" component={ReadingaNavigator} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default AppContainer;
