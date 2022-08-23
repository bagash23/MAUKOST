import {
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {fonts} from '../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';

const Awal = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/oke.png')}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.headerLogo}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('../../assets/logo_app.png')}
            style={styles.logo}
          />
          {/* <Text style={styles.textLogo}>MAUKOST</Text> */}
          <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
            <Text style={styles.textLogo}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btn}>
        <View
          style={{
            marginVertical: (Dimensions.get('window').width * 2) / 10,
          }}>
          <Text
            style={{
              fontFamily: fonts.primary[600],
              color: '#fff',
              textAlign: 'center',
              fontSize: (Dimensions.get('window').width * 2) / 30,
            }}>
            Kost biasa samapai{'\n'}kost yang luar biasa
          </Text>
          <Text
            style={{
              fontFamily: fonts.primary[400],
              color: '#fff',
              textAlign: 'center',
            }}>
            Banyak pilihan kost yang membuatmu terpesona untuk menyewanya
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('SIGNUP')}>
          <Text style={styles.button}>Mulai</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Awal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  headerLogo: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.02,
    zIndex: 2,
  },
  logo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
  },
  textLogo: {
    fontSize: (Dimensions.get('window').width * 2) / 50,
    fontFamily: fonts.primary[600],
    color: '#fff',
    // marginLeft: Dimensions.get('window').width * 0.02,
  },
  deskripsi: {
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: fonts.primary[400],
    marginTop: Dimensions.get('window').height * 0.03,
  },
  btn: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').height * 0.03,
    zIndex: 2,
  },
  btnPrimary: {
    backgroundColor: '#d32521',
    padding: Dimensions.get('window').width * 0.03,
    borderRadius: Dimensions.get('window').width * 0.01,
    alignItems: 'center',
  },
  button: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: fonts.primary[600],
    color: '#fff',
  },
  bayangan: {
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0, 0.4)',
    // zIndex: 3,
    flex: 1,
    position: 'absolute',
    top: 0,
    height: Dimensions.get('window').height,
    opacity: 0.4,
  },
  bg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 1,
  },
});
