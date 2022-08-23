import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {auth, db} from '../../config';
import {fonts} from '../../utils/Fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';

const SearchBeranda = () => {
  const {currentUser} = auth;
  const [selectedItem, setSelectedItem] = useState([]);
  const DataKontrakan = query(
    collection(db, 'Kontrakan'),
    where('user', '!=', currentUser.uid),
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(DataKontrakan, querySnap => {
      const data = querySnap.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSelectedItem(data);
    });
    return () => unsubscribe();
  }, []);
  const [lokasi, setLokasi] = useState('');
  const [openModal, setOpenMoodal] = useState(false);
  const navigation = useNavigation();

  const dataKota = selectedItem
    .filter(item => item.kota)
    .map(item => item.kota);
  const dataKotaUnique = [...new Set(dataKota)];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <TouchableOpacity
            style={styles.contentLokasi}
            onPress={() => setOpenMoodal(true)}>
            {lokasi ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <EvilIcons name="location" size={20} color="#000" />
                <Text style={styles.textLokasi}>{lokasi}</Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <EvilIcons name="location" size={20} color="#000" />
                <Text style={styles.textLokasi}>Cari kota terdekat</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {lokasi ? (
          <FlatGrid
            data={selectedItem.filter(item => item.kota === lokasi)}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    marginLeft: (Dimensions.get('window').width * 1) / 100,
                    paddingVertical:
                      (Dimensions.get('window').height * 1) / 100,
                    backgroundColor: '#fff',
                  }}
                  onPress={() => navigation.navigate('TempatDetail', {item})}>
                  <Image
                    source={{uri: item.thumbnileImage}}
                    style={{
                      width: (Dimensions.get('window').width * 4) / 9,
                      height: (Dimensions.get('window').height * 2) / 10,
                    }}
                  />
                  <View>
                    {item.jumlahKamar === 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntDesign name="closecircle" size={12} color="red" />
                        <Text
                          style={{
                            fontSize: Dimensions.get('window').width / 30,
                            color: '#EB1D36',
                            fontFamily: fonts.primary[600],
                            marginLeft: Dimensions.get('window').width * 0.02,
                          }}>
                          Kamar tidak tersedia
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntDesign
                          name="checkcircle"
                          size={12}
                          color="#2FDD92"
                        />
                        <Text
                          style={{
                            fontSize: Dimensions.get('window').width / 30,
                            color: '#2FDD92',
                            fontFamily: fonts.primary[600],
                            marginLeft: Dimensions.get('window').width * 0.02,
                          }}>
                          Kamar tersedia
                        </Text>
                      </View>
                    )}
                    <View style={styles.bodyListTextLainnya}>
                      <Text
                        style={styles.textListLainnya}
                        adjustsFontSizeToFit
                        numberOfLines={1}>
                        {item.nameKontrakan}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo name="location-pin" size={15} color="black" />
                        <Text
                          style={styles.textListKota}
                          adjustsFontSizeToFit
                          numberOfLines={1}>
                          {item.kota}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.bodyPrice}>
                      <Text
                        style={styles.textHarga}
                        adjustsFontSizeToFit
                        numberOfLines={1}>
                        Harga
                      </Text>
                      <Text
                        style={styles.harga}
                        adjustsFontSizeToFit
                        numberOfLines={1}>
                        Rp.{' '}
                        {item.hargaKontrakan.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1,',
                        )}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        ) : (
          <FlatGrid
            data={selectedItem.sort((a, b) => b.updatedAt - a.updatedAt)}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    marginLeft: (Dimensions.get('window').width * 1) / 100,
                    paddingVertical:
                      (Dimensions.get('window').height * 1) / 100,
                    backgroundColor: '#fff',
                  }}
                  onPress={() => navigation.navigate('TempatDetail', {item})}>
                  <Image
                    source={{uri: item.thumbnileImage}}
                    style={{
                      width: (Dimensions.get('window').width * 4) / 9,
                      height: (Dimensions.get('window').height * 2) / 10,
                    }}
                  />
                  <View>
                    {item.jumlahKamar === 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntDesign name="closecircle" size={12} color="red" />
                        <Text
                          style={{
                            fontSize: Dimensions.get('window').width / 30,
                            color: '#EB1D36',
                            fontFamily: fonts.primary[600],
                            marginLeft: Dimensions.get('window').width * 0.02,
                          }}>
                          Kamar tidak tersedia
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <AntDesign
                          name="checkcircle"
                          size={12}
                          color="#2FDD92"
                        />
                        <Text
                          style={{
                            fontSize: Dimensions.get('window').width / 30,
                            color: '#2FDD92',
                            fontFamily: fonts.primary[600],
                            marginLeft: Dimensions.get('window').width * 0.02,
                          }}>
                          Kamar tersedia
                        </Text>
                      </View>
                    )}
                    <View style={styles.bodyListTextLainnya}>
                      <Text
                        style={styles.textListLainnya}
                        adjustsFontSizeToFit
                        numberOfLines={1}>
                        {item.nameKontrakan}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo name="location-pin" size={15} color="black" />
                        <Text
                          style={styles.textListKota}
                          adjustsFontSizeToFit
                          numberOfLines={1}>
                          {item.kota}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.bodyPrice}>
                      <Text
                        style={styles.textHarga}
                        adjustsFontSizeToFit
                        numberOfLines={1}>
                        Harga
                      </Text>
                      <Text
                        style={styles.harga}
                        adjustsFontSizeToFit
                        numberOfLines={1}>
                        Rp.{' '}
                        {item.hargaKontrakan.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1,',
                        )}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      </ScrollView>
      {openModal ? (
        <Modal animationType="slide">
          <Text
            style={{
              fontFamily: fonts.primary[600],
              textAlign: 'center',
              fontSize: Dimensions.get('window').width / 25,
              color: '#000',
              marginVertical: Dimensions.get('window').width * 0.02,
            }}>
            Lokasi Kontrakan
          </Text>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: Dimensions.get('window').width * 0.05,
              top: Dimensions.get('window').width * 0.02,
            }}
            onPress={() => setOpenMoodal(false)}>
            <AntDesign name="close" size={20} color="#000" />
          </TouchableOpacity>
          <FlatList
            data={dataKotaUnique}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => setLokasi(item) === setOpenMoodal(false)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: Dimensions.get('window').width * 0.05,
                      paddingVertical: Dimensions.get('window').width * 0.02,
                    }}>
                    <Text
                      style={{
                        fontSize: Dimensions.get('window').width / 30,
                        fontFamily: fonts.primary[400],
                        color: '#000',
                      }}>
                      {item}
                    </Text>
                    <Text
                      style={{
                        fontSize: Dimensions.get('window').width / 30,
                        fontFamily: fonts.primary[400],
                        color: '#d32521',
                      }}>
                      Pilih
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </Modal>
      ) : null}
    </View>
  );
};

