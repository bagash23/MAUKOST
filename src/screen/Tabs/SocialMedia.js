import {StyleSheet, View} from 'react-native';
import React from 'react';
import BuatStory from '../../components/StoryMedia/BuatStory';
import TemanSekitar from '../../components/StoryMedia/TemanSekitar';

const SocialMedia = () => {
  return (
    <View style={styles.container}>
      <BuatStory />
      <TemanSekitar />
    </View>
  );
};

export default SocialMedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
