import * as React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
  ViewPager,
  Divider,
} from '@ui-kitten/components';

import {Container, Content, Text, NavigationAction} from 'components';
import Images from 'assets/images';
import Page05 from './Page05';
import CardBalance from './CardBalance';
import TabBarProfile from './TabBarProfile';

const Profile05 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [dataBalance, setDataBalance] = React.useState(DATA);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={
          <NavigationAction icon="arrow_left" status="primary" size="giant" />
        }
        title="Shop Profile"
        accessoryRight={
          <NavigationAction icon="shopping_bag" status="primary" size="giant" />
        }
      />
      <Content style={{paddingTop: 6}}>
        <CardBalance item={dataBalance} onPress={goBack} />
        <Layout style={styles.cardHis} level="2">
          <TouchableOpacity style={styles.flexRow} activeOpacity={0.7}>
            <Text category="h6" children="Order History" />
            <Icon pack="assets" name="arrow_right" style={styles.iconArrow} />
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <View style={styles.item}>
            {DATA_item.map((i, _) => (
              <TouchableOpacity
                style={{alignItems: 'center'}}
                activeOpacity={0.64}
                key={_}>
                <Icon
                  pack="assets"
                  name={i.icon}
                  style={{tintColor: theme['text-primary-color']}}
                />
                <Text
                  children={i.title}
                  status="snow"
                  category="c1"
                  marginTop={14}
                />
              </TouchableOpacity>
            ))}
          </View>
        </Layout>
        <Layout
          level="2"
          style={{borderRadius: 24, paddingBottom: bottom + 40}}>
          <TabBarProfile
            tabs={['Wishlist', 'Recent View']}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
            style={styles.tabBar}
          />
          <ViewPager
            shouldLoadComponent={index => index === activeIndex}
            selectedIndex={activeIndex}
            onSelect={setActiveIndex}>
            <Page05 />
            <Page05 />
          </ViewPager>
        </Layout>
      </Content>
    </Container>
  );
});

export default Profile05;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    paddingHorizontal: 4,
  },
  cardHis: {
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  tabBar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconArrow: {
    tintColor: 'text-snow-color',
    width: 16,
    height: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  divider: {
    backgroundColor: 'background-basic-color-8',
    marginTop: 16,
    marginBottom: 24,
  },
});
const DATA = {
  id: 0,
  balance: '$12,680.99',
  name: 'Myrtle Burns',
  avatar: Images.avatar.avatar10,
};
const DATA_item = [
  {
    id: 0,
    icon: 'credit_card',
    title: 'Confirm',
  },
  {
    id: 1,
    icon: 'insurance',
    title: 'Waiting',
  },
  {
    id: 2,
    icon: 'truck',
    title: 'Delivery',
  },
  {
    id: 3,
    icon: 'star',
    title: 'Rating',
  },
];
