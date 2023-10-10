import React from 'react';
import {View} from 'react-native';
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Divider,
} from '@ui-kitten/components';
import {Text} from 'components';

export interface AccountProps {
  gender: string;
  birthday: string | number;
  location: string;
  name: string;
  phoneNumber: string;
}
interface ItemCardProps {
  item: AccountProps;
}
const AccountCard = ({item}: ItemCardProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout level="2" style={styles.layout}>
      <Text children="Account" marginTop={16} category="h6" />
      <View style={styles.flexRow}>
        <Text children="Gender" category="body" status="snow" marginTop={16} />
        <Text children={item.gender} category="callout" marginTop={16} />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.flexRow}>
        <Text children="Birthday" category="body" status="snow" />
        <Text children={item.birthday} category="callout" />
      </View>
      <Divider style={styles.divider} />
      <View style={styles.flexRow}>
        <Text children="Location" category="body" status="snow" />
        <Text children={item.location} category="callout" marginBottom={24} />
      </View>
    </Layout>
  );
};

export default AccountCard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  layout: {
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 24,
  },
  divider: {
    backgroundColor: 'background-basic-color-3',
    marginVertical: 12,
  },
});
