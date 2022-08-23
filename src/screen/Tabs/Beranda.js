import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  FlatList,
  Animated,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {auth, db} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {fonts} from '../../utils/Fonts';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {FlatGrid} from 'react-native-super-grid';
import {DragDrop} from '../../components/DragDrop';
import ViewDrag from '../../components/ViewDrag';
import ResultCaraosel from '../../components/Carousel/ResultCaraousel';

const Beranda = () => {
  const {currentUser} = auth;

  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };
  useEffect(() => {
    if (currentUser.emailVerified === false) {
      navigation.reset({
        index: 0,
        routes: [{name: 'LOGIN'}],
      });
      toastMessage({
        type: 'error',
        title: 'Gagal Verifikasi',
        message: 'Dimohon untuk verifikasi ulang agar email anda aktif',
      });
    }
  }, []);

  const [postingan, setPostingan] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const postinganKontrakan = query(
    collection(db, 'Kontrakan'),
    where('user', '!=', currentUser.uid),
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(postinganKontrakan, querySnapshot => {
      const parsedPostingKontrakan = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (loading) {
        setPostingan(parsedPostingKontrakan);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const [textWaktu, setTextWaktu] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      if (hours >= 3 && hours < 12) {
        setTextWaktu('Selamat Pagi');
      } else if (hours >= 12 && hours < 15) {
        setTextWaktu('Selamat Siang');
      } else if (hours >= 15 && hours < 18) {
        setTextWaktu('Selamat Sore');
      } else if (hours >= 18 && hours < 24) {
        setTextWaktu('Selamat Malam');
      } else if (hours >= 0 && hours < 3) {
        setTextWaktu('Selamat Malam');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [currentMinimalis, setCurrentMinimalis] = useState(4);
  const handleMinimalis = () => [setCurrentMinimalis(currentMinimalis + 2)];

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
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Animated.ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contenHeader}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.textJudul}>{textWaktu}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    marginRight: 12,
                  }}
                  onPress={() => navigation.navigate('SEARCHBERANDA')}>
                  <Feather name="search" size={24} color="#000" />
                </TouchableOpacity>
                <Image
                  source={{uri: currentUser.photoURL}}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30,
                  }}
                />
              </View>
            </View>
            <View></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            <View style={styles.bodyListLainnya}>
              <Image
                source={{
                  uri: 'https://asset.kompas.com/crops/5scnTRDeH4plPWPFLe8uKt6dSn0=/0x0:1000x667/750x500/data/photo/2022/06/17/62ac673f71587.jpg',
                }}
                style={{
                  width: Dimensions.get('window').width * 0.12,
                  borderRadius: 5,
                  height: Dimensions.get('window').width * 0.12,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.primary[400],
                    marginLeft: 12,
                    color: '#000',
                  }}>
                  Kota
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.primary[600],
                    marginLeft: 12,
                    color: '#000',
                  }}>
                  DKI JAKARTA
                </Text>
              </View>
            </View>
            <View style={styles.bodyListLainnya}>
              <Image
                source={{
                  uri: 'https://asset.kompas.com/crops/ASrd8SDELxvy5W746vwTgKyY52A=/0x0:780x520/750x500/data/photo/2021/09/29/6153ca424f2bc.jpg',
                }}
                style={{
                  width: Dimensions.get('window').width * 0.12,
                  borderRadius: 5,
                  height: Dimensions.get('window').width * 0.12,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.primary[400],
                    marginLeft: 12,
                    color: '#000',
                  }}>
                  Kota
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.primary[600],
                    marginLeft: 12,
                    color: '#000',
                  }}>
                  Bandung
                </Text>
              </View>
            </View>
            <View style={styles.bodyListLainnya}>
              <Image
                source={{
                  uri: 'https://asset-a.grid.id/crop/48x34:1739x1099/360x240/photo/2020/04/09/3695803642.jpeg',
                }}
                style={{
                  width: Dimensions.get('window').width * 0.12,
                  borderRadius: 5,
                  height: Dimensions.get('window').width * 0.12,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.primary[400],
                    marginLeft: 12,
                    color: '#000',
                  }}>
                  Kota
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.primary[600],
                    marginLeft: 12,
                    color: '#000',
                  }}>
                  Tanggerang
                </Text>
              </View>
            </View>
            <View
              style={{
                width: Dimensions.get('window').width * 0.45,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fonts.primary[400],
                    marginLeft: 12,
                    color: '#000',
                  }}>
                  Segera Hadir
                </Text>
                {/* icon arrow */}
                <AntDesign
                  name="arrowright"
                  size={24}
                  color="#000"
                  style={{
                    marginLeft: 12,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              marginVertical: Dimensions.get('window').width * 0.02,
            }}>
            <Text style={styles.textTOP} adjustsFontSizeToFit>
              Temukan berbagi pilihan kost di DKI JAKARTA
            </Text>
            <FlatList
              data={postingan
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .filter(
                  item =>
                    item.kota === 'Jakarta' ||
                    item.kota === 'Jakarta Utara' ||
                    item.kota === 'Jakarta Selatan' ||
                    item.kota === 'Jakarta Pusat' ||
                    item.kota === 'Jakarta Barat' ||
                    item.kota === 'Jakarta Timur',
                )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Animatable.View
                  animation="slideInRight"
                  duration={500}
                  delay={index * 100}>
                  <Pressable
                    style={{
                      marginVertical: Dimensions.get('window').width * 0.02,
                      marginLeft: Dimensions.get('window').width * 0.04,
                      marginRight: Dimensions.get('window').width * 0.02,
                    }}
                    onPress={() => navigation.navigate('TempatDetail', {item})}>
                    <Image
                      source={{uri: item.thumbnileImage}}
                      style={{
                        width: Dimensions.get('window').width * 0.4,
                        height: Dimensions.get('window').width * 0.4,
                      }}
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
                        <Text
                          style={{
                            fontSize: Dimensions.get('window').width * 0.03,
                            color: '#000',
                            fontFamily: fonts.primary[400],
                          }}>
                          {item.kota}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.textHarga}>Harga</Text>
                      <Text
                        style={{
                          fontSize: Dimensions.get('window').width * 0.03,
                          color: '#000',
                          fontFamily: fonts.primary[600],
                          position: 'absolute',
                          right: 0,
                        }}>
                        Rp.{' '}
                        {item.hargaKontrakan.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1,',
                        )}
                      </Text>
                    </View>
                  </Pressable>
                </Animatable.View>
              )}
            />
          </View>

          <View>
            <Text style={styles.textTOP}>Kost-an Minimalis</Text>
            <FlatGrid
              data={postingan
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .filter(item => item.modelKost === 'Minimalis')
                .slice(0, currentMinimalis)}
              keyExtractor={item => item.id}
              spacing={Dimensions.get('window').width * 0.02}
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
                </Animatable.View>
              )}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: (Dimensions.get('window').width * 2) / 80,
                marginBottom: (Dimensions.get('window').width * 2) / 80,
                alignItems: 'center',
              }}
              onPress={() => handleMinimalis()}>
              <Text
                style={{
                  fontFamily: fonts.primary[600],
                  color: '#FF1E00',
                  fontSize: (Dimensions.get('window').width * 2) / 60,
                }}>
                Lihat Lainnya
              </Text>
            </TouchableOpacity>
          </View>
          <ResultCaraosel />
          <View
            style={
              {
                // marginVertical: Dimensions.get("window").width * 0.02,
              }
            }>
            <Text style={styles.textTOP}>Rekomendasi</Text>
            <FlatList
              data={postingan
                .filter(item => item.modelKost === 'Biasa')
                .sort((a, b) => b.updatedAt - a.updatedAt)}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Animatable.View
                  animation="slideInDown"
                  duration={500}
                  delay={index * 100}>
                  <Pressable
                    style={{
                      marginVertical: Dimensions.get('window').width * 0.02,
                      marginLeft: Dimensions.get('window').width * 0.04,
                      marginRight: Dimensions.get('window').width * 0.02,
                    }}
                    onPress={() => navigation.navigate('TempatDetail', {item})}>
                    <Image
                      source={{uri: item.thumbnileImage}}
                      style={{
                        width: Dimensions.get('window').width * 0.4,
                        height: Dimensions.get('window').width * 0.4,
                      }}
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
                        <Text
                          style={{
                            fontSize: Dimensions.get('window').width * 0.03,
                            color: '#000',
                            fontFamily: fonts.primary[400],
                          }}>
                          {item.kota}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.textHarga}>Harga</Text>
                      <Text
                        style={{
                          fontSize: Dimensions.get('window').width * 0.03,
                          color: '#000',
                          fontFamily: fonts.primary[600],
                          position: 'absolute',
                          right: 0,
                        }}>
                        Rp.{' '}
                        {item.hargaKontrakan.replace(
                          /(\d)(?=(\d{3})+(?!\d))/g,
                          '$1,',
                        )}
                      </Text>
                    </View>
                  </Pressable>
                </Animatable.View>
              )}
            />
          </View>
          <Text
            style={{
              fontFamily: fonts.primary[400],
              color: '#000',
              textAlign: 'center',
              marginVertical: (Dimensions.get('window').width * 2) / 80,
              fontSize: (Dimensions.get('window').width * 2) / 60,
            }}>
            Mungkin Hari ini segini dulu
          </Text>
        </Animated.ScrollView>
        {/* <ViewDrag /> */}
      </SafeAreaView>
    );
  }
};

