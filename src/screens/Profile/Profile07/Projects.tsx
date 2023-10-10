import React from 'react';
import {View, FlatList, ImageBackground} from 'react-native';
import {StyleService, useStyleSheet} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';

import Text from 'components/Text';
import NavigationAction from 'components/NavigationAction';
import Images from 'assets/images';
interface Props {
  index: number;
}
const Projects = ({index}: Props) => {
  const {width} = useLayout();
  const styles = useStyleSheet(themedStyles);
  const wItem = (width - 63) / 2;
  return (
    <FlatList
      numColumns={2}
      data={DATA}
      style={styles.flatList}
      keyExtractor={(i, _) => i.id.toString()}
      renderItem={({item, index}) => (
        <View style={styles.item}>
          <ImageBackground
            source={item.image}
            /* @ts-ignore */
            imageStyle={styles.imgStyle}
            style={{width: wItem, height: wItem, alignItems: 'flex-end'}}>
            <NavigationAction icon="heart" />
          </ImageBackground>
          <Text
            children={item.title}
            marginTop={12}
            marginBottom={4}
            category="callout"
          />
          <Text
            children={`${item.liked} Likes`}
            category="subhead"
            status="snow"
          />
        </View>
      )}
    />
  );
};

export default Projects;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    marginRight: 15,
    marginBottom: 24,
  },
  flatList: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  imgStyle: {
    borderRadius: 12,
  },
});
const DATA = [
  {
    id: 0,
    image: Images.social.person01,
    title: 'Minimal ART NFT',
    liked: "12,048",
  },
  {
    id: 1,
    image: Images.social.person02,
    title: 'Minimal ART NFT',
    liked: "12,048",
  },
  {
    id: 2,
    image: Images.social.person03,
    title: 'Minimal ART NFT',
    liked: "12,048",
  },
  {
    id: 3,
    image: Images.social.person04,
    title: 'Minimal ART NFT',
    liked: "12,048",
  },
];
