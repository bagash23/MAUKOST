import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../config'
import { fonts } from '../../utils/Fonts'
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import { useNavigation } from '@react-navigation/native'

const ListKontrakan = () => {
    const [kontrakan, setKontrakan] = useState([]);
    const { currentUser } = auth;
    const DataKontrakan = query(collection(db, "Kontrakan"), where("idUsers", "==", currentUser.uid));    
    useEffect(() => {
        const unsubscribe = onSnapshot(DataKontrakan, (querySnapshot) => {
            const data =querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setKontrakan(data)
        })
        return () => unsubscribe()
    },[])    
    if ( kontrakan.length === 0 ) {
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
                }} >Kontrakan</Text>
                <Text style = {{
                    fontSize: 20,
                    fontFamily: fonts.primary[400],                    
                    color: "#000"
                }} >Belum ada kontrakan</Text>
            </View>
        )    
    }

    const navigation = useNavigation()
    


    return (
        <View style = {styles.container} >
            <Text style = {{
                fontSize: Dimensions.get('window').width / 30,
                fontFamily: fonts.primary[600],
                color: "#000",
                textAlign: "center",
                backgroundColor: "#fff",
                marginBottom: Dimensions.get('window').height * 0.02,
                paddingVertical: Dimensions.get('window').height * 0.02,
            }} >Kontrakan Saya</Text>
            {kontrakan.map((item, index) => {
                return (
                    <TouchableOpacity key={index} style = {styles.content} onPress = {() => navigation.navigate("EDITKONTRAKAN", {item})} >
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
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default ListKontrakan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
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
    }
})