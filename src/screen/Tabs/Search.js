import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../../utils';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {auth, db} from '../../config';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import * as Animatable from 'react-native-animatable';

const Search = () => {
  const [kotaPopuler, setKotaPopuler] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentUser} = auth;
  const kotaQuery = query(
    collection(db, 'Kontrakan'),
    where('user', '!=', currentUser.uid),
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(kotaQuery, querySnapshot => {
      const ParsedKota = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (loading) {
        setKotaPopuler(ParsedKota);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const navigation = useNavigation();

  const textAnimationTyping = [
    'Pencarian tempat penyewaan kost',
    'Gausah ribet, cari kost disini aja',
    'Cari kost yang kamu inginkan disini',
  ];

  const [textTyping, setTextTyping] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setTextTyping(
        textAnimationTyping[
          Math.floor(Math.random() * textAnimationTyping.length)
        ],
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            style={styles.bodySearch}
            onPress={() => navigation.navigate('SEARCHBERANDA')}>
            <Feather name="search" size={20} color="#000" />
            <Text style={styles.txtJudulSCreen}>{textTyping}</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://static.mamikos.com/uploads/cache/data/event/2022-05-18/thi4OB5r-540x720.jpg',
            }}
            style={styles.cardTamplate}
            resizeMode="stretch"
          />
          <View style={styles.kotaContent}>
            <Text style={styles.txtTitleContent}>Terbaru Kost Jakarta</Text>
            <FlatList
              data={kotaPopuler
                .filter(
                  item =>
                    item.kota === 'Jakarta Barat' ||
                    item.kota === 'Jakarta Pusat' ||
                    item.kota === 'Jakarta Timur' ||
                    item.kota === 'Jakarta Selatan' ||
                    item.kota === 'Jakarta Utara',
                )
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .slice(0, 3)}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (
                <Pressable
                  style={styles.list}
                  onPress={() => navigation.navigate('TempatDetail', {item})}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{uri: item.thumbnileImage}}
                      style={styles.imageKontrakanLainnya}
                    />
                    <View style={{marginLeft: 10}}>
                      {item.jumlahKamar === 0 ? (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          style={{flexDirection: 'row', alignItems: 'center'}}>
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
                          numberOfLines={1}>{`${item.nameKontrakan.slice(
                          0,
                          14,
                        )}...`}</Text>
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
                    </View>
                  </View>
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
                </Pressable>
              )}
            />
          </View>
          <View style={styles.kotaContent}>
            <Text style={styles.txtTitleContent}>Kost Kota Bandung</Text>
            <FlatList
              data={kotaPopuler.filter(item => item.kota === 'Bandung')}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    style={styles.listHorizontal}
                    onPress={() => navigation.navigate('TempatDetail', {item})}>
                    <Image
                      source={{uri: item.thumbnileImage}}
                      style={styles.cardHorizontal}
                      resizeMode="stretch"
                    />
                    {item.jumlahKamar === 0 ? (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        style={{
                          fontSize: Dimensions.get('window').width / 30,
                          color: '#000',
                          fontFamily: fonts.primary[600],
                        }}>{`${item.nameKontrakan.slice(0, 14)}...`}</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Entypo name="location-pin" size={15} color="black" />
                        <Text style={styles.textListKota}>{item.kota}</Text>
                      </View>
                    </View>
                    <View style={styles.bodyPrice}>
                      <Text style={styles.textHarga}>Harga</Text>
                      <Text style={styles.harga}>
                        Rp.{' '}
                        {item.hargaKontrakan.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1,',
                        )}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          </View>
          <Text
            style={[
              styles.txtTitleContent,
              {
                marginTop: Dimensions.get('window').height * 0.02,
                marginLeft: Dimensions.get('window').width * 0.03,
              },
            ]}>
            Pencarian Lainnya
          </Text>
          <FlatGrid
            data={kotaPopuler.sort((a, b) => b.updatedAt - a.updatedAt)}
            keyExtractor={item => item.id}
            spacing={Dimensions.get('window').width * 0.01}
            renderItem={({item, index}) => (
              <Animatable.View
                animation="slideInDown"
                duration={500}
                delay={index * 100}>
                <Pressable
                  key={index}
                  style={{
                    marginLeft: Dimensions.get('window').width * 0.02,
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
                  <View
                    style={
                      {
                        // marginLeft: Dimensions.get("window").width * 0.02,
                      }
                    }>
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
                        {`${item.nameKontrakan.slice(0, 14)}...`}
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
              </Animatable.View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodySearch: {
    backgroundColor: '#fff',
    marginHorizontal: Dimensions.get('window').width * 0.04,
    marginVertical: (Dimensions.get('window').width * 1) / 100,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtJudulSCreen: {
    fontFamily: fonts.primary[400],
    color: '#000',
    marginLeft: 10,
  },
  cardTamplate: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  kotaContent: {
    marginHorizontal: Dimensions.get('window').width * 0.04,
    marginVertical: (Dimensions.get('window').width * 1) / 100,
  },
  txtTitleContent: {
    fontSize: (Dimensions.get('window').width * 1) / 20,
    fontFamily: fonts.primary[600],
    color: '#000',
  },
  list: {
    paddingVertical: (Dimensions.get('window').height * 1) / 100,
    marginBottom: Dimensions.get('window').width * 0.02,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: "space-between"
  },
  imageKontrakanLainnya: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: 10,
  },
  textListLainnya: {
    fontSize: 15,
    color: '#000',
    fontFamily: fonts.primary[600],
    width: Dimensions.get('window').width * 0.6,
  },
  textListKota: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    fontFamily: fonts.primary[400],
  },
  harga: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    fontFamily: fonts.primary[600],
    position: 'absolute',
    right: 0,
  },
  listHorizontal: {
    marginVertical: Dimensions.get('window').width * 0.02,
    marginRight: Dimensions.get('window').width * 0.04,
  },
  cardHorizontal: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
  },
  textHarga: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    marginRight: Dimensions.get('window').width * 0.02,
    fontFamily: fonts.primary[400],
  },
});
