import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import {fonts} from '../../utils/Fonts';
import {useDispatch} from 'react-redux';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../config';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const ResetPassword = () => {
  const [ubahData, setUbahData] = useState({
    email: '',
  });

  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const resetPassword = async email => {
    dispatch({
      type: 'RESET_PASSWORD',
      payload: {ubahData},
    });
    await sendPasswordResetEmail(auth, email).then(res => {
      console.log(res);
      toastMessage({
        type: 'success',
        title: 'Berhasil Terkirim',
        message: 'Silahkan cek email anda untuk reset kata sandi',
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
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack('')}>
        <AntDesign name="arrowleft" size={20} color="#000" />
        <Text style={styles.txtHeader}>Kembali</Text>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
        }}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: fonts.primary[600],
              color: '#000',
              fontSize: 15,
            }}>
            Setel Ulang Kata Sandi
          </Text>
          <Text
            style={{
              fontFamily: fonts.primary[400],
              color: '#000',
              textAlign: 'center',
              marginHorizontal: 20,
            }}>
            Jika berhasil silahkan cek email anda di bagian spam
          </Text>
          <Image
            source={require('../../assets/undraw_Forgot_password_re_hxwm.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View>
          <TextInput
            label={'Email'}
            style={styles.inputan}
            placeholder="example@mail.com"
            value={ubahData.email}
            mode="outlined"
            onChangeText={text => setUbahData({...ubahData, email: text})}
            activeOutlineColor="#d32521"
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => resetPassword(ubahData.email)}
            disabled={!ubahData.email}>
            <Text style={styles.textContinue}>Kirim Link</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: (Dimensions.get('window').width * 2) / 50,
    paddingVertical: (Dimensions.get('window').width * 2) / 80,
  },
  buttonClose: {
    backgroundColor: '#d32521',
    padding: Dimensions.get('window').width * 0.03,
    borderRadius: Dimensions.get('window').width * 0.01,
    alignItems: 'center',
    marginVertical: 12,
    marginBottom: Dimensions.get('window').height * 0.04,
  },
  image: {
    height: PAGE_HEIGHT * 0.4,
    aspectRatio: 1,
    width: (Dimensions.get('window').width * 5) / 10,
  },
  inputan: {
    paddingHorizontal: Dimensions.get('window').height * 0.02,
    backgroundColor: '#fff',
    // backgroundColor: "transparent",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtHeader: {
    fontFamily: fonts.primary[600],
    color: '#000',
    marginLeft: 12,
  },
  textContinue: {
    fontFamily: fonts.primary[600],
    color: '#fff',
  },
});
