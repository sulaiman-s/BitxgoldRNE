import React, {memo} from 'react';
import {View, TouchableOpacity, ImageSourcePropType} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Avatar,
  Icon,
} from '@ui-kitten/components';
import Text from 'components/Text';

interface Props {
  id: number;
  avatar: ImageSourcePropType;
  balance: string | number;
  name: string;
}
interface ItemProps {
  item: Props;
  onPress?(): void;
}
const CardBalance = ({item, onPress}: ItemProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: theme['background-basic-color-8'],
          paddingHorizontal: 16,
        },
        styles.container,
      ]}>
      <Layout
        level="8"
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 14,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <Avatar source={item.avatar} size="giant" />
          <View>
            <Text marginLeft={12} children={item.name} category="h4" />
            <Text
              marginLeft={12}
              children={`Balance: ${item.balance}`}
              category="subhead"
              status="snow"
            />
          </View>
        </View>
        <Icon
          pack="assets"
          name="caret_right"
          style={{
            marginTop: 12,
            width: 16,
            height: 16,
            tintColor: theme['text-primary-color'],
          }}
        />
      </Layout>
      <Button
        children="Become Gold Member"
        style={styles.button}
        accessoryLeft={<Icon pack="assets" name="crown" />}
      />
    </TouchableOpacity>
  );
};

export default CardBalance;

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
  button: {
    marginVertical: 16,
  },
});
