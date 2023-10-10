import * as React from 'react';
import {View, Animated, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Avatar,
  ViewPager,
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction} from 'components';
import Images from 'assets/images';
import Projects from './Projects';
import TabBar07 from './TabBar07';

const Profile07 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const size = 120 * (width / 375);
  const tabs = ['Projects', 'Favorites', 'Moodboard', 'Following'];
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const renderItem = React.useCallback(() => {
    return (
      <TabBar07
        tabs={tabs}
        style={{
          paddingLeft: 24,
          backgroundColor: theme['background-basic-color-1'],
          paddingBottom: 8,
        }}
        onChange={setActiveIndex}
        activeIndex={activeIndex}
      />
    );
  }, [activeIndex, setActiveIndex]);
  const renderHeader = React.useCallback(() => {
    return (
      <View style={styles.header}>
        <Avatar
          source={Images.avatar.avatar10}
          style={{
            width: size,
            height: size,
          }}
        />
        <View>
          <NavigationAction
            icon="user_plus"
            size="large"
            backgroundColor={theme['color-primary-100']}
            style={styles.addUser}
          />
        </View>
        <View style={styles.userView}>
          <Text children="Francis Dixon" category="h3" />
          <Text
            marginLeft={16}
            children="francisdixon@company.com"
            category="c1"
            status="snow"
            marginBottom={18}
          />
          <View style={styles.social}>
            <NavigationAction
              size="medium"
              icon="twitter"
              backgroundColor="#0094EB"
              marginRight={16}
            />
            <NavigationAction
              size="medium"
              icon="gg"
              backgroundColor="#FF647C"
              marginRight={16}
            />
            <NavigationAction
              size="medium"
              icon="fb"
              backgroundColor="#6979F8"
            />
          </View>
        </View>
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryRight={
          <NavigationAction icon="chat_circle" status="primary" />
        }
        accessoryLeft={
          <NavigationAction status="primary" icon="dot_vertical" />
        }
      />
      <FlatList
        data={[1]}
        keyExtractor={(i, _) => _.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: bottom + 40}}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}
        ListFooterComponent={() => {
          return (
            <ViewPager
              shouldLoadComponent={index => index === activeIndex}
              selectedIndex={activeIndex}
              onSelect={setActiveIndex}>
              <Projects index={activeIndex} />
              <Projects index={activeIndex} />
              <Projects index={activeIndex} />
              <Projects index={activeIndex} />
            </ViewPager>
          );
        }}
      />
    </Container>
  );
});

export default Profile07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addUser: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userView: {
    alignItems: 'flex-end',
  },
});
