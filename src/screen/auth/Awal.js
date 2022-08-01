import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fonts } from '../../utils/Fonts'
import { useNavigation } from '@react-navigation/native'

const Awal = () => {
    const navigation = useNavigation()
    return (
        <View style = {styles.container} >
            <StatusBar backgroundColor="#d32521" barStyle="light-content" />
            <View style = {styles.headerLogo} >
                <View style = {{
                    flexDirection: "row",
                    alignItems: 'center'
                }} >
                    <Image source={require("../../assets/logo_app.png")} style = {styles.logo} />
                    <Text style = {styles.textLogo} >MAUKOST</Text>
                </View>
                <View>
                    <Text style = {styles.deskripsi} >Aplikasi ini dibuat untuk memudahkan pencarian tempat kontrakan di sekitar anda.</Text>
                </View>
            </View>
            <View style = {styles.btn} >
                <TouchableOpacity style = {styles.btnPrimary} onPress = {() => navigation.navigate("SIGNUP")} >
                    <Text style = {styles.button} >Mulai</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Awal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d32521',
        justifyContent: "space-between"
    },
    headerLogo: {
        marginHorizontal: Dimensions.get('window').width * 0.05,
        marginVertical: Dimensions.get('window').height * 0.05,        
    },
    logo: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
    },
    textLogo: {
        fontSize: Dimensions.get('window').width * 0.05,
        fontFamily: fonts.primary[600],
        color: "#fff",
        marginLeft: Dimensions.get('window').width * 0.02
    },
    deskripsi: {
        color: "#fff",
        fontSize: Dimensions.get('window').width * 0.04,
        fontFamily: fonts.primary[400],
        marginTop: Dimensions.get('window').height * 0.03,
    },
    btn: {
        marginHorizontal: Dimensions.get('window').width * 0.05,
        marginVertical: Dimensions.get('window').height * 0.03,
    },
    btnPrimary: {
        backgroundColor: '#fff',
        padding: Dimensions.get('window').width * 0.03,
        borderRadius: Dimensions.get('window').width * 0.05,
        alignItems: 'center',
    },
    button:{ 
        fontSize: Dimensions.get('window').width * 0.04,
        fontFamily: fonts.primary[600],
        color: '#d32521',
    }
})