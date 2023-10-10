import * as React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
  Toggle,
} from '@ui-kitten/components';

import {Container, Text, NavigationAction} from 'components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Images from 'assets/images';
import useToggle from 'hooks/useToggle';
import AccountCard from './AccountCard';

const Profile03 = React.memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [connectedFB, setConnectedFB] = useToggle(true);
  const [connectedGG, setConnectedGG] = useToggle(false);
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateY.value = event.contentOffset.y;
  });
  const input = [0, height * 0.082, height * 0.087, height * 0.09];
  const opacityHeader = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.1, height * 0.15, height * 0.2],
      [0, 0, 1, 1],
      Extrapolate.CLAMP,
    );
    const transY = interpolate(
      translateY.value,
      input,
      [60, 60, 15, 0],
      Extrapolate.CLAMP,
    );
    const scale = interpolate(translateY.value, input, [0, 0, 1, 1]);
    return {
      opacity: opacity,
      transform: [{translateY: transY}, {scale: scale}],
      position: 'absolute',
      bottom: 8,
      left: width / 2.8,
    };
  }, []);
  const scaleAvatar = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, input, [1, 1, 0.6, 0.6]);
    const transY = interpolate(
      translateY.value,
      input,
      [0, -40, -88, -88],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale: scale}, {translateY: transY}],
    };
  }, []);
  return (
    <Container style={styles.container}>
      <Layout level="5" style={styles.top}>
        <View style={[{paddingTop: top}, styles.flexRow]}>
          <NavigationAction icon="arrow_left" marginLeft={4} />
          <NavigationAction icon="pencil" marginRight={4} />
        </View>
        <Animated.View style={scaleAvatar}>
          <Avatar
            source={Images.avatar.avatar10}
            style={{
              alignSelf: 'center',
              marginBottom: -48,
              width: 96,
              height: 96,
              zIndex: 100,
            }}
          />
        </Animated.View>
        <Animated.View style={opacityHeader}>
          <Text
            children="Philip Schmidt"
            center
            category="callout"
            status="white"
          />
        </Animated.View>
      </Layout>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        <Text
          children="Philip Schmidt"
          center
          category="h4"
          marginTop={60}
          marginBottom={3}
        />
        <Text
          children="+84 123456790"
          center
          category="callout"
          status="snow"
          marginBottom={24}
        />
        <AccountCard item={DATA_Account} />
        <TouchableOpacity activeOpacity={0.7}>
          <Layout style={styles.item} level="2">
            <View style={styles.flexRow}>
              <View style={styles.fb}>
                <Icon pack="assets" name={'fb'} style={[styles.iconFb]} />
              </View>
              <View style={styles.textView}>
                <Text
                  marginLeft={8}
                  marginBottom={4}
                  children={'Facebook'}
                  category="callout"
                />
                <Text
                  marginLeft={8}
                  uppercase
                  children={'Connected'}
                  category="footnote"
                  status="snow"
                />
              </View>
            </View>
            <Toggle
              checked={connectedFB}
              onChange={setConnectedFB}
              status="primary"
            />
          </Layout>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Layout style={styles.item} level="2">
            <View style={styles.flexRow}>
              <View style={[styles.gg]}>
                <Icon pack="assets" name={'gg'} style={[styles.iconGG]} />
              </View>
              <View style={styles.textView}>
                <Text
                  marginLeft={8}
                  marginBottom={4}
                  children={'Google'}
                  category="callout"
                />
                <Text
                  marginLeft={8}
                  uppercase
                  children={'Disable'}
                  category="footnote"
                  status="snow"
                />
              </View>
            </View>
            <Toggle
              checked={connectedGG}
              onChange={setConnectedGG}
              status="primary"
            />
          </Layout>
        </TouchableOpacity>
      </Animated.ScrollView>
      <Text
        children="LOG OUT"
        uppercase
        center
        status="snow"
        category="callout"
        onPress={goBack}
      />
    </Container>
  );
});

export default Profile03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  top: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  textView: {
    justifyContent: 'center',
  },
  layout: {
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 24,
    justifyContent: 'space-between',
    paddingRight: 16,
    marginHorizontal: 24,
  },
  iconFb: {
    tintColor: 'text-white-color',
    height: 24,
    width: 11,
  },
  iconGG: {
    tintColor: 'text-white-color',
    width: 20.5,
    height: 21,
  },
  fb: {
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#6979F8',
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  gg: {
    borderRadius: 50,
    margin: 10,
    backgroundColor: '#FF647C',
    padding: 14,
  },
});
const DATA_Account = {
  gender: 'Male',
  birthday: '25 Jan 2019',
  location: 'Alaska',
  name: '',
  phoneNumber: '',
};
