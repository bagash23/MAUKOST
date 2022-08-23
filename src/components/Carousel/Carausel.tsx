import React, {useRef, useState} from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import useInterval from './useInterval';

type Props = {
  images: string[];
};

const MAX_WIDTH = Dimensions.get('screen').width;

const Carousel: React.FC<Props> = ({images}) => {
  const animation = useRef(new Animated.Value(0));
  const [currentImage, setCurrentImage] = useState(0);
  useInterval(() => handleAnimation(), 5000);

  const handleAnimation = () => {
    let newCurrentImage = currentImage + 1;
    if (newCurrentImage >= images.length) {
      newCurrentImage = 0;
    }
    Animated.spring(animation.current, {
      toValue: -(MAX_WIDTH * newCurrentImage),
      useNativeDriver: true,
    }).start();

    setCurrentImage(newCurrentImage);
  };
  return (
    <React.Fragment>
      <View
        style={{
          backgroundColor: '#fff',
        }}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{translateX: animation.current}],
            },
          ]}>
          {images.map(image => (
            <Image key={image} source={{uri: image}} style={styles.image} />
          ))}
        </Animated.View>
        <View style={styles.indicatorContainer}>
          {images.map((image, index) => (
            <View
              key={`${image}_${index}`}
              style={[
                styles.indicator,
                index === currentImage ? styles.activeIndicator : undefined,
              ]}
            />
          ))}
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: 200,
    width: Dimensions.get('screen').width,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  indicatorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: MAX_WIDTH,
    bottom: 10,
    zIndex: 2,
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderColor: '#fff',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
});

export default Carousel;
