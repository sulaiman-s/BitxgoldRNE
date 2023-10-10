import React, {memo} from 'react';
import {View} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from '@ui-kitten/components';

import Text from 'components/Text';
import ProgressBar from 'components/ProgressBar';

const CardWeight = () => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout
      level="5"
      style={{
        borderRadius: 12,
        marginHorizontal: 24,
        padding: 24,
      }}>
      <View style={styles.flexRow}>
        <Text children="Goal Weight: 60Kg" category="h6" status="white" />
        <Icon
          pack="assets"
          name="pencil"
          style={{
            tintColor: theme['text-white-color'],
            width: 16,
            height: 16,
            marginTop: 4,
          }}
        />
      </View>
      <Text
        children="You’ve gained 3Kg"
        marginTop={8}
        category="subhead"
        status="grey"
        marginBottom={32}
      />
      <ProgressBar
        progress={4 / 10}
        styleBar={styles.progressBar}
        style={styles.progressBar}
        containColor={`${theme['color-basic-1000']}50`}
        progressColor={theme['color-basic-1000']}
      />
      <View style={[styles.flexRow, {marginTop: 8}]}>
        <Text children="50Kg" category="subhead" status="snow" />
        <Text children="60Kg" category="subhead" status="white" />
      </View>
    </Layout>
  );
};

export default CardWeight;

const themedStyles = StyleService.create({
  progressBar: {
    height: 8,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
