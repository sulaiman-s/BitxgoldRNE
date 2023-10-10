import * as React from 'react';
import {View, Animated} from 'react-native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  Avatar,
  ViewPager,
} from '@ui-kitten/components';

import {Container, Text, NavigationAction} from 'components';
import Images from 'assets/images';
import TabBarProfile from '../Profile05/TabBarProfile';
import Header from './Header';
import Tab01 from './Tab01';

const Profile06 = React.memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const y = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });
  const input = [0, height * 0.005, height * 0.01, height * 0.015];
  const scale = y.interpolate({
    inputRange: input,
    outputRange: [1, 1, 0.6, 0.5],
    extrapolate: 'clamp',
  });
  const transY = y.interpolate({
    inputRange: input,
    outputRange: [0, 0, -15, -18],
    extrapolate: 'clamp',
  });
  const transText = y.interpolate({
    inputRange: [0, height * 0.05, height * 0.055, height * 0.06],
    outputRange: [0, 0, -15, -20],
    extrapolate: 'clamp',
  });
  const opacity = y.interpolate({
    inputRange: [0, height * 0.05, height * 0.055, height * 0.06],
    outputRange: [0, 0, 0.9, 1],
    extrapolate: 'clamp',
  });
  return (
    <Container style={styles.container}>
      <View>
        <View style={styles.topNav}>
          <NavigationAction status="primary" size="giant" />
          <NavigationAction status="primary" icon="menu" size="giant" />
        </View>
        <Animated.View
          style={{transform: [{translateY: transY}, {scale: scale}]}}>
          <Avatar
            source={Images.avatar.avatar10}
            /* @ts-ignore */
            style={styles.avatar}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.topText,
            {
              width: width,
              opacity: opacity,
              transform: [{translateY: transText}],
            },
          ]}>
          <Text center category="h4" marginBottom={8}>
            Francis Dixon
          </Text>
        </Animated.View>
      </View>
      <Animated.FlatList
        data={[1]}
        ListHeaderComponent={<Header />}
        onScroll={onScroll}
        keyExtractor={(i, _) => _.toString()}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{paddingBottom: bottom + 8}}
        renderItem={() => {
          return (
            <TabBarProfile
              level="1"
              tabs={['Wishlist', 'Recent View']}
              activeIndex={activeIndex}
              onChange={setActiveIndex}
            />
          );
        }}
        ListFooterComponent={() => (
          <ViewPager
            shouldLoadComponent={index => index === activeIndex}
            selectedIndex={activeIndex}
            onSelect={setActiveIndex}
            style={{flex: 1, marginTop: 1}}>
            <Tab01 data={data} />
            <Tab01 data={data} />
          </ViewPager>
        )}
      />
    </Container>
  );
});

export default Profile06;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topText: {position: 'absolute', bottom: -20, left: 0, alignItems: 'center'},
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    borderRadius: 32,
    alignSelf: 'center',
    marginTop: -44,
    marginBottom: 12,
    width: 80,
    height: 80,
  },
});
const data = [
  {
    id: 0,
    image: Images.social.photo01,
  },
  {
    id: 1,
    image: Images.social.photo02,
  },
  {
    id: 2,
    image: Images.social.photo03,
  },
  {
    id: 3,
    image: Images.social.photo04,
  },
  {
    id: 4,
    image: Images.social.photo05,
  },
  {
    id: 5,
    image: Images.social.photo06,
  },
  {
    id: 6,
    image: Images.social.person01,
  },
  {
    id: 7,
    image: Images.social.person03,
  },
  {
    id: 8,
    image: Images.social.person02,
  },
];
