import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {PageInterface} from './ItemHandle';
import {fonts} from '../../utils/Fonts';

interface PageProps {
  page: PageInterface;
  translateX: Animated.SharedValue<number>;
  index: number;
}

const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');

const handlePage: React.FC<PageProps> = ({page, translateX, index}) => {
  const inputRange = [
    (index - 1) * PAGE_WIDTH,
    index * PAGE_WIDTH,
    (index + 1) * PAGE_WIDTH,
  ];

  const rCircleStyle = useAnimatedStyle(() => {
    // if index === 0
    // [ -PAGE_WIDTH, 0, PAGE_WIDTH]
    // [ 0, 1, 0]

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 0.1, 0],
      //   Extrapolate.CLAMP,
      Extrapolate.EXTEND,
    );

    return {
      transform: [{scale}],
    };
  });

  const rImageStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      inputRange,
      [0, 0, 0.1],
      //   Extrapolate.CLAMP,
      Extrapolate.EXTEND,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [0.5, 1, 0.5],
      //   Extrapolate.CLAMP,
      Extrapolate.EXTEND,
    );

    return {
      opacity,
      transform: [
        {
          rotate: `${progress * Math.PI}rad`,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, rCircleStyle]} />
        <Animated.Image
          source={page.source}
          style={[styles.image, rImageStyle]}
          resizeMode={'contain'}
        />
      </View>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

const CIRCLE_WIDTH = PAGE_WIDTH * 0.7;

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    backgroundColor: '#fff',
  },
  circleContainer: {
    width: CIRCLE_WIDTH,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
  image: {
    height: PAGE_HEIGHT * 0.5,
    aspectRatio: 1,
    position: 'absolute',
    width: (Dimensions.get('window').width * 5) / 5,
  },
  circle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: CIRCLE_WIDTH / 2,
  },
  title: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 15,
    color: '#d32521',
    fontFamily: fonts.primary[600],
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#8D8DAA',
    fontFamily: fonts.primary[400],
  },
});

export {PAGE_WIDTH};

export default handlePage;
