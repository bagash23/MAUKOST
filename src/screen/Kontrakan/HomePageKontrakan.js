import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../../utils/Fonts'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { auth, db } from '../../config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';

const HomePageKontrakan = () => {
    const { currentUser } = auth;    
    const navigation = useNavigation()
    const [jumlahKontrakan, setJumlahKontrakan] = useState(0);      
    const [jumlahBooking, setJumlahBooking] = useState(0);    

    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };

    const DataKontrakan = query(collection(db, "Kontrakan"), where("idUsers", "==", currentUser.uid))
    useEffect(() => {
        const unsubscribe = onSnapshot(DataKontrakan, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setJumlahKontrakan(data.length)
        })
        return () => unsubscribe()
    },[])

    const DataBooking = query(collection(db, "Booking"), where("idKontrakan", "==", currentUser.uid));
    useEffect(() => {
        const unsubscribe = onSnapshot(DataBooking, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setJumlahBooking(data.length)
        })
        return () => unsubscribe()
    },[])



    const handlePressHistory = () => {
        navigation.navigate('HISTORYKONTRAKAN')
    }

    const handlePressTambahProduk = () => {    
        if (jumlahKontrakan < 3) {
            navigation.navigate('POST')
        }
        else {            
            toastMessage({
                type: "error",
                title: "Tambah Produk Error",
                message: "Maksimal 3 kontrakan"
            })
        }
    }

    const handlePressPromo = () => {
        // toastMessage({
        //     type: "error",
        //     title: "Promo Error",
        //     message: "Promo belum tersedia"
        // })
        navigation.navigate('PROMO')
    }

    return (
        <View style = {styles.container} >
            <View style = {styles.header} >
                <Image source = {{uri: currentUser.photoURL}} style = {styles.image} />
                <View style = {{
                    flexDirection: "column",
                    marginLeft: Dimensions.get('window').width * 0.02,
                }} >
                    <Text style = {styles.headerTextToko} >{currentUser.displayName}</Text>
                    <Text style = {styles.headerTextEmailToko} >{currentUser.email}</Text>
                </View>
            </View>
            <View style = {styles.contentPenyewaan} >
                <Text style = {styles.titlePenyewaan} >Penyewaan Kost-an Saya</Text>
                <View style = {styles.bodyPenyewaan}>
                    <TouchableOpacity style = {{
                        alignItems: 'center',                        
                    }} 
                        onPress = {() => navigation.navigate('LISTKONTRAKAN')}
                    >
                        <View style = {styles.bodyImage} >
                            <Image source = {require('../../assets/rentalHouse.png')} style = {styles.imagePenyewaan} />
                        </View>
                        <Text style = {styles.textPenyewaan} >Kost-an Saya</Text>
                        <View style = {{
                            backgroundColor: "#d32521",
                            width: Dimensions.get('window').width * 0.07,
                            height: Dimensions.get('window').width * 0.07,
                            borderRadius: Dimensions.get('window').width * 0.05,
                            alignItems: 'center',
                            justifyContent: "center",
                            position: "absolute",
                            right: Dimensions.get('window').width * 0.02,
                        }} >
                            <Text style = {{
                                color: "#fff",
                                fontSize: Dimensions.get('window').width * 0.03,
                                fontFamily: fonts.primary[400],
                            }} >{jumlahKontrakan}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style = {{
                        alignItems: 'center'
                    }} onPress={handlePressHistory} >
                        <View style = {styles.bodyImage} >
                            <Image source = {require('../../assets/history.png')} style = {styles.imagePenyewaan} />
                        </View>
                        <Text style = {styles.textPenyewaan} >Histori Pesanan</Text>
                        {jumlahBooking > 0 ? (
                            <View style = {{
                                backgroundColor: "#d32521",
                                width: Dimensions.get('window').width * 0.07,
                                height: Dimensions.get('window').width * 0.07,
                                borderRadius: Dimensions.get('window').width * 0.05,
                                alignItems: 'center',
                                justifyContent: "center",
                                position: "absolute",
                                right: Dimensions.get('window').width * 0.02,
                            }} >
                                <Text style = {{
                                    color: "#fff",
                                    fontSize: Dimensions.get('window').width * 0.03,
                                    fontFamily: fonts.primary[400],
                                }} >{jumlahBooking}</Text>
                            </View>
                        ) : (
                            null
                        )}
                        
                    </TouchableOpacity>
                    {/* <TouchableOpacity style = {{
                        alignItems: 'center'
                    }} 
                        onPress = {handlePressPromo}
                    >
                        <View style = {styles.bodyImage} >
                            <Image source = {require('../../assets/promotion.png')} style = {styles.imagePenyewaan} />
                        </View>
                        <Text style = {styles.textPenyewaan} >Promo Penjualan</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            <View style = {{
                backgroundColor: '#fff',
                marginVertical: Dimensions.get('window').height * 0.01,
                padding: Dimensions.get('window').width * 0.05,
            }} >
                <TouchableOpacity style = {{
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "space-between",    
                }} 
                    onPress = {handlePressTambahProduk}
                >
                    <View style = {{
                        flexDirection: "row",
                        alignItems: "center"
                    }} >
                        <Ionicons name = "ios-add-circle" size = {20} color = "#d32521" />
                        <Text style = {{
                            fontFamily: fonts.primary[400],
                            fontsSize: Dimensions.get('window').width * 0.02,
                            marginLeft: Dimensions.get('window').width * 0.02,
                            color: "#000",
                            marginTop: Dimensions.get('window').width * 0.01,
                        }} >Tambah produk baru</Text>
                    </View>
                    <AntDesign name = "right" size = {20} color = "#d32521" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomePageKontrakan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: 'row',        
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        paddingVertical: Dimensions.get('window').width * 0.03,
        marginBottom: Dimensions.get('window').height * 0.01,
    },
    image: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        borderRadius: Dimensions.get('window').width * 0.1,
    },
    headerTextToko: {
        fontSize: Dimensions.get('window').width * 0.03,
        fontFamily: fonts.primary[600],
        color: '#000',
    },
    headerTextEmailToko: {
        fontSize: Dimensions.get('window').width * 0.03,
        fontFamily: fonts.primary[400],
        color: '#000',
    },
    contentPenyewaan: {
        backgroundColor: '#fff',
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        paddingVertical: Dimensions.get('window').width * 0.03,
    },
    titlePenyewaan: {
        fontSize: Dimensions.get('window').width * 0.03,
        fontFamily: fonts.primary[600],
        color: '#000',        
    },
    imagePenyewaan: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
    },
    bodyImage: {
        backgroundColor: "#f4f4f4",
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        borderRadius: Dimensions.get('window').width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyPenyewaan: {
        marginVertical: Dimensions.get('window').width * 0.02,
        alignItems: 'center',    
        flexDirection: "row",       
        justifyContent: "space-around" 
    },
    textPenyewaan: {
        fontSize: Dimensions.get('window').width * 0.03,
        fontFamily: fonts.primary[600],
        color: '#000',
        marginTop: Dimensions.get('window').width * 0.02,
    }
})