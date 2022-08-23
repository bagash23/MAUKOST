import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {signUp} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {fonts} from '../../utils/Fonts';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import {StatusBar} from 'react-native';

const SignUp = () => {
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
    confirmPassword: '',
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePress = async () => {
    try {
      dispatch({
        type: 'SIGN_UP',
        payload: form,
      });

      if (form.password !== form.confirmPassword) {
        toastMessage({
          type: 'error',
          title: 'Kata Sandi Gagal',
          message: 'Kata sandi tidak cocok',
        });
        return;
      } else {
        signUp(form.email, form.password);
        messaging()
          .getToken()
          .then(token => {
            firestore().collection('usertoken').add({
              token: token,
            });
          });
        toastMessage({
          type: 'success',
          title: 'Daftar Sukses',
          message: 'Anda telah berhasil mendaftar',
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'GETSTARTED'}],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView>
        <View style={styles.headerText}>
          <Text style={styles.text}>Daftar</Text>
          <Text style={styles.textDeskripsi}>
            Menjadi anggota - Anda tidak lagi kebinggungan untuk mencari tempat
            tinggal sementara karena di kami banyak sekali penawaran kost untuk
            disewa.
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.bodyInput}>
            <TextInput
              label={'Email'}
              style={styles.inputan}
              placeholder="example@mail.com"
              value={form.email}
              onChangeText={text => setForm({...form, email: text})}
              activeOutlineColor="#d32521"
              mode="outlined"
            />
          </View>
          <View style={styles.bodyInput}>
            <TextInput
              label={'Buat Kata Sandi'}
              style={styles.inputan}
              placeholder="at least 6 characters"
              value={form.password}
              onChangeText={text => setForm({...form, password: text})}
              secureTextEntry
              activeOutlineColor="#d32521"
              mode="outlined"
            />
          </View>
          <View style={styles.bodyInput}>
            <TextInput
              label={'Konfirmasi Kata Sandi'}
              style={styles.inputan}
              placeholder="at least 6 characters"
              value={form.confirmPassword}
              onChangeText={text => setForm({...form, confirmPassword: text})}
              secureTextEntry
              activeOutlineColor="#d32521"
              mode="outlined"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.continue}
            onPress={handlePress}
            disabled={!form.password || !form.confirmPassword}>
            <Text style={styles.textContinue}>Daftar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              padding: 10,
            }}
            onPress={() => navigation.navigate('LOGIN')}>
            <Text
              style={{
                fontSize: 12,
                color: '#000',
                textAlign: 'center',
                fontFamily: fonts.primary[400],
              }}>
              Sudah punya akun?{' '}
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                  fontFamily: fonts.primary[600],
                }}>
                Masuk
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    paddingHorizontal: Dimensions.get('window').height * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.03,
  },
  text: {
    fontSize: Dimensions.get('window').height * 0.03,
    fontFamily: fonts.primary[700],
    color: '#000',
  },
  textDeskripsi: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    fontFamily: fonts.primary[400],
  },
  content: {
    paddingHorizontal: Dimensions.get('window').height * 0.04,
  },
  bodyInput: {
    paddingVertical: Dimensions.get('window').height * 0.02,
    marginVertical: Dimensions.get('window').height * 0.01,
  },
  textInput: {
    fontSize: Dimensions.get('window').height * 0.02,
    color: '#000',
    fontWeight: 'bold',
  },
  inputan: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
    paddingHorizontal: Dimensions.get('window').height * 0.02,
  },
  inputan2: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
    paddingHorizontal: Dimensions.get('window').height * 0.02,
    paddingVertical: Dimensions.get('window').height * 0.02,
  },
  continue: {
    backgroundColor: '#d32521',
    padding: Dimensions.get('window').width * 0.03,
    borderRadius: Dimensions.get('window').width * 0.01,
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').height * 0.04,
    marginBottom: Dimensions.get('window').height * 0.04,
    // borderRadius: Dimensions.get('window').height * 0.05,
  },
  textContinue: {
    fontSize: Dimensions.get('window').height * 0.02,
    color: '#fff',
    fontFamily: fonts.primary[600],
  },
});
