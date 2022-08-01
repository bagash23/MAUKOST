import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Modal, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { auth, db, signIn } from '../../config';
import { TextInput } from 'react-native-paper'
import { fonts } from '../../utils/Fonts';
import { StatusBar } from 'react-native';


const Login = () => {
    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };
    const [form, setForm] = useState({
        email: '',
        password: '',        
    })
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
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

    const { currentUser } = auth;
    
    

    
    const dispatch = useDispatch()
    const handlePress = async () => {
        dispatch({
            type: 'SIGN_IN',
            payload: {form}
        })
        try {
            setLoading(true)
            await signIn(form.email, form.password)
            setLoading(false)
            toastMessage({
                type: 'success',
                title: "Masuk Berhasil",
                message: "Selamat datang di aplikasi kami",
            })
            navigation.reset({
                index: 0,
                routes: [{ name: 'myApp' }],
            })
        } catch (error) {
            setLoading(false)
            toastMessage({
                type: 'error',
                title: "Masuk Gagal",
                message: "Kata sandi atau email salah",
            })
        }
        
    }

    return (
        <View style = {styles.container} >
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style = {{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
            }} >
                <Image source={require("../../assets/logo_app.png")} style = {styles.logo} />
                <Text style = {styles.titleLogin} >Masuk</Text>
            </View>
            <View style = {styles.content} >
                <View style = {styles.bodyInput} >                    
                    <TextInput 
                        label={'Email'}
                        style = {styles.inputan} 
                        placeholder='example@mail.com' 
                        value={form.email} 
                        mode='outlined'
                        onChangeText={(text) => setForm({...form, email: text})}
                        activeOutlineColor='#d32521'
                    />
                </View>
                <View style = {styles.bodyInput} >                    
                    <TextInput 
                        style = {styles.inputan} 
                        mode='outlined'
                        label={'Kata Sandi'}
                        placeholder='at least 6 characters' 
                        value={form.password} 
                        onChangeText={(text) => setForm({...form, password: text})}
                        secureTextEntry
                        activeOutlineColor='#d32521'
                    />
                </View>
            </View>
            <View>
                <TouchableOpacity style = {styles.continue} onPress={handlePress} disabled={!form.password} >
                    <Text style = {styles.textContinue} >Masuk</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{
                backgroundColor: '#fff',
                padding: 10,
                }} onPress = {() => navigation.navigate("SIGNUP") } >
                <Text style = {{
                    fontSize: 12,
                    color: '#000',
                    textAlign: 'center',
                    fontFamily: fonts.primary[400],
                }} >Belum punya akun? <Text style = {{
                    fontSize: 12,
                    color: '#000',
                    fontFamily: fonts.primary[600]
                }} >Daftar</Text></Text>      
                </TouchableOpacity>
                <Text style = {{
                    fontSize: 12,
                    color: '#000',                    
                    fontFamily: fonts.primary[400],
                    paddingHorizontal: Dimensions.get('window').width * 0.05,                    
                }} >Noted: Jika email notifikasi tidak muncul silahkan cek di email spam</Text>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    titleLogin: {
        fontSize: 20,
        fontFamily: fonts.primary[600],
        color: "#000",
        textAlign: "center",        
    },
    bodyInput: {
        paddingVertical: Dimensions.get('window').height * 0.02,    
        marginVertical: Dimensions.get('window').height * 0.01,
    },
    textInput: {
        fontSize: Dimensions.get('window').height * 0.02,
        color: "#000",
        fontWeight: "bold"
    },
    inputan: {        
        paddingHorizontal: Dimensions.get('window').height * 0.02,
        // backgroundColor: "transparent",
    },
    continue: {
        backgroundColor: "#d32521",
        paddingVertical: Dimensions.get('window').height * 0.02,
        alignItems: 'center',
        marginHorizontal: Dimensions.get('window').height * 0.04,
        marginBottom: Dimensions.get('window').height * 0.04,
        borderRadius: Dimensions.get('window').height * 0.05,
    },
    textContinue: {
        fontSize: Dimensions.get('window').height * 0.02,
        color: "#fff",
        fontFamily: fonts.primary[600],
    },
    content: {
        paddingHorizontal: Dimensions.get('window').height * 0.04,    
    },
    logo: {
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,        
        marginRight: Dimensions.get('window').height * 0.02,
    }
})