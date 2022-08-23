import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { fonts } from '../utils/Fonts';

const listGenre = [
    {
        id: 1,
        title: "Kost Minimalis",        
        link: "Minimalis"
    },
    {
        id: 2,
        title: "Kost Biasa",
        link: "Biasa"
    },
]

const RadioList = ({onPick}) => {
    const [pick, setPick] = useState('Genre');

    useEffect(() => {
        onPick(pick)
    }, [pick])

    return (
        <View>
            <View>
                <FlatList
                    data={listGenre}                    
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => setPick(item.link)}  style = {styles.content} >
                                <View style = {styles.body} >                                    
                                    <Text style = {styles.txtList} >{item.title}</Text>
                                </View>
                                {item.link === pick ? <Entypo name="circle" size={20} style = {{backgroundColor: "#d32521", borderRadius: 24}} /> : <Entypo name="circle"size={24}color={'#dbdbdb'}/>}
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default RadioList

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    body: {
        marginTop: Dimensions.get("window").height * 1 / 50,
        flexDirection: "row",
        alignItems: "center",
    },
    txtList: {
        fontFamily: fonts.primary[600],
        fontSize: Dimensions.get("window").width * 2 / 60,
        // marginLeft: Dimensions.get("window").width * 3 / 80,
        color: "#000"
    },
})