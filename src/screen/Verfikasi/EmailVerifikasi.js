import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {fonts} from '../../utils/Fonts';
import {auth, db} from '../../config';
import {getAuth, sendEmailVerification} from 'firebase/auth';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {collection} from 'firebase/firestore';

const EmailVerifikasi = () => {
  const {currentUser} = auth;
  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };
  const navigation = useNavigation();
  const handlePressVerifikasi = async () => {
    await sendEmailVerification(currentUser).then(() => {
      toastMessage({
        type: 'success',
        title: 'Verifikasi Email',
        message: 'Email anda sudah terverifikasi',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'LOGIN'}],
      });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.contenHeader}>
        <Image
          source={require('../../assets/logo_app.png')}
          style={styles.logo}
        />
        <Text style={styles.titleLogin}>Email Verifikasi</Text>
      </View>
      <Text style={styles.deskTitle}>
        Silahkan verifikasi email terlebih dahulu
      </Text>
      <Text style={styles.titleEmail}>{currentUser.email}</Text>
      <TouchableOpacity style={styles.btnEmail} onPress={handlePressVerifikasi}>
        <Text style={styles.textContinue}>Kirim Email Verifikasi</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.deskTitle}>
          Jika anda tidak menerima email verifikasi
        </Text>
        <Text style={styles.deskTitle}>Coba cek di Spam Email</Text>
      </View>
    </View>
  );
};

export default EmailVerifikasi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  contenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    marginRight: Dimensions.get('window').height * 0.02,
  },
  titleLogin: {
    fontSize: Dimensions.get('window').height * 0.02,
    fontFamily: fonts.primary[600],
    color: '#000',
  },
  deskTitle: {
    fontSize: Dimensions.get('window').height * 0.02,
    fontFamily: fonts.primary[400],
    color: '#000',
    textAlign: 'center',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  titleEmail: {
    fontSize: Dimensions.get('window').height * 0.02,
    fontFamily: fonts.primary[400],
    color: '#000',
    textAlign: 'center',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  btnEmail: {
    backgroundColor: '#d32521',
    padding: Dimensions.get('window').width * 0.03,
    borderRadius: Dimensions.get('window').width * 0.01,
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').height * 0.04,
    marginTop: Dimensions.get('window').height * 0.04,
  },
  textContinue: {
    fontSize: Dimensions.get('window').height * 0.02,
    color: '#fff',
    fontFamily: fonts.primary[600],
  },
});