export default Beranda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentTextJudul: {
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.03,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  textJudul: {
    fontSize: (Dimensions.get('window').width * 2) / 30,
    color: '#d32521',
    fontFamily: fonts.primary[700],
  },
  bodyList: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
    borderRadius: Dimensions.get('window').height * 0.01,
    margin: Dimensions.get('window').width * 0.04,
    backgroundColor: '#fff',
  },
  imageKontrakan: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.3,
    borderTopLeftRadius: Dimensions.get('window').height * 0.01,
    borderTopRightRadius: Dimensions.get('window').height * 0.01,
  },
  bodyListText: {
    marginVertical: Dimensions.get('window').width * 0.02,
    // marginHorizontal: Dimensions.get('window').width * 0.02,
  },
  textList: {
    fontSize: 15,
    color: '#000',
    textTransform: 'capitalize',
    fontFamily: fonts.primary[700],
    width: Dimensions.get('window').width * 0.5,
  },
  textListKota: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    // paddingTop: Dimensions.get('window').height * 0.01,
    fontFamily: fonts.primary[400],
  },
  bodyPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: Dimensions.get('window').height * 0.02,
    // marginHorizontal: Dimensions.get('window').width * 0.02,
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
  textTOP: {
    fontSize: 12,
    color: '#000',
    fontFamily: fonts.primary[700],
    marginTop: Dimensions.get('window').height * 0.02,
    marginLeft: Dimensions.get('window').width * 0.04,
  },
  contenHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.01,
  },
  textAnimated: {
    padding: Dimensions.get('window').height * 0.01,
  },
  textAnimatedTitle: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: '#d32521',
    textTransform: 'capitalize',
    width: Dimensions.get('window').width * 0.6,
    fontFamily: fonts.primary[700],
  },
  image: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    borderRadius: Dimensions.get('window').width * 0.1,
  },
  textAnimatedDeskripsi: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    marginLeft: Dimensions.get('window').width * 0.02,
  },
  texInput: {
    backgroundColor: '#f4f4f4',
    marginVertical: Dimensions.get('window').height * 0.02,
    paddingHorizontal: Dimensions.get('window').width * 0.02,
    borderRadius: Dimensions.get('window').height * 0.01,
    paddingVertical: Dimensions.get('window').height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnSearch: {
    backgroundColor: '#d32521',
    padding: Dimensions.get('window').height * 0.01,
    borderRadius: Dimensions.get('window').height * 0.01,
  },
  ratingBaik: {
    position: 'absolute',
    right: Dimensions.get('window').width * 0.02,
    top: Dimensions.get('window').height * 0.02,
    backgroundColor: '#f4f4f4',
    padding: Dimensions.get('window').height * 0.01,
    borderRadius: Dimensions.get('window').height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textRating: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: '#000',
    fontFamily: fonts.primary[600],
    marginRight: Dimensions.get('window').width * 0.02,
  },
  bodyListLainnya: {
    paddingHorizontal: Dimensions.get('window').width * 0.04,
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
  },
  textListLainnya: {
    fontSize: 15,
    color: '#000',
    fontFamily: fonts.primary[600],
    width: Dimensions.get('window').width * 0.6,
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
});
