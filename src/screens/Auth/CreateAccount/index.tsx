import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, TopNavigation, useTheme,Icon} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';

import Text from 'components/Text';
import Container from 'components/Container';
import AnimatedStep from '../elements/AnimatedStep';
import NavigationAction from 'components/NavigationAction';
import {SceneMap, TabView} from 'react-native-tab-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useLayout from 'hooks/useLayout';
import { navigate } from 'navigation/RootNavigation';

const CreateAccount = memo(() => {
  const {goBack} = useNavigation();
  const theme = useTheme();
  const {width, bottom} = useLayout();
  const [index, setIndex] = React.useState<number>(0);

  const Tab1 = React.useCallback(() => {
    return (
      <KeyboardAwareScrollView
        style={styles.content}
        enableOnAndroid
        showsVerticalScrollIndicator={false}>
        <Text category="h3" center marginBottom={32}>
          Create an account
        </Text>
        {/* <View style={styles.layout}>
          <Input style={styles.input01} placeholder="First name" />
          <Input style={styles.flex1} placeholder="Last name" />
        </View>
        <View style={styles.flexRow}>
          <Input style={styles.input01} placeholder="Gender" />
          <Input style={styles.flex1} placeholder="Your age" />
        </View> */}
        <Input placeholder="Username" style={styles.input} accessoryLeft={<Icon pack='assets' name='user'/>}/>
        <Input placeholder="Email" style={styles.input} accessoryLeft={<Icon pack='assets' name='email'/>}/>
        <Input placeholder="Phone" style={styles.input} accessoryLeft={<Icon pack='assets' name='phone'/>}/>
        {/* <Input placeholder="Your Address" /> */}
        <Button
          children="NEXT STEP"
          style={styles.button}
          onPress={() => setIndex(index + 1)}
        />
      </KeyboardAwareScrollView>
    );
  }, [index]);
  const Tab2 = React.useCallback(() => {
    return (
      <View style={styles.content}>
        <Text category="h3" center marginBottom={32}>Set a Password</Text>
        <Input placeholder="Password" style={styles.input} accessoryLeft={<Icon pack='assets' name='lock'/>}/>
        <Input placeholder="Confirm Password" style={styles.input} accessoryLeft={<Icon pack='assets' name='shield'/>}/>
        <Button
          children="NEXT STEP"
          style={styles.button}
          onPress={() => setIndex(index + 1)}
        />
      </View>
    );
  }, [index]);
  const Tab3 = React.useCallback(() => {
    return (
      <View style={styles.content}>
        <Text category="h3" center marginBottom={32}>Add a Referral</Text>
        <Text category="h8"  marginBottom={32}>If you don't have any referral address please use this :0x97A760EeD672A22c0B782F813F30598B8f994038</Text>
        <Input placeholder="Referar code" style={styles.input} accessoryLeft={<Icon pack='assets' name='person'/>} value='0x97A760EeD672A22c0B782F813F30598B8f994038'/>
        <Button
          children="Submit"
          style={styles.button}
          onPress={()=>navigate('Home')}
        />
      </View>
    );
  },[]);
  // const Tab4 = React.useCallback(() => {
  //   return (
  //     <View>
  //       <Text>Step 04.</Text>
  //       <Button children="Go to Home !" style={styles.button} />
  //     </View>
  //   );
  // }, [index]);

  const renderScene = SceneMap({
    first: Tab1,
    second: Tab2,
    third: Tab3,
    // four: Tab4,
  });
  const [routes] = React.useState([
    {key: 'first', title: ''},
    {key: 'second', title: ''},
    {key: 'third', title: ''},
    // {key: 'four', title: ''},
  ]);
  return (
    <Container useSafeArea>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={() => {
          return (
            <NavigationAction
              icon={'xcircle'}
              status="placeholder"
              size="giant"
            />
          );
        }}
      />
      <AnimatedStep style={styles.animatedStep} step={index} />
      <Text
        category="callout"
        center
        marginTop={39}
        status="placeholder"
        marginBottom={8}>
        Step 0{index + 1}.
      </Text>
      <TabView
        lazy
        lazyPreloadDistance={2000}
        navigationState={{index, routes}}
        renderScene={renderScene}
        overScrollMode="never"
        onIndexChange={setIndex}
        initialLayout={{width}}
        style={styles.container}
        renderTabBar={() => null}
        swipeEnabled={false}
      />
      <View
        style={[
          styles.bottom,
          {
            paddingBottom: bottom + 16,
          },
        ]}>
        <Text
          children="Already have an account? Login"
          category="h6"
          status="primary"
          center
          onPress={()=>navigate('SignIn')}
        />
      </View>
    </Container>
  );
});

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  topNav: {
    marginHorizontal: 12,
  },
  input: {
    marginBottom: 16,
  },
  input01: {
    flex: 1,
    marginRight: 16,
  },
  inputPhone: {
    marginVertical: 20,
  },
  content: {
    marginHorizontal: 24,
  },
  flexRow: {
    flexDirection: 'row',
  },
  animatedStep: {
    marginTop: 28,
  },
  layout: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  button: {
    marginTop: 32,
    marginHorizontal: 12,
  },
});
