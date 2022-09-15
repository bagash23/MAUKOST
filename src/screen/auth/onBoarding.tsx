import React, {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import Page, {PAGE_WIDTH} from '../../components/onBoarding/handlePage';
import {BACKGROUND_COLOR, PAGES} from '../../components/onBoarding/ItemHandle';
import Dot from '../../components/onBoarding/Dot';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../utils/Fonts';

export default function onBoarding({navigation}) {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const scrollRef = useAnimatedRef<ScrollView>();

  const onIconPress = useCallback(() => {
    if (activeIndex.value === PAGES.length - 1) return;
    scrollRef.current?.scrollTo({x: PAGE_WIDTH * (activeIndex.value + 1)});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Animated.ScrollView
        ref={scrollRef as any}
        style={{flex: 1}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        {PAGES.map((page, index) => (
          <Page
            key={index.toString()}
            page={page}
            translateX={translateX}
            index={index}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.footer}>
        {/* Paginator */}
        <View style={[styles.fillCenter, {flexDirection: 'row'}]}>
          {PAGES.map((_, index) => {
            return (
              <Dot
                key={index.toString()}
                index={index}
                activeDotIndex={activeIndex}
              />
            );
          })}
        </View>
        {/* Text Container */}
        <TouchableOpacity
          style={styles.fillCenter}
          onPress={() => navigation.navigate('AWAL')}>
          <Text style={styles.text}>Mulai</Text>
        </TouchableOpacity>
        {/* iconContainer */}
        <TouchableOpacity style={[styles.fillCenter]}>
          <AntDesign
            name="arrowright"
            size={24}
            color="black"
            onPress={onIconPress}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    height: 50,
    marginBottom: 50,
    flexDirection: 'row',
  },
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    // textTransform: 'uppercase',
    letterSpacing: 1.7,
    fontWeight: '500',
    fontFamily: fonts.primary[600],
    color: '#000',
  },
});
