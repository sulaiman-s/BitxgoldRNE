import * as React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Avatar,
  Icon,
  Button,
} from '@ui-kitten/components';

import {Container, Text, NavigationAction} from 'components';
import Images from 'assets/images';

const Profile08 = React.memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction icon="shield" status="primary" />}
        accessoryRight={<NavigationAction icon="question" status="primary" />}
      />
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Avatar
            source={Images.avatar.avatar10}
            borderRadius={24}
            /* @ts-ignore */
            style={styles.avatar}
          />
          <View style={styles.nameView}>
            <Text
              children="Christy Mcdonald"
              category="h4"
              center
              marginTop={-3}
              marginRight={4}
            />
            <Icon pack="assets" name="shape_checked" />
          </View>
          <Text category="s2" status="platinum" marginTop={3}>
            Total expense:
            <Text category="s2" status="basic" children={' $12,680.99 '} />
          </Text>
          <Button
            children="Following"
            style={styles.follow}
            accessoryLeft={<Icon pack="assets" name="user_plus" />}
          />
          <Text status="basic" category="h6" marginBottom={16}>
            My Portfolios
            <Text children=" (128+)" status="primary" category="h6" />
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.viewPhoto}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {DATA_Profile08.map((i, _) => {
            return (
              <Image
                source={i.image}
                key={_}
                /* @ts-ignore */
                style={styles.photo}
              />
            );
          })}
        </ScrollView>
        <Text
          children="Information"
          category="h6"
          marginTop={32}
          marginBottom={16}
          marginLeft={40}
        />
        <Text category="body" status="snow" marginRight={24} marginLeft={40}>
          The finance world can be a tough place for a marketer. Creating
          inspiring finance content marketing that communicates your brand's
          messages, engages customers and keeps the compliance team happy...
        </Text>
      </ScrollView>
      <NavigationAction
        icon="arrow_down"
        status="primary"
        marginLeft={24}
        marginTop={34}
        style={{position: 'absolute', bottom: bottom + 16}}
      />
    </Container>
  );
});

export default Profile08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 120,
  },
  nameView: {
    flexDirection: 'row',
    alignItem: 'center',
  },
  checked: {
    backgroundColor: '#6979F8',
    borderRadium: 24,
    width: 32,
    height: 32,
    marginLeft: 12,
  },
  avatar: {
    borderRadius: 24,
    marginBottom: 12,
    width: 80,
    height: 80,
  },
  topNav: {
    marginHorizontal: 8,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    paddingLeft: 40,
    paddingTop: 12,
  },
  viewPhoto: {
    paddingHorizontal: 40,
  },
  follow: {
    width: 156,
    marginTop: 16,
    marginBottom: 32,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
});
const DATA_Profile08 = [
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
];
