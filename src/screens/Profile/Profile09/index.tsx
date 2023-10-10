import * as React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
  Avatar,
  Button,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from 'components';
import Images from 'assets/images';

const Profile09 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const widthAlbum = 240 * (width / 375);
  const heightAlbum = 135 * (height / 812);

  const DATA = [
    {
      backgroundColor: '#C06363',
      icon: 'medal',
    },
    {
      backgroundColor: '#E5CABF',
      icon: 'angular',
    },
    {
      backgroundColor: '#FFDE70',
      icon: 'bandaids',
    },
    {
      backgroundColor: '#CE8ABC',
      icon: 'bird',
    },
    {
      backgroundColor: '#5784E8',
      icon: 'cake',
    },
  ];

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="menu" status="primary" />}
        accessoryRight={
          <NavigationAction icon="notification" status="primary" />
        }
      />

      <Content contentContainerStyle={styles.content}>
        <HStack mh={32}>
          <VStack>
            <Text category="h4" marginBottom={8}>
              Christy Mcdonald
            </Text>
            <Text category="subhead" status="placeholder" marginBottom={12}>
              Doctor Dentis
            </Text>
            <HStack justify="flex-start" itemsCenter>
              <Icon pack="assets" name="location" style={styles.icon16} />
              <Text category="subhead" marginLeft={4}>
                1003 Sleepy Lake Swale
              </Text>
            </HStack>
          </VStack>
          <VStack>
            <Avatar
              source={Images.avatar.avatar10}
              //@ts-ignore
              style={styles.avatar}
            />
            <Layout level="3" style={styles.heart}>
              <Icon pack="assets" name="heart" style={styles.iconHeart} />
            </Layout>
          </VStack>
        </HStack>
        <HStack mh={32} mv={24}>
          <Button
            style={styles.button}
            children={'Meet Now'}
            accessoryLeft={<Icon pack="assets" name="video_camera" />}
          />
          <NavigationAction
            icon="chat_dot"
            size="giant"
            backgroundColor={'#FBF0EA'}
            status="dark"
          />
          <NavigationAction
            icon="headphones"
            size="giant"
            backgroundColor={'#E5CABF'}
            status="dark"
          />
        </HStack>
        <Text category="h6" marginLeft={32} marginBottom={16}>
          My Appointment
        </Text>
        <HStack level="10" mh={32} padding={16} border={16} itemsCenter>
          <VStack>
            <Text category="callout" marginBottom={8}>
              Interview Maria Lana
            </Text>
            <Text category="body" status="platinum">
              8:00 - 9:00 Jun 11
            </Text>
          </VStack>
          <Avatar size="large" source={Images.avatar.avatar05} />
        </HStack>
        <HStack mh={32} mt={32} mb={16}>
          <Text category="h6">Achievement (18)</Text>
          <Text category="callout" status="primary">
            See All
          </Text>
        </HStack>
        <Content horizontal contentContainerStyle={styles.archievementContent}>
          {DATA.map((item, i) => {
            return (
              <VStack key={i} mr={16}>
                <Icon pack="assets" name={item.icon} style={styles.iconShape} />
                <Image
                  source={Images.shape}
                  style={{tintColor: item.backgroundColor, zIndex: -10}}
                />
              </VStack>
            );
          })}
        </Content>
        <HStack mh={32} mt={32} mb={16}>
          <Text category="h6">Videos & Photos</Text>
          <Text category="callout" status="primary">
            See All
          </Text>
        </HStack>
        <Content horizontal contentContainerStyle={styles.videosContent}>
          {DATA_Album.map((item, i) => {
            return (
              <VStack key={i} mr={16}>
                <Image
                  source={item.images[0]}
                  style={{width: widthAlbum, height: heightAlbum}}
                  borderRadius={8}
                />
                <Layout level="5" style={styles.countImage}>
                  <Icon pack="assets" name="image" style={styles.imageIcon} />
                  <Text category="callout" status="white" marginLeft={4}>
                    {item.images.length}
                  </Text>
                </Layout>
              </VStack>
            );
          })}
        </Content>
      </Content>
    </Container>
  );
});

export default Profile09;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 40,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 24,
  },
  button: {
    flex: 1,
  },
  heart: {
    width: 32,
    height: 32,
    borderRadius: 99,
    position: 'absolute',
    backgroundColor: '#C06363',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: -10,
  },
  iconHeart: {
    width: 16,
    height: 16,
    tintColor: '#FFF',
  },
  icon16: {
    width: 16,
    height: 16,
  },
  iconShape: {
    width: 24,
    height: 24,
    position: 'absolute',
    zIndex: 1000,
    tintColor: '#FFF',
    top: 20,
    left: 20,
  },
  archievementContent: {
    marginHorizontal: 32,
  },
  videosContent: {
    marginHorizontal: 32,
    marginRight: 40,
  },
  imageIcon: {
    width: 16,
    height: 16,
    tintColor: 'text-white-color',
  },
  countImage: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    bottom: 8,
    right: 8,
  },
});
const DATA_Album = [
  {
    id: 0,
    images: [
      Images.social.photo01,
      Images.social.photo02,
      Images.social.photo03,
      Images.social.photo04,
    ],
  },
  {
    id: 1,
    images: [
      Images.social.photo05,
      Images.social.photo02,
      Images.social.photo03,
      Images.social.photo04,
    ],
  },
  {
    id: 2,
    images: [
      Images.social.photo03,
      Images.social.photo02,
      Images.social.photo03,
      Images.social.photo04,
    ],
  },
];
