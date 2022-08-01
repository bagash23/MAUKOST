import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../../utils/Fonts'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../config';
import moment from 'moment';
import CountDown from 'react-native-countdown-component';

const Promo = () => {

    const [listPromo, setListPromo] = useState([]);
    const { currentUser } = auth;
    const dataList = query(collection(db, "Promo"), where("id", "!=", currentUser.uid))

    useEffect(() => {
        const unsubscribe = onSnapshot(dataList, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setListPromo(data)
        })
        return () => unsubscribe()
    },[])    

    return (
        <View style = {styles.container} >
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style = {styles.header} >
                <Text style = {styles.titleHeader} >Promo Harian</Text>
                <Text style = {styles.deskTItle} >Batas promo hanya 1 hari sekali</Text>
            </View>            

            <View style = {{
                backgroundColor: "#fff",
                paddingVertical: Dimensions.get('window').width * 2 / 100,
                paddingHorizontal: Dimensions.get('window').width * 2 / 50,
            }} >
                <Text style = {{
                    fontSize: Dimensions.get('window').width * 2 / 50,
                    fontFamily: fonts.primary[600],
                    color: "#000",
                    marginRight: Dimensions.get('window').width * 2 / 100,
                }} >Masa Promo Sekarang</Text>
            </View>

            <FlatList
                data={listPromo.sort((a, b) => a.createdAt - b.createdAt)}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => {
                    return (
                        <>
                            <View key={index} >
                                <Text>{item.dataPromoKontrakan.nameKontrakan}</Text>
                            </View>
                        </>
                    )
                }}
            />
        </View>
    )
}

export default Promo

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "#fff",
        paddingVertical: Dimensions.get('window').width * 2 / 100,        
        paddingHorizontal: Dimensions.get('window').width * 2 / 50,
    },
    titleHeader: {
        fontSize: Dimensions.get('window').width * 2 / 50,
        fontFamily: fonts.primary[600],
        color: "#000",
        marginRight: Dimensions.get('window').width * 2 / 100,
    },
    deskTItle: {
        fontSize: Dimensions.get('window').width * 2 / 70,
        fontFamily: fonts.primary[400],
        color: "#000",
    }
})