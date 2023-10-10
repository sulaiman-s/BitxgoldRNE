import React, {memo} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {StyleService, useStyleSheet, Layout} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';

import Images from 'assets/images';
import {NavigationAction} from 'components';

const BottomBar = memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout style={[styles.container, {paddingBottom: bottom + 4}]} level="5">
      <NavigationAction icon="house" status="transparent" size="large" />
      <TouchableOpacity activeOpacity={0.7}>
        <Image
          source={Images.logo}
          /* @ts-ignore */
          style={styles.logo}
        />
      </TouchableOpacity>
      <NavigationAction icon="user" size="large" status="transparent" />
    </Layout>
  );
});

export default BottomBar;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 16,
  },
  logo: {
    height: 20,
    width: 24,
    marginTop: 8,
  },
});
