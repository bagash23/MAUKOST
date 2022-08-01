import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { auth, db } from '../../config'
import { fonts } from '../../utils/Fonts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Toast from 'react-native-toast-message';

const HistoryKontrakan = () => {
    const { currentUser } = auth;
    const [history, setHistory] = useState([]);
    const dataHistory = query(collection(db, "Booking"), where("idKontrakan", "==", currentUser.uid));
    useEffect(() => {
        const unsubscribe = onSnapshot(dataHistory, (querySnapshot) => {
            const DATAHISTORY = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setHistory(DATAHISTORY)
        })
        return () => unsubscribe()
    },[])
    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };

  


    if(history.length === 0){
        return (
            <View style = {{
                alignItems: 'center',
                justifyContent: "center"
            }} >
                <Text style = {{
                    fontSize: 20,
                    fontFamily: fonts.primary[400],
                    marginVertical: 20,
                    color: "#000"
                }} >History</Text>
                <Text style = {{
                    fontSize: 20,
                    fontFamily: fonts.primary[400],                    
                    color: "#000"
                }} >Belum ada history</Text>
            </View>
        )
    }



    const changeStatus = (idBooking) => {
        updateDoc(doc(db, `Booking/${idBooking}`), {
            statusKonfirmasi: "Konfirmasi"
        })
        toastMessage({
            type: "success",
            title: "Berhasil Merubah Status",
            message: "Status Berhasil Diubah Menjadi Konfirmasi"
        })
    }
    
    return (
        <View style = {styles.container} >
            <Text style = {styles.textHeader} >History Kontrakan</Text>
            <ScrollView>
                {history.map((item, index) => {
                    return (
                        <View key={index} style = {styles.body} >
                            <View key={index} style = {styles.contentBody} >
                                <Image source={{uri: item.gambarKontrakan}}  style = {styles.image} />
                                <View style = {styles.bodyBook} >
                                    <Text style = {styles.textBody} >{item.namaKontrakan}</Text>
                                    <Text style = {styles.textAlamatBody} >{item.idBooking}</Text>
                                    <Text style = {styles.textAlamatBody} >{item.alamatKontrakan}</Text>
                                    <Text style = {styles.textStatusBody} >{item.statusKonfirmasi}</Text>
                                    <Text style = {styles.harga} >Rp. {item.hargaKontrakan.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                </View>
                            </View>
                            <View style = {{
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingVertical: Dimensions.get('window').width * 0.02,
                            }} >
                                <View style = {{
                                    flexDirection: "row",
                                    alignItems: 'center'
                                }} >
                                    <MaterialIcons name="meeting-room" size={20} color="#000" />
                                    <Text style = {{
                                        marginLeft: Dimensions.get('window').width * 0.02,
                                        fontFamily: fonts.primary[400],
                                        color: "#000",
                                        fontSize: Dimensions.get('window').width / 30,
                                    }} >{item.jumlahKamarTerisi} Kamar</Text>
                                </View>
                                <View style = {{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    marginLeft: Dimensions.get('window').width / 20
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
                                    marginLeft: Dimensions.get('window').width / 20
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
                            <View style = {{
                                marginVertical: Dimensions.get('window').width * 0.02,
                            }} >
                                <Text style = {{
                                    fontFamily: fonts.primary[600],
                                    fontSize: Dimensions.get('window').width / 25,
                                    color: "#000"
                                }} >Data Customer</Text>
                                <Text style = {{
                                    fontFamily: fonts.primary[400],
                                    fontSize: Dimensions.get('window').width / 30,
                                    color: "#000"
                                }} >{item.namaUser}</Text>
                                <Text style = {{
                                    fontFamily: fonts.primary[400],
                                    fontSize: Dimensions.get('window').width / 30,
                                    color: "#000"
                                }} >{item.emailUser}</Text>
                            </View>
                            <View >
                                <TouchableOpacity style = {styles.btnKonfirmasi} onPress = {() => changeStatus(item.idBooking)} disabled = {item.statusKonfirmasi === "Konfirmasi"} >
                                    <Text style = {styles.textKonfirmasi} >Konfirmasi Penyewaan</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity style = {styles.btnCancel} >
                                    <Text style = {styles.textCancel} >Cancel</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default HistoryKontrakan

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textHeader: {
        fontSize: Dimensions.get('window').width / 30,
        textAlign: "center",
        fontFamily: fonts.primary[600],
        color: "#000",
        backgroundColor: "#fff",
        paddingVertical: Dimensions.get('window').width * 0.03,
        marginBottom: Dimensions.get('window').width * 0.02,        
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
    body: {
        backgroundColor: "#fff",
        marginVertical: Dimensions.get('window').width * 0.03,
        paddingHorizontal: Dimensions.get('window').width * 0.05,
        paddingVertical: Dimensions.get('window').width * 0.02,
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
    btnCancel: {
        backgroundColor: "#d32521",
        paddingVertical: Dimensions.get('window').width * 0.02,
        borderRadius: Dimensions.get('window').width * 0.02,
    },
    textCancel: {
        fontSize: Dimensions.get('window').width / 30,
        fontFamily: fonts.primary[600],
        color: '#fff',
        textAlign: "center",
    }
})