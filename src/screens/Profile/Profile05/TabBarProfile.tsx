import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {useTheme, Layout} from '@ui-kitten/components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import Text from 'components/Text';

interface Props {
  tabs: string[];
  level?: string;
  style?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBarProfile = ({
  style,
  activeIndex,
  onChange,
  tabs,
  level = '2',
}: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * activeIndex;
  }, [activeIndex, transX, widthItem]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 200,
            damping: 15,
          }),
        },
      ],
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: theme['color-primary-100'],
    };
  });

  return (
    <Layout style={[styles.container, style]} level={level}>
      {tabs.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            activeOpacity={0.7}
            onPress={() => onChange(index)}>
            <Text
              capitalize
              category="callout"
              marginTop={4}
              status={activeIndex === index ? 'basic' : 'platinum'}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          {width: `${100 / tabs.length}%`},
        ]}
        onLayout={({nativeEvent}) => setWidthItem(nativeEvent.layout.width)}
      />
    </Layout>
  );
};

export default TabBarProfile;

const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: 'row',
    overflow: 'hidden',
    alignSelf: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: '#3E4C59',
  },
  boxAni: {
    height: 2,
    position: 'absolute',
    bottom: 0,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
