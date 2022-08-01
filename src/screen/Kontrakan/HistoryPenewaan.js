import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { auth, db } from '../../config'
import { fonts } from '../../utils/Fonts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'

const HistoryPenewaan = () => {
    const [booking, setBooking] = useState([]);
    const [ratings, setRatings] = useState(false);
    const [rating, setRating] = useState("");
    const { currentUser } = auth;
    const [description, setDescription] = useState('')
    const dataBooking = query(collection(db, "Booking"), where("idUser", "==", currentUser.uid))    

    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };
    useEffect(() => {
        const unsubscribe = onSnapshot(dataBooking, (querySnapshot) => {
            const DATABOOKING = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setBooking(DATABOOKING)
        })
        return () => unsubscribe()
    },[])

    // useEffect(() => {
    //     booking.map((item) => {
    //         if (item.statusKonfirmasi === "Konfirmasi" && item.idKontrakan === item.idKontrakan) {
    //             setRatings(true)
    //         }
    //     })
    // },[booking])

    // const handleRatingStatus = (idKontrakan, statusKonfirmasi) => {
    //     if (statusKonfirmasi === "Konfirmasi") {        
    //         updateDoc(doc(db, `kontrakan/${idKontrakan}`), {        
    //             avatar: currentUser.photoURL,
    //             namaCustomer: currentUser.displayName,
    //             rating: rating,
    //             description: description
    //         })
    //         toastMessage({
    //             type: 'success',
    //             title: "Berhasil",
    //             message: "Berhasil memberikan rating",
    //         })    
    //         setRatings(false)
    //     } else {
    //         toastMessage({
    //             type: 'error',
    //             title: "Gagal",
    //             message: "Anda harus mengkonfirmasi terlebih dahulu",
    //         })
    //     }
    // }

    return (
        <View style = {styles.container} >
            <Text style = {styles.textHeader} >History Penyewaan</Text>
            <ScrollView>
                <FlatList
                    data = {booking}
                    keyExtractor = {(item) => item.idBooking}
                    renderItem = {({item, index}) => {
                        return (
                            <View style = {{
                                backgroundColor: "#fff",
                                marginVertical: Dimensions.get('window').width * 0.03,
                                paddingHorizontal: Dimensions.get('window').width * 0.05,
                                paddingVertical: Dimensions.get('window').width * 0.02,
                            }} >
                                <View key={index} style = {styles.contentBody} >
                                    <Image source={{uri: item.gambarKontrakan}}  style = {styles.image} />
                                    <View style = {styles.bodyBook} >
                                        <Text style = {styles.textBody} >{item.namaKontrakan}</Text>
                                        <Text style = {styles.textAlamatBody} >{item.alamatKontrakan}</Text>
                                        <Text style = {styles.textStatusBody} >{item.statusKonfirmasi}</Text>
                                        <Text style = {styles.harga} >Rp. {item.hargaKontrakan.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </View>
                                </View>
                                <View style = {{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    paddingVertical: Dimensions.get('window').width * 0.02,
                                }} >                                    
                                    <View style = {{
                                        flexDirection: "row",
                                        alignItems: 'center',                                        
                                    }} >
                                        <MaterialCommunityIcons name="account-group" size={20} color="#000" />
                                        <Text style = {{
                                            marginLeft: Dimensions.get('window').width * 0.02,
                                            fontFamily: fonts.primary[400],
                                            color: "#000",
                                            fontSize: Dimensions.get('window').width / 30,
                                        }} >{item.jumlahOrang} Orang</Text>
                                    </View>
                                    <View style = {{
                                        flexDirection: "row",
                                        alignItems: 'center',                                        
                                    }} >
                                        <MaterialIcons name="date-range" size={20} color="#000" />
                                        <Text style = {{
                                            marginLeft: Dimensions.get('window').width * 0.02,
                                            fontFamily: fonts.primary[400],
                                            color: "#000",
                                            fontSize: Dimensions.get('window').width / 30,
                                        }} >{item.tanggalKunjungan}</Text>
                                    </View>
                                </View>
                                {/* {ratings ? (
                                    <View>
                                        <AirbnbRating
                                            count={5}
                                            reviews={["Terlalu Buruk", "Buruk", "Cukup", "Baik", "Terlalu Baik"]}
                                            defaultRating={3}
                                            size={20}
                                            onFinishRating={(rating) => {
                                                setRating(rating)
                                            }}
                                        />
                                        <TextInput 
                                            style = {styles.inputKontrakanDeskripsi} 
                                            placeholder = 'tulis komentar anda disini' 
                                            numberOfLines={10} 
                                            multiline={true} 
                                            onChangeText = {setDescription}
                                            value = {description}
                                        />
                                        <TouchableOpacity style = {{
                                            backgroundColor: "#0e5cff",
                                            paddingVertical: Dimensions.get('window').width * 0.02,
                                            borderRadius: Dimensions.get('window').width * 0.02,
                                            marginVertical: Dimensions.get('window').width * 0.03,
                                        }} onPress={() => handleRatingStatus(item.idKontrakan, item.statusKonfirmasi)} >
                                            <Text style = {{
                                                fontSize: Dimensions.get('window').width / 30,
                                                fontFamily: fonts.primary[600],
                                                color: '#fff',
                                                textAlign: "center",
                                            }} >Kirim Penilain</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => setOpenReting(false)} >
                                            <Text style = {{
                                                fontSize: Dimensions.get('window').width / 30,
                                                fontFamily: fonts.primary[600],
                                                color: '#0e5cff',
                                                textAlign: "center",
                                            }} >Tutup</Text>
                                        </TouchableOpacity>
                                    </View>
                                ):null} */}
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default HistoryPenewaan

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textHeader: {
        fontSize: Dimensions.get('window').width / 30,
        fontFamily: fonts.primary[600],
        color: '#000',
        textAlign: "center",
        backgroundColor: "#fff",
        paddingVertical: Dimensions.get('window').width * 0.03,
    },
    contentBody: {
        flexDirection: "row",
        backgroundColor: "#fff",
        
    },
    image: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        borderRadius: Dimensions.get('window').width * 0.02 ,
    },
    bodyBook: {
        flexDirection: "column",
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
        textAlign: "center"
    },
    btnKonfirmasi: {
        backgroundColor: "#0e5cff",
        paddingVertical: Dimensions.get('window').width * 0.02,
        borderRadius: Dimensions.get('window').width * 0.02,
        marginVertical: Dimensions.get('window').width * 0.03,
    },
    textKonfirmasi: {
        fontSize: Dimensions.get('window').width / 30,
        fontFamily: fonts.primary[600],
        color: '#fff',
        textAlign: "center",
    },

})