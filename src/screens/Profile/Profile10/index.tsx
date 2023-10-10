import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from 'components';
import Header from './Header';
import Images from 'assets/images';
import BottomBar from './BottomBar';
import CoursesCard from './CoursesCard';

const Profile10 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <Header />
      <Content contentContainerStyle={styles.content}>
        <VStack itemsCenter>
          <Image source={Images.profile_girl} />
        </VStack>
        <HStack>
          {DATA.map((item, i) => {
            return (
              <VStack key={i}>
                <Icon pack="assets" name={item.icon} style={styles.iconShape} />
                <Image
                  source={Images.shape}
                  style={{tintColor: item.backgroundColor, zIndex: -10}}
                />
              </VStack>
            );
          })}
        </HStack>
        <HStack mt={32} mb={16}>
          <Text category="h4">My Courses</Text>
          <NavigationAction icon="arrow_right" status="primary" />
        </HStack>
        {DATA_COURESE.map((item, i) => {
          return <CoursesCard data={item} key={i} />;
        })}
      </Content>
      <BottomBar />
    </Container>
  );
});

export default Profile10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  messager: {
    position: 'absolute',
    top: 12,
    right: 0,
    paddingHorizontal: 8,
    borderRadius: 8,
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
});
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
];
const DATA_COURESE = [
  {
    title: 'How to make UI Mobile App',
    progress: 8,
    total: 13,
    image: Images.social.photo02,
  },
  {
    title: 'Better Maketing Design?',
    progress: 8,
    total: 13,
    image: Images.social.photo03,
  },
];
