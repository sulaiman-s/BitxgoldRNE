import React, {memo} from 'react';
import {View, Image} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
  Icon,
} from '@ui-kitten/components';
import Text from 'components/Text';

const Header = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View>
      <Text center category="h4" marginTop={8} marginBottom={4}>
        Francis Dixon
      </Text>
      <Text center category="footnote" status="snow" uppercase>
        francisdixon@company.com
      </Text>
      <Layout level="2" style={[styles.flexRow, styles.layoutItem]}>
        <View style={styles.item}>
          <Text children="348" center category="h4" />
          <Text children="Following" center category="c1" status="snow" />
        </View>
        <Layout style={{backgroundColor: theme['color-basic-900'], width: 1}} />
        <View style={styles.item}>
          <Text children="195" center category="h4" />
          <Text children="Followers" center category="c1" status="snow" />
        </View>
        <Layout style={{backgroundColor: theme['color-basic-900'], width: 1}} />
        <View style={styles.item}>
          <Text children="875" center category="h4" />
          <Text children="Loves" center category="c1" status="snow" />
        </View>
      </Layout>
      <View style={styles.viewButton}>
        <Button
          style={styles.btn}
          status="transparent-primary"
          children="Message"
          accessoryLeft={<Icon pack="assets" name="message" />}
        />
        <Button
          style={styles.btnFollow}
          children="Following"
          accessoryLeft={<Icon pack="assets" name="menu" />}
        />
      </View>
    </View>
  );
};

export default Header;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    marginVertical: 22,
  },
  layoutItem: {
    borderRadius: 12,
    paddingHorizontal: 32,
    marginTop: 16,
    marginHorizontal: 24,
  },
  viewButton: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  btnFollow: {
    flex: 1,
    marginLeft: 15,
  },
  btn: {
    flex: 1,
  },
});
