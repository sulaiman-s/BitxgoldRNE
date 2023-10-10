import React from 'react';

import {ProfileStackParamList} from './navigation-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileIntro from 'screens/Profile/ProfileIntro';
import Profile01 from 'screens/Profile/Profile01';
import Profile02 from 'screens/Profile/Profile02';
import Profile03 from 'screens/Profile/Profile03';
import Profile04 from 'screens/Profile/Profile04';
import Profile05 from 'screens/Profile/Profile05';
import Profile06 from 'screens/Profile/Profile06';
import Profile07 from 'screens/Profile/Profile07';
import Profile08 from 'screens/Profile/Profile08';
import Profile09 from 'screens/Profile/Profile09';
import Profile10 from 'screens/Profile/Profile10';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileaNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ProfileIntro">
      <Stack.Screen name="ProfileIntro" component={ProfileIntro} />
      <Stack.Screen name="Profile01" component={Profile01} />
      <Stack.Screen name="Profile02" component={Profile02} />
      <Stack.Screen name="Profile03" component={Profile03} />
      <Stack.Screen name="Profile04" component={Profile04} />
      <Stack.Screen name="Profile05" component={Profile05} />
      <Stack.Screen name="Profile06" component={Profile06} />
      <Stack.Screen name="Profile07" component={Profile07} />
      <Stack.Screen name="Profile08" component={Profile08} />
      <Stack.Screen name="Profile09" component={Profile09} />
      <Stack.Screen name="Profile10" component={Profile10} />
    </Stack.Navigator>
  );
};
export default ProfileaNavigator;
