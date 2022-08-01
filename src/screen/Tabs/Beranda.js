import { StyleSheet, Text, View, Image, Dimensions, Pressable, FlatList, Animated, StatusBar, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { auth, db } from '../../config'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { fonts } from '../../utils/Fonts'
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';

const Beranda = () => {
  const { currentUser } = auth;

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
        routes: [{ name: 'LOGIN' }],
      })
      toastMessage({
        type: "error",
        title: "Gagal Verifikasi",
        message: "Dimohon untuk verifikasi ulang agar email anda aktif"
        
      });
    }
  },[])

  const [postingan, setPostingan] = useState([]);  
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);  
  const postinganKontrakan = query(collection(db, "Kontrakan"), where("user", "!=", currentUser.uid));

  useEffect(() => {
    const unsubscribe = onSnapshot(postinganKontrakan, (querySnapshot) => {
      const parsedPostingKontrakan = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      if (loading) {
        setPostingan(parsedPostingKontrakan);
        setLoading(false);
      }            
    })    
    return () => unsubscribe()    
  }, []);

  const textAnimated = [
    {
      id: 1,
      title: 'dapatkan berbagai macam kontrakan',
      description: 'Kontrakan yang kami sediakan adalah kontrakan yang berada di daerah yang kami sediakan',
    },
    {
      id: 2,
      title: 'berbagai pilihan kontrakan untukmu',
      description: 'Segera dapatkan kontrakan yang kamu inginkan',
    }
  ]

  const [listTextAnimation, setListTextAnimation] = useState(textAnimated)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1)
      if (index === listTextAnimation.length - 1) {
        setIndex(0)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [index])  


  // const sendNoti = () => {
  //   firestore().collection('usertoken').get().then(qurySnapshot => {
  //       const userDevicetoken = qurySnapshot.docs.map(docSnap => {
  //           return docSnap.data().token
  //       })
  //       console.log(userDevicetoken);
  //       fetch('https://a914-180-252-230-131.ap.ngrok.io/send-noti', {
  //           method: 'POST',
  //           headers: {
  //               'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //               tokens: userDevicetoken,
  //           })
  //       })
  //   })
  // }

  // const hnadleNotif = () => {
  //   sendNoti()
  // }


  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  
  
  return (
    <View style = {styles.container} >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" /> 
      <Animated.View style = {{        
        flexDirection: 'row', 
        alignItems: "center", 
        justifyContent: "space-between", 
        paddingHorizontal: Dimensions.get("window").width * 0.05, 
        height:insets.top + Dimensions.get('window').height * 0.1, 
        backgroundColor: "#fff",
        marginBottom: Dimensions.get("window").width * 0.02,
        opacity: scrollY.interpolate({
          inputRange: [90, 110],
          outputRange: [30, 0],
        }),
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [80, 120],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ],    
      }} >
        <Image source = {require('../../assets/logo_app.png')} style = {{width: Dimensions.get("window").width * 0.10, height: Dimensions.get("window").width * 0.10}} />
        <Text style = {styles.textJudul} >MAUKOST</Text>
        {!currentUser.photoURL ? (
          <Image source = {require('../../assets/user.png')} style = {styles.image} />
        ) : (
          <Image source = {{uri: currentUser.photoURL}} style = {styles.image} />
        )}
      </Animated.View>
      <Animated.View
        style={{
          zIndex: 2,
          position: 'absolute',          
          left: 0,
          right: 0,
          backgroundColor: "#fff",          
          paddingHorizontal: Dimensions.get("window").width * 0.05, 
          height:insets.top + Dimensions.get('window').height * 0.1, 
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          opacity: scrollY.interpolate({
            inputRange: [90, 110],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [90, 120],
                outputRange: [30, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <View style = {{
          flexDirection: "row",
          alignItems: "center",
        }} >
          {!currentUser.photoURL ? (
            <Image source = {require('../../assets/user.png')} style = {styles.image} />
          ) : (
            <Image source = {{uri: currentUser.photoURL}} style = {styles.image} />
          )}
          <View style = {{
            flexDirection: "column",
            marginLeft: Dimensions.get("window").width * 0.02,
          }} >
            <Text style = {{
              fontSize: Dimensions.get("window").width * 2 / 60,
              fontFamily: fonts.primary[600],
              color: "#000"
            }} >{currentUser.displayName}</Text>
            <Text style = {{
              fontSize: Dimensions.get("window").width * 2 / 65,
              fontFamily: fonts.primary[400],
              color: "#000"
            }} >{currentUser.email}</Text>
          </View>
        </View>
        <Image source = {require('../../assets/logo_app.png')} style = {{width: Dimensions.get("window").width * 0.10, height: Dimensions.get("window").width * 0.10}} />
      </Animated.View>
      <Animated.ScrollView style = {{flex: 1, zIndex: 1}}  
        showsVerticalScrollIndicator = {false}
        onScroll = {Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}],{useNativeDriver: true})}
      >
        <View style = {styles.contenHeader} >
          {listTextAnimation.map((item, indexes) => {
            if (index === indexes) {
              return (
                <Animated.View style = {styles.textAnimated} key={indexes} >                
                  <Animated.Text style = {styles.textAnimatedTitle} >{item.title}</Animated.Text>                
                  <TouchableOpacity style = {styles.texInput} onPress = {() => navigation.navigate("SEARCHBERANDA")} >
                    <Text style = {styles.textLabel} >Temukan disini untuk menjelajah</Text>                 
                    <View style = {styles.btnSearch} >
                      <Entypo name="grid" size={20} color="#fff" />
                    </View> 
                  </TouchableOpacity>
                </Animated.View>
              )
            }
          })}
        </View>
        {loading ? (
          <ScrollView showsVerticalScrollIndicator = {false} style = {{
            flex: 1
          }} >
              <View>
                  <ScrollView horizontal showsHorizontalScrollIndicator = {false} >
                      <SkeletonPlaceholder>
                          <View style = {{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                          }} >
                              <View>
                                  <View style={{
                                      margin: Dimensions.get('window').width * 0.04,
                                      width: Dimensions.get('window').width * 0.5, 
                                      height: Dimensions.get('window').width * 0.5, 
                                      borderTopLeftRadius: Dimensions.get('window').height * 0.01,
                                      borderTopRightRadius: Dimensions.get('window').height * 0.01,
                                  }} />
                                  <View
                                      style = {{
                                          marginVertical: Dimensions.get("window").width *0.02,
                                          marginHorizontal: Dimensions.get('window').width * 0.04,
                                          width: Dimensions.get('window').width * 0.5,
                                          height: Dimensions.get('window').width * 0.05,
                                          borderRadius: Dimensions.get('window').height * 0.01,
                                      }}
                                  />
                                  <View
                                      style = {{
                                          marginHorizontal: Dimensions.get('window').width * 0.04,
                                          width: Dimensions.get('window').width * 0.5,
                                          height: Dimensions.get('window').width * 0.05,
                                          borderRadius: Dimensions.get('window').height * 0.01,
                                      }}
                                  />
                              </View>
                              <View>
                                  <View style={{
                                      margin: Dimensions.get('window').width * 0.04,
                                      width: Dimensions.get('window').width * 0.5, 
                                      height: Dimensions.get('window').width * 0.5, 
                                      borderTopLeftRadius: Dimensions.get('window').height * 0.01,
                                      borderTopRightRadius: Dimensions.get('window').height * 0.01,
                                  }} />
                                  <View
                                      style = {{
                                          marginVertical: Dimensions.get("window").width *0.02,
                                          marginHorizontal: Dimensions.get('window').width * 0.04,
                                          width: Dimensions.get('window').width * 0.5,
                                          height: Dimensions.get('window').width * 0.05,
                                          borderRadius: Dimensions.get('window').height * 0.01,
                                      }}
                                  />
                                  <View
                                      style = {{
                                          marginHorizontal: Dimensions.get('window').width * 0.04,
                                          width: Dimensions.get('window').width * 0.5,
                                          height: Dimensions.get('window').width * 0.05,
                                          borderRadius: Dimensions.get('window').height * 0.01,
                                      }}
                                  />
                              </View>
                          </View>
                      </SkeletonPlaceholder>
                  </ScrollView>
              </View>
          </ScrollView>
        ) : (
          <View style = {{
            backgroundColor: "#fff",
            marginVertical: Dimensions.get("window").width * 0.02,
          }} >
            <Text style = {styles.textTOP} adjustsFontSizeToFit >Temukan berbagi pilihan kontrakan di DKI JAKARTA</Text>
            <FlatList
              data={postingan.sort((a, b) => b.updatedAt - a.updatedAt).filter(item => item.kota === "Jakarta" || item.kota === "Jakarta Utara" || item.kota === "Jakarta Selatan" || item.kota === "Jakarta Pusat" || item.kota === "Jakarta Barat" || item.kota === "Jakarta Timur")}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <Animatable.View
                  animation="slideInRight"
                  duration={500}
                  delay={index * 100}
                >
                  <Pressable key={index} style = {styles.bodyList} onPress = {() => navigation.navigate("TempatDetail", {item})} >
                    <View style = {styles.bodyListImage} >
                      <Image source={{uri: item.thumbnileImage}} style = {styles.imageKontrakan} />
                    </View>                  
                    {item.jumlahKamar === 0 ? (
                      <View style = {{
                        flexDirection: "row",
                        alignItems: 'center',
                        marginHorizontal: Dimensions.get("window").width * 0.02,
                        marginVertical: Dimensions.get("window").width * 0.02,
                      }} >
                        <AntDesign name="closecircle" size={12} color="red" />
                        <Text style = {{
                          fontSize: Dimensions.get("window").width / 30,
                          color: "#EB1D36",
                          fontFamily: fonts.primary[600],
                          marginLeft: Dimensions.get("window").width * 0.02,
                        }} >Kamar tidak tersedia</Text>
                      </View>
                    ) : (
                      <View style = {{
                        flexDirection: "row",
                        alignItems: 'center',                      
                        marginHorizontal: Dimensions.get("window").width * 0.02,
                        marginVertical: Dimensions.get("window").width * 0.02,
                      }} >
                        <AntDesign name="checkcircle" size={12} color="#2FDD92" />
                        <Text style = {{
                            fontSize: Dimensions.get("window").width / 30,
                            color: "#2FDD92",
                            fontFamily: fonts.primary[600],
                            marginLeft: Dimensions.get("window").width * 0.02,                                
                        }} >Kamar tersedia</Text>
                        
                      </View>
                    )}
                    
                    <View style = {styles.bodyListText} >
                      <Text style = {styles.textList} adjustsFontSizeToFit>{item.nameKontrakan}</Text>
                      <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                        <Entypo name="location-pin" size={15} color="black" />
                        <Text style = {styles.textListKota} adjustsFontSizeToFit numberOfLines={1}>{item.kota}</Text>
                      </View>
                    </View>
                    <View style = {styles.bodyPrice} >
                      <Text style = {styles.textHarga} adjustsFontSizeToFit numberOfLines={1} >Harga</Text>
                      <Text style = {styles.harga} adjustsFontSizeToFit numberOfLines={1} >Rp. {item.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                    </View>
                  </Pressable>

                </Animatable.View>
              )}
            />
            
          </View>
        )}
        {loading ? (
          <ScrollView showsVerticalScrollIndicator = {false} style = {{
            flex: 1
          }}  >
            <SkeletonPlaceholder>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get("window").width * 0.2, marginHorizontal: Dimensions.get("window").width * 0.04}}>
                      <View style={{width: 60, height: 60, }} />
                      <View style={{marginLeft: 20}}>
                          <View style={{width: 120, height: 20, borderRadius: 4}} />
                          <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
                      </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get("window").width * 0.2, marginHorizontal: Dimensions.get("window").width * 0.04}}>
                      <View style={{width: 60, height: 60, }} />
                      <View style={{marginLeft: 20}}>
                          <View style={{width: 120, height: 20, borderRadius: 4}} />
                          <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
                      </View>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get("window").width * 0.2, marginHorizontal: Dimensions.get("window").width * 0.04}}>
                      <View style={{width: 60, height: 60, }} />
                      <View style={{marginLeft: 20}}>
                          <View style={{width: 120, height: 20, borderRadius: 4}} />
                          <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
                      </View>
                  </View>
            </SkeletonPlaceholder>
          </ScrollView>
        ): (
          <View style = {{        
            // marginVertical: Dimensions.get("window").width * 0.02,
          }} >            
            <FlatList
              data={postingan}
              keyExtractor={(item) => item.id}          
              renderItem={({ item, index }) => (
                <Animatable.View
                  animation="slideInDown"
                  duration={500}
                  delay={index * 100}
                >
                  <Pressable key={index} style = {styles.bodyListLainnya} onPress = {() => navigation.navigate("TempatDetail", {item})} >
                    <View style = {styles.bodyListImageLainnya} >
                      <Image source={{uri: item.thumbnileImage}} style = {styles.imageKontrakanLainnya} />
                    </View>
                    <View style = {{
                      marginLeft: Dimensions.get("window").width * 0.02,
                    }} >
                      {item.jumlahKamar === 0 ? (
                      <View style = {{
                        flexDirection: "row",
                        alignItems: 'center',
                      }} >
                        <AntDesign name="closecircle" size={12} color="red" />
                        <Text style = {{
                          fontSize: Dimensions.get("window").width / 30,
                          color: "#EB1D36",
                          fontFamily: fonts.primary[600],
                          marginLeft: Dimensions.get("window").width * 0.02,
                        }} >Kamar tidak tersedia</Text>
                      </View>
                    ) : (
                      <View style = {{
                        flexDirection: "row",
                        alignItems: 'center',                      
                      }} >
                        <AntDesign name="checkcircle" size={12} color="#2FDD92" />
                        <Text style = {{
                            fontSize: Dimensions.get("window").width / 30,
                            color: "#2FDD92",
                            fontFamily: fonts.primary[600],
                            marginLeft: Dimensions.get("window").width * 0.02,                                
                        }} >Kamar tersedia</Text>
                      </View>
                    )}
                      <View style = {styles.bodyListTextLainnya} >
                        <Text style = {styles.textListLainnya} adjustsFontSizeToFit numberOfLines={1} >{item.nameKontrakan}</Text>
                        <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                          <Entypo name="location-pin" size={15} color="black" />
                          <Text style = {styles.textListKota} adjustsFontSizeToFit numberOfLines={1} >{item.kota}</Text>
                        </View>
                      </View>
                      <View style = {styles.bodyPrice} >
                        <Text style = {styles.textHarga} adjustsFontSizeToFit numberOfLines={1} >Harga</Text>
                        <Text style = {styles.harga} adjustsFontSizeToFit numberOfLines={1} >Rp. {item.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                      </View>
                    </View>
                  </Pressable>
                </Animatable.View>
              )}
            />
          </View>
        ) }
      </Animated.ScrollView>
    </View>
  )
}

