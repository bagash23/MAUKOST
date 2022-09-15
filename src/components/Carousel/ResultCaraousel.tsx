import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Carousel from './Carausel';

const images = [
  'https://instagram.fcgk18-1.fna.fbcdn.net/v/t51.2885-15/300416299_734561197630052_8206815333869829253_n.webp?stp=dst-jpg_e35_s480x480&cb=9ad74b5e-88ad7ee8&_nc_ht=instagram.fcgk18-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=B9Fq75LtGwwAX8E92qK&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkxMDY2NjQyMzM1OTgzNzMzMg%3D%3D.2-ccb7-5&oh=00_AT_rl_LUNxH1Ug3BdpdaWysdb6xrI_uQ4Y8sUf7p5B7LlA&oe=6314B18C&_nc_sid=30a2ef',
  'https://instagram.fcgk18-2.fna.fbcdn.net/v/t51.2885-15/301166819_584475543330210_7837092877839199495_n.webp?stp=dst-jpg_e35_s240x240&cb=9ad74b5e-88ad7ee8&_nc_ht=instagram.fcgk18-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=IiKOlLtLcJsAX_VzdyD&tn=csWFhbqgvuaU1lFn&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkxMDY2NjIzNDMwNTc4MzI4MA%3D%3D.2-ccb7-5&oh=00_AT8ie1mpk3iF1RK3J-ji1YnXUtS5Pu1uRZ79lon0gRIABA&oe=6313BF40&_nc_sid=30a2ef',
  'https://instagram.fcgk18-1.fna.fbcdn.net/v/t51.2885-15/300608172_619957482848307_5896170784360396129_n.webp?stp=dst-jpg_e35_s480x480&cb=9ad74b5e-88ad7ee8&_nc_ht=instagram.fcgk18-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=haKAc_q2CIsAX8hES8v&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjkxMDY2NTc2MjY4MTM5NDQ1Mw%3D%3D.2-ccb7-5&oh=00_AT9YWqDTrGF1dyRqWaYxRvCebqkLvQMusxcsWO5g9tnEPg&oe=6315228C&_nc_sid=30a2ef',
];

const ResultCaraosel: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <Carousel images={images} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
});

export default ResultCaraosel;
