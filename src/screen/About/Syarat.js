import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts } from '../../utils/Fonts'

const Syarat = () => {
    return (
        <View style = {styles.container} >
            <Text style = {styles.textTitle} >Syarat Ketentuan</Text>
            <View>
                <Text>Selamat datang di SanKotrakan</Text>
            </View>
        </View>
    )
}

export default Syarat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textTitle: {
        fontSize: Dimensions.get('window').width * 0.05,
        fontFamily: fonts.primary[600],
        color: "#000",
        textAlign: "center",
        marginVertical: Dimensions.get('window').width * 0.02,
    }
})