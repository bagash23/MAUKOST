import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {auth, db} from '../../config';
import {fonts} from '../../utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import BarcodeCreatorViewManager, {
  BarcodeFormat,
} from 'react-native-barcode-creator';

const HistoryPenewaan = () => {
  const [booking, setBooking] = useState([]);
  const {currentUser} = auth;
  const dataBooking = query(
    collection(db, 'Booking'),
    where('idUser', '==', currentUser.uid),
  );

  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(dataBooking, querySnapshot => {
      const DATABOOKING = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBooking(DATABOOKING);
    });
    return () => unsubscribe();
  }, []);

  const [lihatDetail, setLihatDetail] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/logo_app.png')}
            style={{
              width: 35,
              height: 35,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: fonts.primary[600],
                fontSize: 20,
                marginLeft: 10,
                color: '#000',
              }}>
              MauKost
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: fonts.primary[400],
            fontSize: 15,
            color: '#000',
            marginTop: 10,
          }}>
          Perjanjian sewa kostan yang telah anda buat akan tampil disini
        </Text>
      </View>
      <ScrollView>
        <FlatList
          data={booking.sort((a, b) => b.updatedAt - a.updatedAt)}
          keyExtractor={item => item.idBooking}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  backgroundColor: '#fff',
                  marginVertical: Dimensions.get('window').width * 0.03,
                  paddingHorizontal: Dimensions.get('window').width * 0.05,
                  paddingVertical: Dimensions.get('window').width * 0.02,
                  borderBottomWidth: 1,
                  borderBottomColor: '#E5E5E5',
                }}>
                <View key={index} style={styles.contentBody}>
                  <Image
                    source={{uri: item.gambarKontrakan}}
                    style={styles.image}
                  />
                  <View style={styles.bodyBook}>
                    <Text style={styles.textBody}>{item.namaKontrakan}</Text>
                    <Text style={styles.textAlamatBody}>
                      {item.alamatKontrakan}
                    </Text>
                    <Text style={styles.textStatusBody}>
                      {item.statusKonfirmasi}
                    </Text>
                    <Text style={styles.harga}>
                      Rp.{' '}
                      {item.hargaKontrakan
                        .toFixed()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    paddingVertical: Dimensions.get('window').width * 0.02,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons name="meeting-room" size={20} color="#000" />
                    <Text
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.02,
                        fontFamily: fonts.primary[400],
                        color: '#000',
                        fontSize: Dimensions.get('window').width / 30,
                      }}>
                      {item.jumlahKamar} Kamar
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="account-group"
                      size={20}
                      color="#000"
                    />
                    <Text
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.02,
                        fontFamily: fonts.primary[400],
                        color: '#000',
                        fontSize: Dimensions.get('window').width / 30,
                      }}>
                      {item.jumlahOrang} Orang
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons name="date-range" size={20} color="#000" />
                    <Text
                      style={{
                        marginLeft: Dimensions.get('window').width * 0.02,
                        fontFamily: fonts.primary[400],
                        color: '#000',
                        fontSize: Dimensions.get('window').width / 30,
                      }}>
                      {item.tanggalKunjungan}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <BarcodeCreatorViewManager
                    value={item.idBooking}
                    background={'#000000'}
                    foregroundColor={'#FFFFFF'}
                    format={BarcodeFormat.QR}
                    style={{
                      width: Dimensions.get('window').width * 0.3,
                      height: Dimensions.get('window').width * 0.3,
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.textBody}>Terima Kasih</Text>
                  <Text
                    style={{
                      fontFamily: fonts.primary[400],
                      color: '#000',
                      fontSize: Dimensions.get('window').width / 30,
                    }}>
                    Pemesanan kamar kost: {item.namaKontrakan} berhasil,
                    Selanjutnya pemilik akan melakukan scan pada barcode untuk
                    mengkonfirmasi penyewaan kost anda.
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.primary[400],
                      color: '#000',
                      fontSize: Dimensions.get('window').width / 30,
                      marginTop: Dimensions.get('window').width * 0.01,
                    }}>
                    Silahkan datang untuk melakukan konfirmasi pada tanggal
                    kunjungan pada pembookingan.
                  </Text>
                  <Text
                    style={{
                      fontFamily: fonts.primary[400],
                      color: '#000',
                      fontSize: Dimensions.get('window').width / 30,
                      marginTop: Dimensions.get('window').width * 0.01,
                    }}>
                    Harap menunjukan bukti atau barcode pemesanan online kepada
                    pemilik kost
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HistoryPenewaan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textHeader: {
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: fonts.primary[600],
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingVertical: Dimensions.get('window').width * 0.03,
  },
  contentBody: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    borderRadius: Dimensions.get('window').width * 0.02,
  },
  bodyBook: {
    flexDirection: 'column',
    marginLeft: Dimensions.get('window').width * 0.05,
  },
  textBody: {
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: fonts.primary[600],
    color: '#000',
  },
  textAlamatBody: {
    fontSize: Dimensions.get('window').width / 35,
    fontFamily: fonts.primary[400],
    color: '#000',
    width: Dimensions.get('window').width * 0.5,
  },
  textStatusBody: {
    fontSize: Dimensions.get('window').width / 35,
    fontFamily: fonts.primary[600],
    color: '#d32521',
  },
  harga: {
    fontSize: Dimensions.get('window').width / 20,
    fontFamily: fonts.primary[600],
    color: '#000',
  },
  inputKontrakanDeskripsi: {
    height: Dimensions.get('window').width * 0.3,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: Dimensions.get('window').width * 0.03,
    paddingHorizontal: Dimensions.get('window').width * 0.03,
  },
  textRating: {
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: fonts.primary[600],
    color: '#000',
    marginVertical: Dimensions.get('window').width * 0.03,
    textAlign: 'center',
  },
  btnKonfirmasi: {
    backgroundColor: '#0e5cff',
    paddingVertical: Dimensions.get('window').width * 0.02,
    borderRadius: Dimensions.get('window').width * 0.02,
    marginVertical: Dimensions.get('window').width * 0.03,
  },
  textKonfirmasi: {
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: fonts.primary[600],
    color: '#fff',
    textAlign: 'center',
  },
});
