import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {StyleService, useStyleSheet, Icon} from '@ui-kitten/components';

import Text from 'components/Text';
import useLayout from 'hooks/useLayout';
import Images from 'assets/images';

const Page05 = () => {
  const {width} = useLayout();
  const wItem = (width - 48) / 2;
  const size = 164 * (width / 375);
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      {DATA_Page.map((i, _) => (
        <TouchableOpacity key={_} style={styles.touch} activeOpacity={0.7}>
          <View style={[styles.item, {width: wItem, height: wItem}]}>
            <TouchableOpacity style={styles.contentHeart}>
              <Icon pack="assets" name="heart" style={styles.icon} />
            </TouchableOpacity>
            <Image
              source={i.image}
              style={[
                /* @ts-ignore */
                styles.img,
                {
                  width: size,
                  height: size,
                },
              ]}
            />
          </View>
          <Text children={i.title} category="callout" marginTop={12} />
          <Text children={i.price} category="subhead" status="platinum" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Page05;

const themedStyles = StyleService.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flex: 1,
    marginTop: 16,
  },
  touch: {
    marginBottom: 24,
  },
  img: {
    alignSelf: 'center',
  },
  icon: {
    tintColor: 'text-white-color',
    width: 12,
    height: 12,
  },
  item: {
    borderRadius: 8,
  },
  contentHeart: {
    backgroundColor: 'background-basic-color-5',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    position: 'absolute',
    zIndex: 100,
    top: 8,
    left: 8,
  },
});
const DATA_Page = [
  {
    id: 0,
    image: Images.social.person01,
    title: 'Minimal ART NFT',
    price: '123ETH',
  },
  {
    id: 1,
    image: Images.social.person02,
    title: 'Minimal ART NFT',
    price: '28ETH',
  },
  {
    id: 2,
    image: Images.social.person03,
    title: 'Minimal ART NFT',
    price: '45ETH',
  },
  {
    id: 3,
    image: Images.social.person04,
    title: 'Minimal ART NFT',
    price: '55ETH',
  },
];
