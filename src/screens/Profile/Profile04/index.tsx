import * as React from 'react';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Button,
  Avatar,
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction} from 'components';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import Images from 'assets/images';

const Profile04 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const data = [
    {
      title: 'Project done',
      number: 348,
    },
    {
      title: 'Happy client',
      number: 195,
    },
    {
      title: 'Hour working',
      number: 870,
    },
  ];

  const style = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      translationY.value,
      [-100, 0],
      [height / 2 + 100, height / 2],
      Extrapolate.CLAMP,
    );

    const top = interpolate(
      translationY.value,
      [0, height],
      [0, -height],
      Extrapolate.CLAMP,
    );

    return {
      position: 'absolute',
      left: 0,
      width: width,
      resizeMode: 'cover',
      height: heightAnim,
      top: top,
    };
  });

  return (
    <Container useSafeArea={false}>
      <Animated.Image
        source={Images.social.photo07}
        style={style}
        resizeMode="cover"
      />
      <TopNavigation
        appearance="control"
        style={[styles.header, {top: top}]}
        accessoryLeft={
          <NavigationAction icon="arrow_left" status="transparent" />
        }
        accessoryRight={
          <NavigationAction
            icon="setting"
            marginRight={4}
            status="transparent"
          />
        }
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Layout style={[styles.content, {marginTop: height / 2 - 20}]}>
          <Avatar
            source={Images.avatar.avatar03}
            style={[
              //@ts-ignore
              styles.avatar,
              {borderColor: theme['background-basic-color-1']},
            ]}
          />
          <ImageBackground source={Images.social.photo08} style={styles.label}>
            <Text children="$25" category="callout" center marginTop={20} />
            <Text children="per hours" center category="subhead" />
          </ImageBackground>
          <View style={styles.viewName}>
            <Text marginTop={16} category="h4">
              Marion Harrison
            </Text>
          </View>
          <Text category="callout" status="platinum" marginTop={8}>
            Digital Marketing
          </Text>
          <Layout level="2" style={styles.box}>
            {data &&
              data.map((i, index) => {
                const {title, number} = i;
                return (
                  <View
                    key={index}
                    style={[
                      styles.item,
                      {
                        borderRightColor:
                          index < data.length - 1
                            ? theme['background-basic-color-3']
                            : 'transparent',
                      },
                    ]}>
                    <Text center category="h5">
                      {number}
                    </Text>
                    <Text center category="c1" status="snow">
                      {title}
                    </Text>
                  </View>
                );
              })}
          </Layout>
        </Layout>
      </Animated.ScrollView>
      <Layout style={[styles.buttonView, {paddingBottom: bottom + 16}]}>
        <Button children="Hire Now!" size="large" onPress={goBack} />
      </Layout>
    </Container>
  );
});

export default Profile04;

const themedStyles = StyleService.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  avatar: {
    borderWidth: 2,
    marginTop: -40,
    width: 80,
    height: 80,
  },
  label: {
    width: 88,
    height: 112,
    position: 'absolute',
    right: 24,
  },
  viewName: {
    width: '50%',
    marginRight: 24,
  },
  box: {
    marginTop: 24,
    borderRadius: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  item: {
    flex: 1,
    paddingVertical: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  header: {
    position: 'absolute',
    right: 0,
    left: 0,
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
});
