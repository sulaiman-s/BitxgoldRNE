import React from 'react';

import {ReadingStackParamList} from './navigation-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadingIntro from 'screens/Reading/ReadingIntro';
import Reading01 from 'screens/Reading/Reading01';
import Reading02 from 'screens/Reading/Reading02';
import Reading03 from 'screens/Reading/Reading03';
import Reading04 from 'screens/Reading/Reading04';
import Reading05 from 'screens/Reading/Reading05';
import Reading06 from 'screens/Reading/Reading06';
import Reading07 from 'screens/Reading/Reading07';
import Reading08 from 'screens/Reading/Reading08';
import Reading09 from 'screens/Reading/Reading09';
import Reading10 from 'screens/Reading/Reading10';

const Stack = createNativeStackNavigator<ReadingStackParamList>();

const ReadingaNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ReadingIntro">
      <Stack.Screen name="ReadingIntro" component={ReadingIntro} />
      <Stack.Screen name="Reading01" component={Reading01} />
      <Stack.Screen name="Reading02" component={Reading02} />
      <Stack.Screen name="Reading03" component={Reading03} />
      <Stack.Screen name="Reading04" component={Reading04} />
      <Stack.Screen name="Reading05" component={Reading05} />
      <Stack.Screen name="Reading06" component={Reading06} />
      <Stack.Screen name="Reading07" component={Reading07} />
      <Stack.Screen name="Reading08" component={Reading08} />
      <Stack.Screen name="Reading09" component={Reading09} />
      <Stack.Screen name="Reading10" component={Reading10} />
    </Stack.Navigator>
  );
};
export default ReadingaNavigator;
