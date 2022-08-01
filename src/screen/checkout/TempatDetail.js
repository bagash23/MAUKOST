import { StyleSheet, Text, View, Image, Pressable, Dimensions, Animated, SafeAreaView, TouchableOpacity, ScrollView, TextInput, FlatList, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImageView from 'react-native-image-viewing'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { addDoc, getDoc, setDoc, updateDoc, collection, query, doc, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config';
import { fonts } from '../../utils/Fonts';
import Toast from 'react-native-toast-message';
import { Rating, AirbnbRating } from 'react-native-ratings';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import call from 'react-native-phone-call'
import { v4 as uuidv4 } from 'uuid'
import { UseForm } from '../../utils';

const TempatDetail = () => {
    const route = useRoute();
    const DetilKontrakan = route.params.item;    
    const navigation = useNavigation()
    const randomImage = DetilKontrakan.detilImage
    const idKontrakan = DetilKontrakan.id
    const [form, setForm] = useState('')
    const { currentUser } = auth;

    const [listKomentar, setListKomentar] = useState([]);    
    const queryKomentar = query(collection(db, "Komentar"), where("kontrakanId", "==", idKontrakan))
    useEffect(() => {
        const unsubscribe = onSnapshot(queryKomentar, querySnapshot => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setListKomentar(data)
        })
        return () => unsubscribe()
    },[])

    const [jumlahKomentar, setJumlahKomentar] = useState(0)
    console.log(jumlahKomentar);
    useEffect(() => {
        const unsubscribe = onSnapshot(queryKomentar, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setJumlahKomentar(data.length)
        })
        return () => unsubscribe()
    },[])


    // const lokalContext = createContext({
    //     rooms: [],
    //     setRooms: () => { },
    //     unfilteredRooms: [],
    //     setUnfilteredRooms: () => {},
    // })

    // const { rooms, setRooms, unfilteredRooms, setUnfilteredRooms } = useContext(lokalContext)

    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };
    
    const [showMore, setShowMore] = useState(false)
    const postDetail = DetilKontrakan.descriptionKontrakan;
    const randomId = uuidv4();
    
    // scroll header
    let AnimatedHeaderValue = new Animated.Value(0)
    const header_Max_Height = Dimensions.get('window').height - 680;
    const header_Min_Height = Dimensions.get('window').height - 680;

    const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
        inputRange: [0, header_Max_Height - header_Min_Height],
        outputRange: ['transparent', 'white'],
        extrapolate: 'spring'
    });

    const animateHeaderTextSize = AnimatedHeaderValue.interpolate({
        inputRange: [0, header_Max_Height - header_Min_Height],
        outputRange: [header_Max_Height, header_Min_Height],
        extrapolate: 'spring'
    });    

    const handlePress = () => {                
        if (DetilKontrakan.jumlahKamar === 0) {
            toastMessage({
                type: "error",
                title: "Gagal Pemesanan",
                message: "Jumlah kamar tidak boleh melebihi jumlah kamar yang tersedia"
            })        
        } else {
            navigation.navigate("DAFTARBOOK", {DetilKontrakan})
        }
    }

    const senderUsersKomentar = {
        displayName: currentUser.displayName,
        uid: currentUser.uid,
        photoURL: currentUser.photoURL,
        email: currentUser.email,
    }


    const [loading, setLoading] = useState(false);
    if (loading) {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={loading}
                style={{ zIndex: 1100 }}
                onRequestClose={() => { }}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    backgroundColor: '#rgba(0, 0, 0, 0.5)',
                    zIndex: 1000
                }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        height: 100,
                        width: 100,
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around'
                    }}>
                        <ActivityIndicator animating={loading} color="black" />
                    </View>
                </View>
            </Modal>
        )
    }

    const handleRating = async () => {
        try {
            setLoading(true);
            const KomentarData = {
                id: randomId,
                userData: senderUsersKomentar,
                kontrakanId: idKontrakan,
                komentar: form,
                createdAt: new Date(),
            }
            await Promise.all([
                setDoc(doc(db, "Komentar", randomId), KomentarData).then(() => {
                    toastMessage({
                        type: 'success',
                        title: "Berhasil",
                        message: "Berhasil memberikan komentar",
                    })
                    setForm(null)
                    setLoading(false);
                })
            ])

        } catch (error) {
            console.log(error);
            toastMessage({
                type: 'error',
                title: "Gagal",
                message: "Gagal memberikan komentar",
            })
        }
    }
    const triggerCall = () => {
        const args = {
            number: DetilKontrakan.phonePemilik,
            prompt: false
        }
        call(args).catch(console.error)
    }

    if (currentUser.uid === DetilKontrakan.idUsers) {
        return (
            <SafeAreaView style = {styles.container} >
                <Animated.View style = {[styles.containerHeader, {
                    backgroundColor: animateHeaderBackgroundColor,
                    height: animateHeaderTextSize
                }]}  >
                    <AntDesign name="left" size={20} color="#000" onPress={() => navigation.goBack()} />
                    <Text style = {{
                        fontSize: Dimensions.get("window").width * 0.04,
                        color: "#000",
                        fontFamily: fonts.primary[600],
                        textTransform: "capitalize",
                    }} >{DetilKontrakan.nameKontrakan}</Text>               
                    {/* <TouchableOpacity onPress={pressLove} style = {{
                        backgroundColor: "#f4f4f4",
                        padding: Dimensions.get("window").width * 0.02,
                        borderRadius: Dimensions.get("window").width * 0.05,
                        alignItems: 'center'
                    }}  >
                        {love ? <Entypo name="heart" size={20} color="red" /> 
                        : <Entypo name="heart-outlined" size={20} color="#000"/>}
                    </TouchableOpacity>  */}
                </Animated.View>
                <ScrollView
                    scrollEventThrottle = {16}
                    onScroll = {Animated.event([{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}], {useNativeDriver: false})}
                >
                    
                    <View style = {styles.contentImage} >
                        <View style = {styles.bgOpacity} />
                        <Image source={{uri: DetilKontrakan.thumbnileImage}} style = {styles.gambarKontrakan} />
                    </View>
                    {DetilKontrakan.jumlahKamar === 0 ? (
                        <Animated.View style = {{
                            flexDirection: "row",
                            alignItems: 'center',
                            paddingHorizontal: Dimensions.get("window").width * 0.05,
                            paddingVertical: Dimensions.get("window").width * 0.03,                        
                        }} >
                            <AntDesign name="closecircle" size={20} color="red" />
                            <Animated.Text style = {styles.textKosong} >Kamar tidak tersedia</Animated.Text>
                        </Animated.View>
                    ) : (
                        <Animated.View style = {{
                            flexDirection: "row",
                            alignItems: 'center',
                            paddingHorizontal: Dimensions.get("window").width * 0.05,
                            paddingVertical: Dimensions.get("window").width * 0.03,
                        }} >
                            <AntDesign name="checkcircle" size={20} color="#2FDD92" />
                            <Animated.Text style = {{
                                fontSize: Dimensions.get("window").width / 30,
                                color: "#2FDD92",
                                fontFamily: fonts.primary[600],
                                marginLeft: Dimensions.get("window").width * 0.02,                                
                            }} >Kamar tersedia</Animated.Text>                        
                        </Animated.View>
                    )}
                    
                    <Text style = {styles.textNama} >{DetilKontrakan.nameKontrakan}</Text>            
                    {postDetail.length > 200 ? (
                        showMore ? (
                            <View>
                                <Text style={styles.txtDsc}>{DetilKontrakan.descriptionKontrakan}</Text>
                                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                    <Text style={styles.seeMore}>Hide</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.txtDsc}>
                                    {`${DetilKontrakan.descriptionKontrakan.slice(0, 80)}... `}
                                </Text>
                                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                    <Text style={styles.seeMore}>See More</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    ): (
                        <Text style = {styles.txtDsc} >{DetilKontrakan.descriptionKontrakan}</Text>
                    )}

                    <Text style = {{
                        fontSize: Dimensions.get("window").width / 25,
                        color: "#000",
                        fontFamily: fonts.primary[600],
                        paddingHorizontal: Dimensions.get("window").width * 0.05,
                        paddingVertical: Dimensions.get("window").width * 0.03,
                    }} >Fasilitas</Text>
                    <FlatList
                        data={DetilKontrakan.fasilitas}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <View style = {{
                                paddingHorizontal: Dimensions.get("window").width * 0.05,
                            }} >
                                <Text style = {{
                                    fontSize: Dimensions.get("window").width / 30,
                                    color: "#000",
                                    fontFamily: fonts.primary[400],
                                }} >{item }</Text>
    
    
                            </View>
                        )}
                    />

                    <View style = {{
                        flexDirection: "row",                
                        marginVertical: Dimensions.get("window").height * 0.02,                
                        alignItems: "center",                    
                        marginHorizontal: Dimensions.get("window").width * 0.05,
                        
                    }} >
                        {/* <TouchableOpacity
                            onPress={() => {
                                setShow(true)
                                setSelectedImageView(DetilKontrakan.detilImage)
                            }}
                        > */}
                            <Image source={{uri: randomImage.image1}} style = {{
                                width: Dimensions.get("window").width * 0.30,
                                height: Dimensions.get("window").width * 0.30,
                                borderRadius: Dimensions.get("window").width * 0.01,
                            }} />
                            {/* {(selectedImageView) ? (
                                <ImageView imageIndex={0} visible={show} onRequestClose={() => setShow(false)} images = {selectedImageView} />
                            ):null}
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            onPress={() => {
                                setShow2(true)
                                setSelectedImageView2(selectedImageView)
                            }}
                        > */}
                            <Image source={{uri: randomImage.image2}} style = {{
                                width: Dimensions.get("window").width * 0.30,
                                height: Dimensions.get("window").width * 0.30,
                                borderRadius: Dimensions.get("window").width * 0.01,
                                marginHorizontal: Dimensions.get("window").width * 0.01,
                            }}/>
                            {/* {(selectedImageView2) ? (
                                <ImageView imageIndex={0} visible={show2} onRequestClose={() => setShow2(false)} images = {selectedImageView2} />
                            ):null}
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            onPress={() => {
                                setShow3(true)
                                setSelectedImageView3(selectedImageView3)
                            }}
                        > */}
                            <Image source={{uri: randomImage.image3}} style = {{
                                width: Dimensions.get("window").width * 0.30,
                                height: Dimensions.get("window").width * 0.30,
                                borderRadius: Dimensions.get("window").width * 0.01,
                            }}/>
                            {/* {(selectedImageView3) ? (
                                <ImageView imageIndex={0} visible={show3} onRequestClose={() => setShow3(false)} images = {selectedImageView3} />
                            ):null}
                        </TouchableOpacity> */}
                    </View>
                    <View style = {styles.contentOwner} >
                        <View style = {{
                            flexDirection: "row",
                            alignItems: 'center',
                        }} >
                            <Image source={{uri: DetilKontrakan.avatarImage}} style = {styles.avatarOwner} />
                            <View style = {{
                                paddingHorizontal: Dimensions.get('window').width * 0.02,
                            }} >
                                <Text style = {styles.harga} >{DetilKontrakan.namePemilik}</Text>
                                <Text style = {styles.hargaBulanan} >Mitra</Text>
                            </View>
                        </View>
                        <TouchableOpacity style = {{
                            backgroundColor: "#3EC70B",
                            padding: Dimensions.get('window').width * 0.02,
                            borderRadius: Dimensions.get('window').width * 0.05,
                        }} 
                            onPress={triggerCall}
                        >
                            <Ionicons name='call' size={Dimensions.get('window').width * 0.03} color="#fff" />
                        </TouchableOpacity>

                    </View>
                    <View style = {styles.contentAddress} >
                        <View style = {{
                            marginVertical: Dimensions.get("window").height * 0.01,
                        }} >
                            <Text style = {styles.hargaBulanan} >Alamat: </Text>
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                color: "#000",
                                fontFamily: fonts.primary[400],
                                textTransform: "capitalize"
                            }} >{DetilKontrakan.addressKontrakan}</Text>
                        </View>
                        <View style = {{
                            marginVertical: Dimensions.get("window").height * 0.01,
                        }} >
                            <Text style = {styles.hargaBulanan} >Kota: </Text>
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                color: "#000",
                                fontFamily: fonts.primary[400],
                                textTransform: "capitalize"
                            }} >{DetilKontrakan.kota}</Text>
                        </View>
                        <View style = {{
                            marginVertical: Dimensions.get("window").height * 0.01,
                        }} >
                            <Text style = {styles.hargaBulanan} >Kamar Tersedia</Text>                        
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                color: "#000",
                                fontFamily: fonts.primary[400],
                                textTransform: "capitalize"
                            }} >{DetilKontrakan.jumlahKamar} Kamar</Text>
                        </View>
                        <View style = {{
                            marginVertical: Dimensions.get("window").height * 0.01,
                        }} >                   
                            <Text style = {styles.hargaBulanan} >Harga Kamar</Text>
                            <Text style = {styles.harga} >Rp. {DetilKontrakan.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            <Text style = {styles.hargaBulanan} >Bulan</Text>
                        </View>  
                    </View>
                    {listKomentar.length > 0 ? (
                        <View>
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                fontFamily: fonts.primary[600],
                                color: "#000",
                                padding: Dimensions.get("window").width * 0.05,
                            }} >Komentar {jumlahKomentar}</Text>
                            <FlatList
                                data={listKomentar.sort((a,b) => b.createdAt - a.createdAt)}
                                keyExtractor={(item) => item.id}
                                renderItem={({item, index}) => {
                                    return (
                                        <View key={index} style = {{
                                            flexDirection: "row",
                                            alignItems: 'center',
                                            paddingHorizontal: Dimensions.get('window').width * 0.05,
                                            paddingVertical: Dimensions.get('window').width * 0.02,
                                        }} >
                                            <Image source={{uri: item.userData.photoURL}} style= {styles.avatarOwner} />
                                            <View style = {{
                                                marginLeft: Dimensions.get('window').width * 0.02,
                                            }} >
                                                <Text style = {{
                                                    fontSize: Dimensions.get("window").width * 2 / 60,
                                                    fontFamily: fonts.primary[600],
                                                    color: "#000"
                                                }} >{item.userData.displayName}</Text>
                                                <Text style = {{
                                                    fontSize: Dimensions.get("window").width * 2 / 70,
                                                    fontFamily: fonts.primary[400],
                                                    color: "#000",
                                                    width: Dimensions.get("window").width * 0.8,
                                                }} >{item.komentar}</Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    ):(
                        <View style = {{
                            alignItems: "center"
                        }} >
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 2 / 60,
                                fontFamily: fonts.primary[600],
                                color: "#000",
                            }} > Belum Ada Komentar </Text>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        )

    } else {
        return (
            <SafeAreaView style = {styles.container} >
                <Animated.View style = {[styles.containerHeader, {
                    backgroundColor: animateHeaderBackgroundColor,
                    height: animateHeaderTextSize
                }]}  >
                    <AntDesign name="left" size={20} color="#000" onPress={() => navigation.goBack()} />
                    <Text style = {{
                        fontSize: Dimensions.get("window").width * 0.04,
                        color: "#000",
                        fontFamily: fonts.primary[600],
                        textTransform: "capitalize",
                    }} >{DetilKontrakan.nameKontrakan}</Text>               
                </Animated.View>
                <ScrollView
                    scrollEventThrottle = {16}
                    onScroll = {Animated.event([{nativeEvent: {contentOffset: {y: AnimatedHeaderValue}}}], {useNativeDriver: false})}
                >
                    
                    <View style = {styles.contentImage} >
                        <View style = {styles.bgOpacity} />
                        <Image source={{uri: DetilKontrakan.thumbnileImage}} style = {styles.gambarKontrakan} />
                    </View>
                    {DetilKontrakan.jumlahKamar === 0 ? (
                        <Animated.View style = {{
                            flexDirection: "row",
                            alignItems: 'center',
                            paddingHorizontal: Dimensions.get("window").width * 0.05,
                            paddingVertical: Dimensions.get("window").width * 0.03,                        
                        }} >
                            <AntDesign name="closecircle" size={20} color="red" />
                            <Animated.Text style = {styles.textKosong} >Kamar tidak tersedia</Animated.Text>
                        </Animated.View>
                    ) : (
                        <Animated.View style = {{
                            flexDirection: "row",
                            alignItems: 'center',
                            paddingHorizontal: Dimensions.get("window").width * 0.05,
                            paddingVertical: Dimensions.get("window").width * 0.03,
                        }} >
                            <AntDesign name="checkcircle" size={20} color="#2FDD92" />
                            <Animated.Text style = {{
                                fontSize: Dimensions.get("window").width / 30,
                                color: "#2FDD92",
                                fontFamily: fonts.primary[600],
                                marginLeft: Dimensions.get("window").width * 0.02,                                
                            }} >Kamar tersedia</Animated.Text>                        
                        </Animated.View>
                    )}
                    
                    <Text style = {styles.textNama} >{DetilKontrakan.nameKontrakan}</Text>            
                    {postDetail.length > 200 ? (
                        showMore ? (
                            <View>
                                <Text style={styles.txtDsc}>{DetilKontrakan.descriptionKontrakan}</Text>
                                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                    <Text style={styles.seeMore}>Hide</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.txtDsc}>
                                    {`${DetilKontrakan.descriptionKontrakan.slice(0, 80)}... `}
                                </Text>
                                <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                    <Text style={styles.seeMore}>See More</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    ): (
                        <Text style = {styles.txtDsc} >{DetilKontrakan.descriptionKontrakan}</Text>
                    )}

                    <Text style = {{
                        fontSize: Dimensions.get("window").width / 25,
                        color: "#000",
                        fontFamily: fonts.primary[600],
                        paddingHorizontal: Dimensions.get("window").width * 0.05,
                        paddingVertical: Dimensions.get("window").width * 0.03,
                    }} >Fasilitas</Text>
                    <FlatList
                        data={DetilKontrakan.fasilitas}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <View style = {{
                                paddingHorizontal: Dimensions.get("window").width * 0.05,
                            }} >
                                <Text style = {{
                                    fontSize: Dimensions.get("window").width / 30,
                                    color: "#000",
                                    fontFamily: fonts.primary[400],
                                }} >{item }</Text>
    
    
                            </View>
                        )}
                    />

                    <View style = {{
                        flexDirection: "row",                
                        marginVertical: Dimensions.get("window").height * 0.02,                
                        alignItems: "center",                    
                        marginHorizontal: Dimensions.get("window").width * 0.05,
                        
                    }} >
                        {/* <TouchableOpacity
                            onPress={() => {
                                setShow(true)
                                setSelectedImageView(DetilKontrakan.detilImage)
                            }}
                        > */}
                            <Image source={{uri: randomImage.image1}} style = {{
                                width: Dimensions.get("window").width * 0.30,
                                height: Dimensions.get("window").width * 0.30,
                                borderRadius: Dimensions.get("window").width * 0.01,
                            }} />
                            {/* {(selectedImageView) ? (
                                <ImageView imageIndex={0} visible={show} onRequestClose={() => setShow(false)} images = {selectedImageView} />
                            ):null}
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            onPress={() => {
                                setShow2(true)
                                setSelectedImageView2(selectedImageView)
                            }}
                        > */}
                            <Image source={{uri: randomImage.image2}} style = {{
                                width: Dimensions.get("window").width * 0.30,
                                height: Dimensions.get("window").width * 0.30,
                                borderRadius: Dimensions.get("window").width * 0.01,
                                marginHorizontal: Dimensions.get("window").width * 0.01,
                            }}/>
                            {/* {(selectedImageView2) ? (
                                <ImageView imageIndex={0} visible={show2} onRequestClose={() => setShow2(false)} images = {selectedImageView2} />
                            ):null}
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity
                            onPress={() => {
                                setShow3(true)
                                setSelectedImageView3(selectedImageView3)
                            }}
                        > */}
                            <Image source={{uri: randomImage.image3}} style = {{
                                width: Dimensions.get("window").width * 0.30,
                                height: Dimensions.get("window").width * 0.30,
                                borderRadius: Dimensions.get("window").width * 0.01,
                            }}/>
                            {/* {(selectedImageView3) ? (
                                <ImageView imageIndex={0} visible={show3} onRequestClose={() => setShow3(false)} images = {selectedImageView3} />
                            ):null}
                        </TouchableOpacity> */}
                    </View>
                    <View style = {styles.contentOwner} >
                        <View style = {{
                            flexDirection: "row",
                            alignItems: 'center',
                        }} >
                            <Image source={{uri: DetilKontrakan.avatarImage}} style = {styles.avatarOwner} />
                            <View style = {{
                                paddingHorizontal: Dimensions.get('window').width * 0.02,
                            }} >
                                <Text style = {styles.harga} >{DetilKontrakan.namePemilik}</Text>
                                <Text style = {styles.hargaBulanan} >Mitra</Text>
                            </View>
                        </View>

                            <TouchableOpacity style = {{
                                backgroundColor: "#3EC70B",
                                padding: Dimensions.get('window').width * 0.02,
                                borderRadius: Dimensions.get('window').width * 0.05,
                            }} 
                                onPress={triggerCall}
                            >
                                <Ionicons name='call' size={Dimensions.get('window').width * 0.03} color="#fff" />
                            </TouchableOpacity>                        

                    </View>
                    <View style = {styles.contentAddress} >
                        <View style = {{
                            marginVertical: Dimensions.get("window").height * 0.01,
                        }} >
                            <Text style = {styles.hargaBulanan} >Alamat: </Text>
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                color: "#000",
                                fontFamily: fonts.primary[400],
                                textTransform: "capitalize"
                            }} >{DetilKontrakan.addressKontrakan}</Text>
                        </View>
                        <View style = {{
                            marginVertical: Dimensions.get("window").height * 0.01,
                        }} >
                            <Text style = {styles.hargaBulanan} >Kota: </Text>
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                color: "#000",
                                fontFamily: fonts.primary[400],
                                textTransform: "capitalize"
                            }} >{DetilKontrakan.kota}</Text>
                        </View>
                        <View style = {{
                            marginVertical: Dimensions.get("window").height * 0.01,
                        }} >
                            <Text style = {styles.hargaBulanan} >Kamar Tersedia</Text>                        
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                color: "#000",
                                fontFamily: fonts.primary[400],
                                textTransform: "capitalize"
                            }} >{DetilKontrakan.jumlahKamar} Kamar</Text>
                        </View>
                        
                    </View>
                    {listKomentar.length > 0 ? (
                        <View>
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 0.04,
                                fontFamily: fonts.primary[600],
                                color: "#000",
                                padding: Dimensions.get("window").width * 0.05,
                            }} >Komentar {jumlahKomentar}</Text>
                            <FlatList
                                data={listKomentar.sort((a,b) => b.createdAt - a.createdAt)}
                                keyExtractor={(item) => item.id}
                                renderItem={({item, index}) => {
                                    return (
                                        <View key={index} style = {{
                                            flexDirection: "row",
                                            alignItems: 'center',
                                            paddingHorizontal: Dimensions.get('window').width * 0.05,
                                            paddingVertical: Dimensions.get('window').width * 0.02,
                                        }} >
                                            <Image source={{uri: item.userData.photoURL}} style= {styles.avatarOwner} />
                                            <View style = {{
                                                marginLeft: Dimensions.get('window').width * 0.02,
                                            }} >
                                                <Text style = {{
                                                    fontSize: Dimensions.get("window").width * 2 / 60,
                                                    fontFamily: fonts.primary[600],
                                                    color: "#000"
                                                }} >{item.userData.displayName}</Text>
                                                <Text style = {{
                                                    fontSize: Dimensions.get("window").width * 2 / 70,
                                                    fontFamily: fonts.primary[400],
                                                    color: "#000",
                                                    width: Dimensions.get("window").width * 0.8,
                                                }} >{item.komentar}</Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    ):(
                        <View style = {{
                            alignItems: "center"
                        }} >
                            <Text style = {{
                                fontSize: Dimensions.get("window").width * 2 / 60,
                                fontFamily: fonts.primary[600],
                                color: "#000",
                            }} > Belum Ada Komentar </Text>
                        </View>
                    )}
                </ScrollView>
                <View style = {{
                    paddingVertical: Dimensions.get("window").width * 1 / 50,
                    paddingHorizontal: Dimensions.get("window").width * 1 / 50,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }} >
                    <View style = {{flexDirection: "row", alignItems: "center"}} >
                        <Image source={{uri: currentUser.photoURL}} style = {{
                            width: Dimensions.get('window').width * 2 / 20,
                            height: Dimensions.get('window').width * 2 / 20,
                            borderRadius: Dimensions.get("window").width * 0.05
                        }} />
                        <TextInput
                            placeholder='Tulis Komentar'
                            style = {{
                                width: Dimensions.get('window').width * 15 / 20,
                                paddingHorizontal: Dimensions.get('window').width * 2 / 60,
                                borderBottomWidth: 1,
                                borderBottomColor: "#f4f4f4"
                            }}
                            value={form}
                            onChangeText={(text) => setForm(text)}
                        />

                    </View>
                    <TouchableOpacity 
                        onPress = {handleRating}
                        disabled={!form}
                    >
                        <Text style = {{
                            fontSize: Dimensions.get("window").width * 2 / 60,
                            fontFamily: fonts.primary[400],
                            color: "#000"
                        }} >Kirim</Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style = {styles.bottomCheck} >
                    <View style = {styles.bodyPrice} >                    
                        <Text style = {styles.harga} >Rp. {DetilKontrakan.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                        <Text style = {styles.hargaBulanan} >Bulan</Text>
                    </View>
                    <TouchableOpacity style = {styles.btnPemilik} onPress = {handlePress} >
                        <Text style = {{
                            fontSize: Dimensions.get("window").width * 0.03,
                            color: "#fff",
                            fontFamily: fonts.primary[600]
                        }} >Pesan Sekarang</Text>
                    </TouchableOpacity>
                </Animated.View>            
            </SafeAreaView>
        )
    }
}

