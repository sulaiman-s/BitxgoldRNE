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
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from 'components';
import FBCollage from 'react-native-fb-collage';

interface BookListProps {
  title: string;
  list_book: {
    name: string;
    image: any;
  }[];
}

interface TabBookProps {
  data: BookListProps[];
}

const TabBook = React.memo(({data}: TabBookProps) => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <VStack style={[styles.container, {width: width}]}>
      {data &&
        data.map((item, i) => {
          const list = item.list_book;
          return (
            <VStack key={i} mt={16} mh={16} level="3" padding={24} border={8}>
              <Text category="h6" marginBottom={4}>
                {item.title}
              </Text>
              <Text category="subhead" status="placeholder" marginBottom={16}>
                {item.list_book.length} books
              </Text>
              {list.length <= 4 ? (
                <HStack>
                  {list.map((book, index) => {
                    return (
                      <Image
                        source={book.image}
                        key={index}
                        //@ts-ignore
                        style={styles.book}
                      />
                    );
                  })}
                </HStack>
              ) : (
                <HStack>
                  <Image
                    source={list[1].image}
                    /* @ts-ignore */
                    style={styles.book}
                  />
                  <Image
                    source={list[2].image}
                    /* @ts-ignore */
                    style={styles.book}
                  />
                  <Image
                    source={list[3].image}
                    /* @ts-ignore */
                    style={styles.book}
                  />
                  <VStack level="5" style={styles.book} justify="center">
                    <Text center status="white" category="h6">
                      +{list.length - 3}
                    </Text>
                  </VStack>
                </HStack>
              )}
            </VStack>
          );
        })}
    </VStack>
  );
});

export default TabBook;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  book: {
    width: 64,
    height: 85,
    borderRadius: 8,
  },
});
