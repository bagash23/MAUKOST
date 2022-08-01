import { FlatList, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, auth } from '../../config';
import { fonts } from '../../utils/Fonts';
import { useNavigation } from '@react-navigation/native';

const PromoScreen = () => {
    const { currentUser } = auth;
    const [showKontrakan, setShowKontrakan] = useState([]);    
    const show = query(collection(db, "Kontrakan"), where("idUsers", "==", currentUser.uid));

    useEffect(() => {
        const unsubscribe = onSnapshot(show, querySnapshot => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setShowKontrakan(data);
        })
        return () => unsubscribe();
    },[])

    const navigation = useNavigation()

    return (
        <View style = {styles.container} >
            <View style = {{
                alignItems: 'center',
                justifyContent: "center",
                backgroundColor: "#fff",
                marginBottom: Dimensions.get('window').width * 0.02,
                paddingVertical: Dimensions.get('window').width * 0.02,
            }} >
                <Text style = {{
                    fontSize: Dimensions.get('window').width / 30,
                    fontFamily: fonts.primary[600],
                    color: "#000"
                }} >Promo</Text>
            </View>
            <FlatList
                data={showKontrakan}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return (
                        <View style = {styles.content} >
                            <View style = {{
                                alignItems: 'center'
                            }} >
                                <View style = {styles.bg} />
                                <Image source = {{uri: item.thumbnileImage}} style = {styles.bgGambar} />
                            </View>
                            <View style = {styles.bodyAbsolute} >
                                <Text style = {styles.nama} >{item.nameKontrakan}</Text>
                                <Text style = {styles.namaKota} >{item.kota}</Text>
                                <Text style ={styles.alamat} >{item.addressKontrakan}</Text>
                                <TouchableOpacity style = {{
                                    backgroundColor: "#d32521",
                                    width: Dimensions.get('window').width * 0.4,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    paddingVertical: Dimensions.get('window').width * 0.01,
                                    borderRadius: Dimensions.get('window').width * 0.03,
                                    marginTop: Dimensions.get('window').height * 0.02
                                }} 
                                    onPress = {() => navigation.navigate("DETILPROMO", {item})}
                                >
                                    <Text style = {{
                                        fontSize: Dimensions.get('window').width / 30,
                                        fontFamily: fonts.primary[400],
                                        color: "#fff"
                                    }} >Lihat Detail</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default PromoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        marginVertical: Dimensions.get('window').height * 0.02,        
    },
    bgGambar: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.5,
        borderRadius: 10
    },
    bodyAbsolute: {
        position: "absolute",
        bottom: Dimensions.get('window').height * 0.02,
        left: Dimensions.get('window').width * 0.05,
        right: Dimensions.get('window').width * 0.05,
        // backgroundColor: "white",
        paddingHorizontal: Dimensions.get('window').width * 0.02,
        zIndex: 3
    },
    nama: {
        fontSize: Dimensions.get('window').width * 2 / 50,
        fontFamily: fonts.primary[600],
        color: "#fff"
    },
    namaKota: {
        fontSize: Dimensions.get('window').width * 2 / 50,
        fontFamily: fonts.primary[400],
        color: "#fff"
    },
    alamat: {
        fontSize: Dimensions.get('window').width * 2 / 50,
        fontFamily: fonts.primary[400],
        color: "#fff",
        width: Dimensions.get('window').width * 0.7,
    },
    bg: {
        position: "absolute",
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').width * 0.5,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 2,
        borderRadius: 10
    },
    icon: {
        position: "absolute",
        right: Dimensions.get('window').width / 10,
        top: Dimensions.get('window').width * 0.05,
        zIndex: 3,
    },
    promoContent: {
        position: "absolute",
        right: Dimensions.get('window').width / 10,
        zIndex: 3,
        flexDirection: "row",
        alignItems: 'center',
    }
})