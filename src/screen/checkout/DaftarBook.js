import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {auth, db} from '../../config';
import {fonts} from '../../utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import {v4 as uuidv4} from 'uuid';
import {doc, setDoc, updateDoc} from 'firebase/firestore';

const DaftarBook = () => {
  const route = useRoute();
  const Daftar = route.params.DetilKontrakan;
  const idPemilik = Daftar.user.uid;
  const {currentUser} = auth;
  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };
  const id = Daftar.id;
  const randomId = uuidv4();
  const navigation = useNavigation();

  const [tanggalKunjungan, setTanggalKunjungan] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState(null);
  const [orangList, setOrangList] = useState([
    {label: '1 Orang', value: '1'},
    {label: '2 Orang', value: '2'},
    {label: '3 Orang', value: '3'},
    {label: '4 Orang', value: '4'},
  ]);
  const [open2, setOpen2] = useState(false);
  const [ruang, setRuang] = useState([
    {label: '1 Kamar', value: '1'},
    {label: '2 Kamar', value: '2'},
  ]);
  const [open3, setOpen3] = useState(false);
  const [rooms, setRooms] = useState(null);
  const hargaSemua = Daftar.hargaKontrakan * rooms;

  if (rooms > Daftar.jumlahKamar) {
    toastMessage({
      type: 'error',
      title: 'Jumlah Kamar',
      message:
        'Jumlah kamar tidak boleh lebih besar dari jumlah kamar yang tersedia',
    });
  }

  const [loading, setLoading] = useState(false);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          // zIndex: 1000
        }}>
        <Image
          source={require('../../assets/loading.gif')}
          style={{
            width: 50,
            height: 50,
          }}
        />
      </View>
    );
  }

  const handlePress = async () => {
    try {
      if (
        tanggalKunjungan.getDate() === new Date().getDate() &&
        tanggalKunjungan.getMonth() === new Date().getMonth() &&
        tanggalKunjungan.getFullYear() === new Date().getFullYear()
      ) {
        toastMessage({
          type: 'error',
          title: 'Tanggal Kunjungan',
          message: 'Tanggal kunjungan tidak boleh sama dengan tanggal hari ini',
        });
      } else {
        setLoading(true);
        const DataBooking = {
          idBooking: randomId,
          idKontrakan: idPemilik,
          idUser: currentUser.uid,
          namaKontrakan: Daftar.nameKontrakan,
          hargaKontrakan: hargaSemua,
          tanggalKunjungan: tanggalKunjungan.toDateString(),
          jumlahOrang: guest,
          jumlahKamar: rooms,
          status: 'Booking',
          statusPembayaran: 'COD Bayar di Tempat',
          statusKonfirmasi: 'Menunggu Konfirmasi',
          gambarKontrakan: Daftar.thumbnileImage,
          namaUser: currentUser.displayName,
          emailUser: currentUser.email,
          alamatKontrakan: Daftar.addressKontrakan,
          kotaKontrakan: Daftar.kota,
        };
        await Promise.all([
          setDoc(doc(db, 'Booking', randomId), DataBooking),
          updateDoc(doc(db, `Kontrakan/${id}`), {
            jumlahKamar: Daftar.jumlahKamar - rooms,
          }).then(() => {
            setLoading(false);
            toastMessage({
              type: 'success',
              title: 'Booking',
              message: 'Booking anda berhasil sedang di proses',
            });
            navigation.replace('myApp');
          }),
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d32521" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContent}>
          <Text style={styles.titleHeader} adjustsFontSizeToFit>
            Hello {currentUser.displayName}
          </Text>
          <Text style={styles.deskHeader} adjustsFontSizeToFit>
            Kamu akan Booking {Daftar.nameKontrakan}
          </Text>
        </View>
        <View style={styles.bodyDaftar}>
          <Text style={styles.titleDaftar} adjustsFontSizeToFit>
            Detail Booking
          </Text>
          <View style={styles.infoKontrakan}>
            <Image
              source={{uri: Daftar.thumbnileImage}}
              style={styles.imageKontrakan}
            />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 10,
              }}>
              <Text style={styles.titleInfo}>{Daftar.nameKontrakan}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Entypo name="location-pin" size={15} color="black" />
                <Text style={styles.kotaInfo}>{Daftar.kota}</Text>
              </View>
              <Text style={styles.alamatInfo}>{Daftar.addressKontrakan}</Text>
            </View>
          </View>
          <View style={styles.bodyInputan}>
            <Text style={styles.LabelInputan}>Tanggal Masuk</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                paddingHorizontal: Dimensions.get('window').width * 0.05,
                marginTop: Dimensions.get('window').height * 0.01,
              }}
              onPress={() => setOpen(true)}>
              <Text style={styles.textInputan}>
                {tanggalKunjungan.toDateString()}
              </Text>
              <AntDesign name="down" size={12} color="black" />
            </TouchableOpacity>
            <Text style={styles.LabelInputan}>Orang</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                paddingHorizontal: Dimensions.get('window').width * 0.05,
                marginTop: Dimensions.get('window').height * 0.01,
              }}
              onPress={() => setOpen2(true)}>
              {guest ? (
                <Text style={styles.textInputan}>{guest} Orang</Text>
              ) : (
                <Text style={styles.textInputan}>Maksimal 4 orang</Text>
              )}
              <AntDesign name="down" size={12} color="black" />
            </TouchableOpacity>
            <Text style={styles.LabelInputan}>Ruang</Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                borderBottomColor: '#e0e0e0',
                paddingHorizontal: Dimensions.get('window').width * 0.05,
                marginTop: Dimensions.get('window').height * 0.01,
              }}
              onPress={() => setOpen3(true)}>
              {rooms ? (
                <Text style={styles.textInputan}>{rooms} Kamar</Text>
              ) : (
                <Text style={styles.textInputan}>Maksimal 2 Ruang</Text>
              )}
              <AntDesign name="down" size={12} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: Dimensions.get('window').height * 0.05,
              marginHorizontal: Dimensions.get('window').width * 0.05,
            }}>
            <Text style={styles.textKontak}>Kontak Pemilik</Text>
            <Text style={styles.nameKontak}>{Daftar.namePemilik}</Text>
            <Text style={styles.emailKontak}>{Daftar.emailPemilik}</Text>
            <Text style={styles.phoneKontak}>{Daftar.phonePemilik}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomCheck}>
        <View style={styles.bodyPrice}>
          {hargaSemua ? (
            <Text style={styles.harga}>
              Rp.{' '}
              {hargaSemua.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
          ) : (
            <Text style={styles.harga}>
              Rp.{' '}
              {Daftar.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </Text>
          )}
          {/* <Text style = {styles.harga} >Rp. {hargaSemua.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text> */}
          <Text style={styles.hargaBulanan}>Total Harga</Text>
        </View>
        <TouchableOpacity
          style={styles.btnPemilik}
          onPress={handlePress}
          disabled={
            rooms > Daftar.jumlahKamar || !rooms || !tanggalKunjungan || !guest
          }>
          <Text
            style={{
              fontSize: Dimensions.get('window').width * 0.03,
              color: '#fff',
              fontFamily: fonts.primary[600],
            }}>
            Pesan Sekarang
          </Text>
        </TouchableOpacity>
      </View>
      {open ? (
        <DatePicker
          modal
          date={tanggalKunjungan}
          mode="date"
          open={open}
          onConfirm={date => {
            setTanggalKunjungan(date);
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      ) : null}
      {open2 ? (
        <Modal animationType="slide">
          <DropDownPicker
            open={open2}
            items={orangList}
            setOpen={setOpen2}
            value={guest}
            setValue={setGuest}
            setItems={setOrangList}
          />
        </Modal>
      ) : null}
      {open3 ? (
        <Modal animationType="slide">
          <DropDownPicker
            open={open3}
            items={ruang}
            setOpen={setOpen3}
            value={rooms}
            setValue={setRooms}
            setItems={setRuang}
          />
        </Modal>
      ) : null}
    </View>
  );
};

export default DaftarBook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
  },
  headerContent: {
    backgroundColor: '#d32521',
    height: Dimensions.get('window').height * 0.1,
    padding: Dimensions.get('window').height * 0.02,
    // position: "relative",
    zIndex: 1,
  },
  titleHeader: {
    fontSize: (Dimensions.get('window').width * 2) / 60,
    color: '#fff',
    fontFamily: fonts.primary[600],
    // marginTop: Dimensions.get("window").height * 0.04,
  },
  deskHeader: {
    fontSize: (Dimensions.get('window').width * 2) / 70,
    color: '#fff',
    fontFamily: fonts.primary[600],
  },
  bodyDaftar: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    // position: "absolute",
    // zIndex: 3,
    bottom: 0,
    top: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleDaftar: {
    fontSize: (Dimensions.get('window').width * 2) / 60,
    color: '#d32521',
    fontFamily: fonts.primary[600],
    marginTop: Dimensions.get('window').height * 0.04,
    marginLeft: Dimensions.get('window').width * 0.05,
  },
  deskDaftar: {
    fontSize: (Dimensions.get('window').width * 2) / 60,
    color: '#000',
    fontFamily: fonts.primary[400],
    marginLeft: Dimensions.get('window').width * 0.05,
  },
  infoKontrakan: {
    flexDirection: 'row',
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: Dimensions.get('window').height * 0.02,
  },
  imageKontrakan: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').height * 0.2,
    borderRadius: Dimensions.get('window').width * 0.02,
  },
  titleInfo: {
    fontSize: (Dimensions.get('window').width * 2) / 60,
    color: '#000',
    fontFamily: fonts.primary[600],
    textTransform: 'capitalize',
    width: Dimensions.get('window').width * 0.5,
  },
  kotaInfo: {
    fontSize: (Dimensions.get('window').width * 2) / 70,
    color: '#000',
    fontFamily: fonts.primary[400],
    textTransform: 'capitalize',
  },
  alamatInfo: {
    fontSize: (Dimensions.get('window').width * 2) / 70,
    color: '#000',
    fontFamily: fonts.primary[400],
    marginTop: Dimensions.get('window').height * 0.02,
    width: Dimensions.get('window').width * 0.5,
    textTransform: 'capitalize',
  },
  textInputan: {
    fontSize: (Dimensions.get('window').width * 2) / 60,
    color: '#000',
    fontFamily: fonts.primary[400],
  },
  LabelInputan: {
    fontSize: (Dimensions.get('window').width * 2) / 65,
    color: '#000',
    fontFamily: fonts.primary[600],
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: Dimensions.get('window').height * 0.05,
  },
  textKontak: {
    fontSize: (Dimensions.get('window').width * 2) / 60,
    color: '#000',
    fontFamily: fonts.primary[600],
  },
  nameKontak: {
    fontSize: (Dimensions.get('window').width * 2) / 70,
    color: '#000',
    fontFamily: fonts.primary[400],
  },
  emailKontak: {
    fontSize: (Dimensions.get('window').width * 2) / 70,
    color: '#000',
    fontFamily: fonts.primary[400],
  },
  phoneKontak: {
    fontSize: (Dimensions.get('window').width * 2) / 70,
    color: '#000',
    fontFamily: fonts.primary[400],
  },
  btnSend: {
    backgroundColor: '#0e5cff',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.1,
    borderRadius: Dimensions.get('window').width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * 0.05,
  },
  textKirim: {
    fontSize: (Dimensions.get('window').width * 2) / 65,
    color: '#fff',
    fontFamily: fonts.primary[600],
  },
  bottomCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Dimensions.get('window').width * 0.05,
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
  harga: {
    fontSize: (Dimensions.get('window').width * 2) / 50,
    color: '#000',
    fontFamily: fonts.primary[400],
  },
  hargaBulanan: {
    fontSize: (Dimensions.get('window').width * 2) / 60,
    color: '#000',
    fontFamily: fonts.primary[700],
  },
  btnPemilik: {
    backgroundColor: '#d32521',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Dimensions.get('window').width * 0.1,
  },
});