export default TempatDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    contentImage: {        
        alignItems: 'center',
        justifyContent: 'center',        
    },
    gambarKontrakan: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
    },
    containerHeader: {
        backgroundColor: "white",    
        flexDirection: "row",
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        justifyContent: "space-between",
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    bgOpacity: {
        backgroundColor: "rgba(225,225,225, 0.4)",
        height: Dimensions.get("window").height * 0.3,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    textNama: {
        fontSize: Dimensions.get("window").width * 0.04,                
        color: "#000",
        marginHorizontal: Dimensions.get("window").width * 0.05,
        fontFamily: fonts.primary[700],
    },
    txtDsc: {
        fontSize: Dimensions.get("window").width * 0.04,        
        paddingTop: Dimensions.get("window").width * 0.02,
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        fontFamily: fonts.primary[400],
    },
    
    seeMore: {        
        color: "#0e5cff",
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        fontSize: Dimensions.get("window").width * 0.03,
        marginHorizontal: Dimensions.get("window").width * 0.05,
        fontFamily: fonts.primary[400],
    },
    grid: {
        marginTop: Dimensions.get("window").height * 0.02,
        marginBottom: Dimensions.get("window").height * 0.02,    
        height: Dimensions.get("window").width * 0.8,
    },
    bottomCheck: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        padding: Dimensions.get("window").width * 0.05,
        borderTopWidth: 1,
        borderTopColor: "#e6e6e6",
    },
    harga: {
        fontSize: Dimensions.get("window").width * 0.04,        
        color: "#000",
        fontFamily: fonts.primary[400],
    },
    hargaBulanan: {
        fontSize: Dimensions.get("window").width * 0.03,
        color: "#000",
        fontFamily: fonts.primary[700]
    },
    avatarOwner: {
        width: Dimensions.get("window").width * 0.1,
        height: Dimensions.get("window").width * 0.1,
        borderRadius: Dimensions.get("window").width * 0.1,
    },
    contentOwner: {
        flexDirection: "row",
        alignItems: 'center',
        margin: Dimensions.get("window").width * 0.05,
        justifyContent: "space-between"
    },
    btnPemilik: {
        backgroundColor: "#d32521",
        width: Dimensions.get("window").width * 0.5,
        height: Dimensions.get("window").width * 0.1,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: Dimensions.get("window").width * 0.1,
    },
    contentAddress: {
        paddingHorizontal: Dimensions.get("window").width * 0.05,
    },
    textKosong: {
        fontSize: Dimensions.get("window").width / 30,
        color: "#EB1D36",
        fontFamily: fonts.primary[600],
        marginLeft: Dimensions.get("window").width * 0.02,        
    }
})

// link wa 
// https://api.whatsapp.com/send?phone=6281219780823&text=Halo%20saya%20ingin%20menghubungi%20Anda%20untuk%20pemesanan%20kontrakan%20terima%20kasih