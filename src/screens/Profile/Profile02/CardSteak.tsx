import React from 'react';
import {View} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Divider,
} from '@ui-kitten/components';

import Text from 'components/Text';

const CardSteak = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={styles.container} level="3">
      <View style={[styles.flexRow, {marginVertical: 24}]}>
        <Text children="Steaks" category="h5" />
        <Icon pack="assets" name="question" />
      </View>
      <Divider style={styles.divider} />
      <View style={[styles.flexRow]}>
        <View style={styles.btm}>
          <Text center children="1 day" category="h5" />
          <Text
            children="Current Steak"
            marginTop={4}
            category="subhead"
            status="snow"
          />
        </View>
        <Layout style={{width: 1, backgroundColor: theme['color-basic-800']}} />
        <View style={styles.btm}>
          <Text center children="1 day" category="h5" />
          <Text
            children="Longest Steak"
            marginTop={4}
            category="subhead"
            status="snow"
          />
        </View>
      </View>
    </Layout>
  );
};

export default CardSteak;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    borderRadius: 12,
    marginTop: 16,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  btm: {
    marginVertical: 16,
    marginHorizontal: 24,
  },
  divider: {
    backgroundColor: 'color-basic-800',
  },
});
