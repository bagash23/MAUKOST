import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useRef} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {fonts} from '../../utils';
import {useNavigation, useRoute} from '@react-navigation/native';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../config';
import Toast from 'react-native-toast-message';

const ScanBarcode = () => {
  const route = useRoute();
  const id = route.params.idBooking;
  console.log(id);
  const navigation = useNavigation();

  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };

  const changeStatus = ({id}) => {
    updateDoc(doc(db, `Booking/${id}`), {
      statusKonfirmasi: 'Konfirmasi',
    });
    toastMessage({
      type: 'success',
      title: 'Berhasil Merubah Status',
      message: 'Status Berhasil Diubah Menjadi Konfirmasi',
    });
    navigation.replace('HOMEKONTRAKAN');
  };

  const scanner = useRef(null);

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={e => changeStatus({id})}
        ref={scanner}
        reactivate={true}
        showMarker={true}
        topContent={
          <Text
            style={{
              fontSize: 20,
              fontFamily: fonts.primary[400],
              color: '#000',
              marginHorizontal: 20,
            }}>
            Scan QR Code untuk konfirmasi pembayaran kost anda
          </Text>
        }
        bottomContent={
          <TouchableOpacity
            style={styles.btnKonfirmasi}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'myApp'}],
              })
            }>
            <Text style={styles.buttonText}>Kembali</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default ScanBarcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnKonfirmasi: {
    backgroundColor: '#d32521',
    padding: 10,
    marginHorizontal: Dimensions.get('window').width / 2 - 100,
    borderRadius: 8,
    width: Dimensions.get('window').width / 2 + 120,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: '#Fff',
    fontFamily: fonts.primary[600],
  },
});