export default SearchBeranda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentLokasi: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    margin: Dimensions.get('window').width * 0.05,
    paddingVertical: Dimensions.get('window').width * 0.02,
    borderRadius: Dimensions.get('window').width * 0.05,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#fff',
  },
  textLokasi: {
    fontSize: Dimensions.get('window').width / 30,
    fontFamily: fonts.primary[600],
    color: '#000',
    marginLeft: Dimensions.get('window').width * 0.02,
  },
  textDekCard: {
    fontSize: Dimensions.get('window').width / 40,
    fontFamily: fonts.primary[400],
    color: '#fff',
    width: Dimensions.get('window').width * 0.8,
    marginTop: Dimensions.get('window').width * 0.02,
  },
  bodyListLainnya: {
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height * 0.02,
    flexDirection: 'row',
    backgroundColor: '#fff',
    // justifyContent: "space-between"
  },
  imageKontrakanLainnya: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
  },
  textListLainnya: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#000',
    fontFamily: fonts.primary[600],
  },
  ratingBaikLainnya: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: Dimensions.get('window').width * 0.02,
    top: Dimensions.get('window').height * 0.01,
  },
  textLainnya: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.01,
    fontFamily: fonts.primary[700],
  },
  textLabel: {
    fontSize: Dimensions.get('window').width * 0.03,
    fontFamily: fonts.primary[400],
    color: '#000',
  },
  bodyPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Dimensions.get('window').height * 0.02,
    marginHorizontal: Dimensions.get('window').width * 0.02,
  },
  textHarga: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    marginRight: Dimensions.get('window').width * 0.02,
    fontFamily: fonts.primary[400],
  },
  harga: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#000',
    fontFamily: fonts.primary[600],
  },
});
