import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Toast from 'react-native-toast-message';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {auth, db, forgetPassword, signIn} from '../../config';
import {TextInput} from 'react-native-paper';
import {fonts} from '../../utils/Fonts';
import {StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {sendPasswordResetEmail} from 'firebase/auth';

const Login = () => {
  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const navigation = useNavigation();
  const [openFoget, setOpenForget] = useState(false);
  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        style={{zIndex: 1100}}
        onRequestClose={() => {}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            // flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#fff',
            zIndex: 1000,
          }}>
          <Image
            source={require('../../assets/loading.gif')}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>
      </Modal>
    );
  }

  const dispatch = useDispatch();
  const handlePress = async () => {
    dispatch({
      type: 'SIGN_IN',
      payload: {form},
    });
    try {
      setLoading(true);
      await signIn(form.email, form.password);
      setLoading(false);
      toastMessage({
        type: 'success',
        title: 'Masuk Berhasil',
        message: 'Selamat datang di aplikasi kami',
      });
      navigation.reset({
        index: 0,
        routes: [{name: 'myApp'}],
      });
    } catch (error) {
      setLoading(false);
      toastMessage({
        type: 'error',
        title: 'Masuk Gagal',
        message: 'Kata sandi atau email salah',
      });
    }
  };

  // reset password

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../assets/logo_app.png')}
          style={styles.logo}
        />
        <Text style={styles.titleLogin}>Masuk</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.bodyInput}>
          <TextInput
            label={'Email'}
            style={styles.inputan}
            placeholder="example@mail.com"
            value={form.email}
            mode="outlined"
            onChangeText={text => setForm({...form, email: text})}
            activeOutlineColor="#d32521"
          />
        </View>
        <View style={styles.bodyInput}>
          <TextInput
            style={styles.inputan}
            mode="outlined"
            label={'Kata Sandi'}
            placeholder="at least 6 characters"
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
            secureTextEntry
            activeOutlineColor="#d32521"
          />
          <TouchableOpacity
            style={{
              marginTop: (Dimensions.get('window').width * 1) / 80,
              alignSelf: 'flex-end',
            }}
            onPress={() => navigation.navigate('ResetPassword')}>
            <Text
              style={{
                fontFamily: fonts.primary[400],
                fontSize: (Dimensions.get('window').width * 2) / 70,
                color: '#8D8DAA',
              }}>
              Lupa Kata Sandi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.continue}
          onPress={handlePress}
          disabled={!form.password}>
          <Text style={styles.textContinue}>Masuk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 10,
          }}
          onPress={() => navigation.navigate('SIGNUP')}>
          <Text
            style={{
              fontSize: 12,
              color: '#000',
              textAlign: 'center',
              fontFamily: fonts.primary[400],
            }}>
            Belum punya akun?{' '}
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                fontFamily: fonts.primary[600],
              }}>
              Daftar
            </Text>
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 12,
            color: '#000',
            fontFamily: fonts.primary[400],
            paddingHorizontal: Dimensions.get('window').width * 0.05,
          }}>
          Noted: Jika email notifikasi tidak muncul silahkan cek di email spam
        </Text>
      </View>
    </View>
  );
};

export default Login;
const {width: PAGE_WIDTH, height: PAGE_HEIGHT} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titleLogin: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: '#000',
    textAlign: 'center',
  },
  bodyInput: {
    paddingVertical: Dimensions.get('window').height * 0.02,
    // marginVertical: Dimensions.get('window').height * 0.01,
  },
  textInput: {
    fontSize: Dimensions.get('window').height * 0.02,
    color: '#000',
    fontWeight: 'bold',
  },
  inputan: {
    paddingHorizontal: Dimensions.get('window').height * 0.02,
    backgroundColor: '#fff',
    // backgroundColor: "transparent",
  },
  continue: {
    backgroundColor: '#d32521',
    padding: Dimensions.get('window').width * 0.03,
    borderRadius: Dimensions.get('window').width * 0.01,
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').height * 0.04,
    marginBottom: Dimensions.get('window').height * 0.04,
  },
  textContinue: {
    fontSize: Dimensions.get('window').height * 0.02,
    color: '#fff',
    fontFamily: fonts.primary[600],
  },
  content: {
    paddingHorizontal: Dimensions.get('window').height * 0.04,
  },
  logo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    marginRight: Dimensions.get('window').height * 0.02,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#fff',
  },
  modalView: {
    width: Dimensions.get('window').width,
    padding: (Dimensions.get('window').width * 2) / 20,
    justifyContent: 'center',
  },
  buttonClose: {
    backgroundColor: '#d32521',
    padding: Dimensions.get('window').width * 0.03,
    borderRadius: Dimensions.get('window').width * 0.01,
    alignItems: 'center',
    // marginHorizontal: Dimensions.get('window').height * 0.04,
    marginBottom: Dimensions.get('window').height * 0.04,
  },
  iconForget: {
    height: PAGE_HEIGHT * 0.4,
    aspectRatio: 1,
    width: (Dimensions.get('window').width * 5) / 10,
  },
});
