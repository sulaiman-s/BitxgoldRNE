import * as React from 'react';
import {View, TouchableOpacity, ColorValue} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
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
import useToggle from 'hooks/useToggle';

interface Props {
  id: number;
  title: string;
  icon: string;
  color: ColorValue | string;
}
interface ItemProps {
  item: Props;
  onPress?(): void;
}
const Profile01 = React.memo(() => {
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [isPremium] = useToggle(true);
  const RenderItem = React.useCallback(({item, onPress}: ItemProps) => {
    return (
      <TouchableOpacity activeOpacity={0.7}>
        <Layout style={styles.item} level="2">
          <View style={styles.itemText}>
            <View style={[styles.icon, {backgroundColor: item.color}]}>
              <Icon pack="assets" name={item.icon} style={styles.titColor} />
            </View>
            <Text
              marginTop={23}
              marginLeft={8}
              children={item.title}
              category="callout"
            />
          </View>
          <Icon pack="assets" name={'arrow_right'} style={[styles.titColor]} />
        </Layout>
      </TouchableOpacity>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <Layout style={[styles.layout, {paddingTop: top + 8}]} level="8">
        <HStack itemsCenter>
          <NavigationAction status="primary" icon="arrow_left" size="giant" />
          <Text category="callout" status="primary" marginRight={16}>
            {'Update'}
          </Text>
        </HStack>
        <VStack alignSelfCenter>
          <Avatar
            source={Images.avatar.avatar10}
            //@ts-ignore
            style={styles.avatar}
          />
          {isPremium && (
            <Layout level="5" style={styles.crown}>
              <Icon pack="assets" name="crown" style={styles.icCrown} />
            </Layout>
          )}
        </VStack>
        <Text category="h5" center marginTop={16}>
          Philip Schmidt
        </Text>
        <Text category="callout" center status="platinum" marginTop={12}>
          Total expense: $12,680.99
        </Text>
        <Button
          style={styles.buttonUpgrade}
          children={'Upgrade Premium'}
          accessoryLeft={<Icon pack="assets" name="crown" />}
        />
      </Layout>
      <Content contentContainerStyle={styles.content}>
        {DATA_Profile01.map((item, index) => (
          <RenderItem item={item} key={index} />
        ))}
      </Content>
      <Text
        category="callout"
        status="platinum"
        uppercase
        center
        onPress={goBack}
        marginBottom={8}>
        Logout
      </Text>
    </Container>
  );
});

export default Profile01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  layout: {
    height: '47%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 32,
  },
  crown: {
    position: 'absolute',
    right: -4,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: 'text-white-color',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icCrown: {
    width: 16,
    height: 16,
  },
  buttonUpgrade: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingRight: 16,
    marginHorizontal: 24,
  },
  titColor: {
    tintColor: 'text-white-color',
  },
  icon: {
    borderRadius: 16,
    padding: 12,
    margin: 10,
  },
  itemText: {
    flexDirection: 'row',
  },
  content: {
    marginTop: 24,
  },
});
const DATA_Profile01 = [
  {
    id: 0,
    icon: 'target',
    title: 'Goal Settings',
    color: '#4B9BAE',
  },
  {
    id: 1,
    icon: 'global',
    title: 'Language',
    color: '#949398',
  },
  {
    id: 2,
    icon: 'moon',
    title: 'Darkmode',
    color: '#215190',
  },
  {
    id: 3,
    icon: 'switch',
    title: 'Sync Account',
    color: '#C06363',
  },
];
