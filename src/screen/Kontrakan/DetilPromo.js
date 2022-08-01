import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../../utils/Fonts';
import {Accordion, Box} from 'native-base';
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config';
import Toast from 'react-native-toast-message';

const DetilPromo = () => {
    const route = useRoute();
    const ITEMS = route.params.item;
    console.log(ITEMS);
    const navigation = useNavigation();

    const [showPromo, setShowPromo] = useState(false);
    const [selectPromo, setSelectPromo] = useState(null);
    const [selectKodePromo, setSelectKodePromo] = useState('');    
    const hargaPromo = ITEMS.hargaKontrakan * selectPromo / 100;
    const randomId = uuidv4();
    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };

    const promoList = [
        {
            id: 1,
            nama: "Promo 1",
            deskripsi: "Konsumen mendapatkan promo harga dengan diskon 30%",
            promo: 30,
            kode: "PROMO30",
        },
        {
            id: 2,
            nama: "Promo 2",
            deskripsi: "Konsumen mendapatkan promo harga dengan diskon 50%",
            promo: 50,
            kode: "PROMO50",
        },
        {
            id: 3,
            nama: "Promo 3",
            deskripsi: "Konsumen mendapatkan promo harga dengan diskon 70%",
            promo: 70,
            kode: "PROMO70",

        }
    ]

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
    const dataKontrakanPromo = {
        id: ITEMS.id,
        nameKontrakan: ITEMS.nameKontrakan,
        namePemilik: ITEMS.namePemilik,
        hargaKontrakan: ITEMS.hargaKontrakan,
        kota: ITEMS.kota,
        fasilitas: ITEMS.fasilitas,
        jumlahKamar: ITEMS.jumlahKamar,
        emailPemilik: ITEMS.emailPemilik,
        phonePemilik: ITEMS.phonePemilik,
        thumbnileImage: ITEMS.thumbnileImage,
        idUsers: ITEMS.idUsers,
        user: ITEMS.user,
        descriptionKontrakan: ITEMS.descriptionKontrakan,
        avatarImage: ITEMS.avatarImage,
        detilImage: ITEMS.detilImage,
        createdAt: ITEMS.createdAt,
        updatedAt: ITEMS.updatedAt,
        addressKontrakan: ITEMS.addressKontrakan,
    }    
    const idUsersPromo = ITEMS.idUsers;
    const handlePromo = async () => {
        try {
            setLoading(true);
            const dataPromo = {
                id: randomId,
                dataPromoKontrakan: dataKontrakanPromo,
                promoPersen: selectPromo,
                idUsersPromo: idUsersPromo,
                kodePromo: selectKodePromo,
                hargaPromo: hargaPromo.toString(),
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            await Promise.all([
                setDoc(doc(db, "Promo", randomId), dataPromo).then(() => {
                    setLoading(false);
                    toastMessage({
                        type: 'success',
                        title: 'Promo Berhasil',
                        message: 'Promo berhasil ditambahkan',
                    });
                    navigation.replace('myApp');
                })
            ]);
        } catch (error) {

            console.log(error, "ERROR NYA");
            setLoading(false);
            toastMessage({
                type: 'error',
                title: 'Promo Gagal',
                message: 'Promo gagal ditambahkan',
            })
        }
    }

    return (
        <View style = {styles.container} >
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <ScrollView>

                <View style = {{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    paddingVertical: Dimensions.get('window').width * 0.02,
                    paddingHorizontal: Dimensions.get('window').width * 0.02,
                }} >
                    <AntDesign name="left" size={20} color="#000" onPress={() => navigation.goBack()} />
                    <Text style = {{
                        fontSize: Dimensions.get('window').width / 30,
                        fontFamily: fonts.primary[600],
                        color: "#000",
                        marginLeft: Dimensions.get('window').width * 0.02
                    }} >{ITEMS.nameKontrakan}</Text>
                </View>
                <View style = {styles.contentList} >
                    <View style = {{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: Dimensions.get('window').width * 0.02,
                    }} >
                        <View>
                            <Text style = {styles.nama} >{ITEMS.nameKontrakan}</Text>
                            <View style = {{
                                flexDirection: "row",
                                alignItems: "center"
                            }} >
                                <Entypo name="location-pin" size={15} color="black" />
                                <Text style = {styles.namaKota} >{ITEMS.kota}</Text>
                            </View>
                            {selectPromo !== null ? (
                                <View style = {{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    marginTop: Dimensions.get('window').height * 0.02
                                }} >
                                    <Text style = {{
                                        fontSize: Dimensions.get('window').width * 2 / 70,
                                        fontFamily: fonts.primary[400],
                                        color: "#A2B5BB",
                                        marginRight: Dimensions.get('window').width * 0.02
                                    }} >Rp. {ITEMS.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    <Text style = {styles.harga} >Rp. {hargaPromo.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                </View>
                            ): (
                                <Text style = {styles.harga} >Rp. {ITEMS.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            )}
                            
                        </View>
                        <Image source = {{uri: ITEMS.thumbnileImage}} style = {styles.bgGambar} />
                        {showPromo ? (
                            <View style = {styles.promoBG} >
                                <Text style = {{
                                    fontSize: Dimensions.get('window').width / 50,
                                    fontFamily: fonts.primary[600],
                                    color: "#fff",
                                }} >{selectPromo}%</Text>
                            </View>
                        ):null}
                    </View>
                </View>
                {promoList.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style = {{
                            backgroundColor: "#fff",
                            flexDirection: "column",                        
                        }} 
                            onPress={() => setSelectPromo(item.promo) === setShowPromo(true) === setSelectKodePromo(item.kode)}
                        >

                            <View style = {{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: Dimensions.get('window').width * 0.02,
                                alignItems: 'center'
                            }}
                                
                            >
                                <View>
                                    <Text style = {{
                                        fontSize: Dimensions.get("window").width * 2 / 60,
                                        fontFamily: fonts.primary[600],
                                        color: "#000",
                                    }} >{item.nama}</Text>
                                    <Text style = {{
                                        fontSize: Dimensions.get("window").width * 2 / 70,
                                        fontFamily: fonts.primary[400],
                                        color: "#000",
                                        width: Dimensions.get('window').width * 0.5,
                                    }} >{item.deskripsi}</Text>
                                </View>
                                <Text style = {{
                                    fontSize: Dimensions.get("window").width * 2 / 60,
                                    fontFamily: fonts.primary[600],
                                    color: "#000",
                                }} >Pilih</Text>
                            </View>

                        </TouchableOpacity>
                    )
                })}
                <Box
                    m={0}
                    style={{                    
                        backgroundColor: "#fff",
                        marginTop: Dimensions.get('window').width * 0.02,
                    }}
                >
                    <Accordion allowMultiple index={[0]}>
                        <Accordion.Item>
                            <Accordion.Summary _expanded={{backgroundColor: '#d32521'}}>
                            Keuntungan membuat promo
                            <Accordion.Icon />
                            </Accordion.Summary>
                            <Accordion.Details>
                            <View
                                style={{
                                    justifyContent: 'center',
                                }}
                            >
                                <View style={{ flexDirection: 'row', }}>
                                    <Entypo name="check" size={(Dimensions.get('window').height * 2) / 100} color="#000" />
                                    <Text style={{ paddingLeft: (Dimensions.get('window').height * 2) / 100, fontFamily: fonts.primary[400], color: "#000", width: Dimensions.get('window').width * 0.9}}>Keuntungan pencarian konsumen akan lebih cepat</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Entypo name="check" size={(Dimensions.get('window').height * 2) / 100} color="#000" />
                                    <Text style={{ paddingLeft: (Dimensions.get('window').height * 2) / 100, fontFamily: fonts.primary[400], color: "#000", width: Dimensions.get('window').width * 0.9}}>Batas promo hanya 1 hari</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Entypo name="check" size={(Dimensions.get('window').height * 2) / 100} color="#000" />
                                    <Text style={{ paddingLeft: (Dimensions.get('window').height * 2) / 100, fontFamily: fonts.primary[400], color: "#000", width: Dimensions.get('window').width * 0.9}}>Kost-an anda akan tayang dimenu promo</Text>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <Entypo name="check" size={(Dimensions.get('window').height * 2) / 100} color="#000" />
                                    <Text style={{ paddingLeft: (Dimensions.get('window').height * 2) / 100, fontFamily: fonts.primary[400], color: "#000", width: Dimensions.get('window').width * 0.9}}>Promo hanya berlaku pada bulan pertama masuk kost-an</Text>
                                </View>
                            </View>
                            </Accordion.Details>
                        </Accordion.Item>
                    </Accordion>
                </Box>
                <TouchableOpacity style = {{
                    backgroundColor: "#d32521",
                    marginTop: Dimensions.get('window').width * 0.2,
                    padding: Dimensions.get('window').height * 0.02,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: Dimensions.get('window').height * 0.04,
                    borderRadius: Dimensions.get('window').height * 0.05,
                }} 
                
                    disabled={!selectPromo}
                    onPress={handlePromo}
                >
                    <Text style = {{
                        fontSize: Dimensions.get('window').width * 2 / 60,
                        fontFamily: fonts.primary[600],
                        color: "#fff",
                    }} >Terapkan Promo</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default DetilPromo

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgGambar: {
        width: Dimensions.get('window').width * 0.20,
        height: Dimensions.get('window').width * 0.20,
        borderRadius: Dimensions.get('window').width * 0.02,
    },
    contentList: {
        backgroundColor: "#fff",
        padding: Dimensions.get('window').width * 0.02,
        marginBottom: Dimensions.get('window').width * 0.02,
    },
    nama: {
        fontSize: Dimensions.get('window').width / 30,
        fontFamily: fonts.primary[600],
        color: "#000"
    }, 
    namaKota: {
        fontSize: Dimensions.get('window').width / 40,
        fontFamily: fonts.primary[400],
        color: "#000",
        marginLeft: Dimensions.get('window').width * 0.02
    },
    harga: {
        fontSize: Dimensions.get('window').width / 25,
        fontFamily: fonts.primary[600],
        color: "#d32521",
    },
    promoBG: {
        backgroundColor: "#d32521",
        position: "absolute",
        top: 0,
        right: Dimensions.get('window').width * 0.02,
        padding: Dimensions.get('window').width * 0.02,
        borderTopRightRadius: Dimensions.get('window').width * 0.02,
    }
})