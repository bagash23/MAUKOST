import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { fonts } from '../../utils/Fonts'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config'
import Toast from 'react-native-toast-message';


const EditKontrakan = () => {
    const route = useRoute();
    const Detil = route.params.item;

    const [nameKontrakan, setNameKontrakan] = useState(Detil.nameKontrakan);
    const [description, setDescription] = useState(Detil.descriptionKontrakan);
    const [sediaKamar, setSediaKamar] = useState(Detil.jumlahKamar);    
    const [address, setAddress] = useState(Detil.addressKontrakan)
    const [kota, setKota] = useState(Detil.kota)

    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };
    const navigation = useNavigation()

    const handlePressUpdate = () => {
        const data = {
            nameKontrakan: nameKontrakan,
            descriptionKontrakan: description,
            jumlahKamar: sediaKamar,            
            addressKontrakan: address,
            kota: kota,
        }        
        updateDoc(doc(db, "Kontrakan", Detil.id), data).then(() => {
            toastMessage({
                type: 'success',
                title: "Berhasil",
                message: "Data berhasil diubah",
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'myApp' }],
            })
        })

    }


    
    return (
        <View style = {styles.container} >
            <Text style = {styles.title} >Sunting Kontrakan</Text>
            <ScrollView>
                <View>
                    <View style = {styles.shadowBanner} />
                    <Image source={{uri: Detil.thumbnileImage}} style = {styles.banner} />
                </View>
                <View style = {styles.contentInput} >
                    <TextInput
                        label = "Nama Kontrakan"
                        value = {nameKontrakan}
                        onChangeText = {(text) => setNameKontrakan(text)}
                        mode = "outlined"
                        activeOutlineColor='#d32521'
                        style = {{
                            marginBottom: 20,
                            fontFamily: fonts.primary[400],
                        }}
                    />
                    <TextInput
                        label = "Deskripsi"
                        value = {description}
                        onChangeText = {(text) => setDescription(text)}
                        mode = "outlined"
                        activeOutlineColor='#d32521'
                        style = {{
                            marginBottom: 20,
                            fontFamily: fonts.primary[400],
                        }}
                        numberOfLines={10} 
                        multiline={true} 
                    />
                    <TextInput
                        label = "Alamat"
                        value = {address}
                        onChangeText = {(text) => setAddress(text)}
                        mode = "outlined"
                        activeOutlineColor='#d32521'
                        style = {{
                            marginBottom: 20,
                            fontFamily: fonts.primary[400],
                        }}
                        numberOfLines={10} 
                        multiline={true} 
                    />
                    <TextInput
                        label = "Kota"
                        value = {kota}
                        onChangeText = {(text) => setKota(text)}
                        mode = "outlined"
                        activeOutlineColor='#d32521'
                        style = {{
                            marginBottom: 20,
                            fontFamily: fonts.primary[400],
                        }}
                    />
                    <TextInput
                        label = "Sedia Kamar"
                        value = {sediaKamar}
                        onChangeText = {(text) => setSediaKamar(text)}
                        mode = "outlined"
                        activeOutlineColor='#d32521'
                        style = {{
                            marginBottom: 20,
                            fontFamily: fonts.primary[400],
                        }}
                        keyboardType = "numeric"
                    />
                </View>
                <TouchableOpacity style = {styles.btnSave} onPress={handlePressUpdate} >
                    <Text style = {styles.button} >Simpan</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EditKontrakan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    banner: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
    },
    shadowBanner: {
        position: "absolute",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 2,
    },
    contentInput: {
        paddingHorizontal: Dimensions.get('window').width / 20,
        paddingVertical: Dimensions.get('window').height / 50,
        marginTop: Dimensions.get('window').height / 50,
    },
    title: {
        fontFamily: fonts.primary[600],
        fontSize: Dimensions.get('window').width / 26,
        textAlign: "center",
        marginVertical: Dimensions.get('window').height / 50,
        color: "#000",
    },
    btnSave: {
        backgroundColor: "#d32521",
        paddingVertical: Dimensions.get('window').height / 50,
        marginHorizontal: Dimensions.get('window').width / 20,
        marginVertical: Dimensions.get('window').height / 50,
        borderRadius: Dimensions.get('window').width / 10,
        alignItems: "center"
    },
    button: {
        fontFamily: fonts.primary[600],
        fontSize: Dimensions.get('window').width / 26,
        color: "#fff",
    }
})