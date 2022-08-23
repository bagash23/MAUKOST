import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/Fonts';

const Tentang = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Tentang Kami</Text>
      <View style={styles.setImage}>
        <Image
          source={require('../../assets/logo_app.png')}
          style={styles.logo}
        />
        <Text style={styles.logoText}>MAUKOST</Text>
      </View>
      <View style={styles.bodyParaf}>
        <Text style={styles.text}>
          MAUKOST adalah aplikasi yang dapat digunakan untuk memesan kontrakan
          atau kamar. yang didirikan pada tahun 2022 dan dikembangkan oleh tim
          MAUKOST. Aplikasi ini dapat membantu para pemilik kost atau pemilik
          kamar untuk mengelola kost atau kamar yang mereka miliki.
        </Text>
        <Text style={styles.text2}>
          Aplikasi ini dikembangkan oleh tim MAUKOST.
        </Text>
      </View>
    </View>
  );
};

export default Tentang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textTitle: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontFamily: fonts.primary[600],
    color: '#000',
    textAlign: 'center',
    marginVertical: Dimensions.get('window').width * 0.05,
  },
  logo: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
  },
  setImage: {
    alignItems: 'center',
    marginVertical: Dimensions.get('window').width * 0.05,
  },
  logoText: {
    fontSize: Dimensions.get('window').width * 0.05,
    fontFamily: fonts.primary[600],
    color: '#000',
    marginTop: Dimensions.get('window').width * 0.05,
  },
  bodyParaf: {
    marginVertical: Dimensions.get('window').height * 0.05,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    alignItems: 'center',
  },
  text: {
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: fonts.primary[400],
    color: '#000',
    textAlign: 'center',
  },
  text2: {
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: fonts.primary[600],
    color: '#000',
    marginTop: Dimensions.get('window').height * 0.05,
  },
});