export default Beranda

const styles = StyleSheet.create({
  container: {
    flex: 1,        
  },
  contentTextJudul: {
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.03,
    alignItems: 'center',
    backgroundColor: "#f4f4f4"
  }, 
  textJudul: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",
    fontFamily: fonts.primary[700]
  },
  textJudul2: {
    fontSize: Dimensions.get('window').width * 0.09,
    color: "#d32521",
    fontWeight: 'bold',
  },
  bodyList: {
    borderWidth: 1,
    borderColor: '#f4f4f4',    
    borderRadius: Dimensions.get('window').height * 0.01,
    margin: Dimensions.get('window').width * 0.04,
    backgroundColor: "#fff",
  },
  imageKontrakan: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.3,
    borderTopLeftRadius: Dimensions.get('window').height * 0.01,
    borderTopRightRadius: Dimensions.get('window').height * 0.01,
  },
  bodyListText: {
    marginVertical: Dimensions.get('window').width * 0.02,
    marginHorizontal: Dimensions.get('window').width * 0.02,
  },
  textList: {
    fontSize: 15,
    color: "#000",    
    textTransform: 'capitalize',
    fontFamily: fonts.primary[700],
    width: Dimensions.get('window').width * 0.5,

  },
  textListKota: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",
    paddingTop: Dimensions.get('window').height * 0.01,
    fontFamily: fonts.primary[400]
  },
  bodyPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Dimensions.get('window').height * 0.02,
    marginHorizontal: Dimensions.get('window').width * 0.02,    
  },
  textHarga: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",
    marginRight: Dimensions.get('window').width * 0.02,    
    fontFamily: fonts.primary[400]
  },
  harga: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: "#000",
    fontFamily: fonts.primary[600]
  },
  textTOP: {
    fontSize: 12,
    color: "#000",
    fontFamily: fonts.primary[700],
    marginTop: Dimensions.get('window').height * 0.02,
    marginLeft: Dimensions.get('window').width * 0.04,
  },
  contenHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.01,
  },
  textAnimated: {    
    padding: Dimensions.get('window').height * 0.01,        
  },
  textAnimatedTitle: {
    fontSize: Dimensions.get('window').width * 0.04,
    color: "#d32521",
    textTransform: 'capitalize',    
    width: Dimensions.get('window').width * 0.6,
    fontFamily: fonts.primary[700]
  },
  image: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
    borderRadius: Dimensions.get('window').width * 0.1,
  },
  textAnimatedDeskripsi: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",
    marginLeft: Dimensions.get('window').width * 0.02,
  },
  texInput: {    
    backgroundColor: "#f4f4f4",
    marginVertical: Dimensions.get('window').height * 0.02,
    paddingHorizontal: Dimensions.get('window').width * 0.02,    
    borderRadius: Dimensions.get('window').height * 0.01,
    paddingVertical: Dimensions.get('window').height * 0.01,    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  btnSearch: {
    backgroundColor: "#d32521",
    padding: Dimensions.get('window').height * 0.01,
    borderRadius: Dimensions.get('window').height * 0.01,
  },
  ratingBaik: {
    position: "absolute",
    right: Dimensions.get('window').width * 0.02,
    top: Dimensions.get('window').height * 0.02,    
    backgroundColor: "#f4f4f4",
    padding: Dimensions.get('window').height * 0.01,
    borderRadius: Dimensions.get('window').height * 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textRating: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",
    fontFamily: fonts.primary[600],
    marginRight: Dimensions.get('window').width * 0.02    
  },
  bodyListLainnya: {
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').width * 0.02,
    flexDirection: "row",
    backgroundColor: "#fff",
    // justifyContent: "space-between"
  },
  imageKontrakanLainnya: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
  },
  textListLainnya: {
    fontSize: 15,
    color: "#000",
    fontFamily: fonts.primary[600],
    width: Dimensions.get('window').width * 0.6,
  },
  ratingBaikLainnya: {
    flexDirection: "row",
    alignItems: 'center',
    position: "absolute",
    right: Dimensions.get('window').width * 0.02,
    top: Dimensions.get('window').height * 0.01
    ,
  },  
  textLainnya: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",    
    backgroundColor: "#fff",
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.01,
    fontFamily: fonts.primary[700]

  },
  textLabel: {
    fontSize: Dimensions.get('window').width * 0.03,
    fontFamily: fonts.primary[400],
    color: "#000"
  }
})