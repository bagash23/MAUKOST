import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { auth, db } from '../../config'
import { fonts } from '../../utils/Fonts';
import { TextInput } from 'react-native-paper'
import { pickImage, uploadImage } from '../../utils/imagePicker';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { updateCurrentUser, updateProfile } from 'firebase/auth';


const EditAkun = () => {
    const { currentUser } = auth;
    const [ubahAvatar, setUbahAvatar] = useState('')
    const [displayName, setDisplayName] = useState(currentUser.displayName)
    const [email, setEmail] = useState(currentUser.email)    


    const handleAvatar = async () => {
        const result = await pickImage()
        if (!result.didCancel) {
            setUbahAvatar(result.assets.filter(asset => asset.fileName === asset.fileName));
        }
    }

    const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });
    };

    const navigation = useNavigation();

    const handlePressUpdate = async () => {

        let photoURL;
        if (ubahAvatar) {
            const {url} = await uploadImage(ubahAvatar[0].uri, `images/avatars/${currentUser.uid}`, 'profilePicture')
            photoURL = url
        }

        const userData = {
            displayName,
            email: email,            
        }        

        if (photoURL) {
            userData.photoURL = photoURL
        }

        await Promise.all([
            updateProfile(currentUser, userData),
            setDoc(doc(db, "users", currentUser.uid), { ...userData, uid: currentUser.uid }),            
        ]).then(() => {
            toastMessage({
                type: 'success',
                title: "Berhasil",
                message: "Data berhasil diubah",
            })
            navigation.navigate('myApp')
        })

    }
    
    return (
        <View style = {styles.container} >
            <Text style = {styles.textHeader} >Sunting profil</Text>
            <TouchableOpacity style = {styles.bgAvatar} 
                onPress = {handleAvatar}
            >
                <Image 
                    source = {ubahAvatar[0] ? { uri: ubahAvatar[0].uri } : {uri: currentUser.photoURL}}
                    style = {styles.avatar}                 
                />
            </TouchableOpacity>
            <View style = {styles.contentInput} >
                <TextInput                     
                    label = "Nama"
                    value = {displayName}
                    onChangeText = {(text) => setDisplayName(text)}
                    mode = "outlined"
                    activeOutlineColor='#d32521'
                    style = {{
                        marginBottom: 20,
                        fontFamily: fonts.primary[400],
                    }}
                />
                <TextInput
                    label = "Email"
                    mode = "outlined"
                    value = {email}
                    activeOutlineColor='#d32521'
                    disabled = {true}
                    style = {{
                        marginBottom: 20,
                        fontFamily: fonts.primary[400],
                    }}
                />
                <TouchableOpacity style = {styles.btnUbah} onPress={handlePressUpdate}>
                    <Text style = {styles.textBtn} >Simpan</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditAkun

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: '#fff',
    },
    textHeader: {
        fontSize: Dimensions.get("window").width / 30,
        fontFamily: fonts.primary[600],
        color: "#000",
        textAlign: "center",
        paddingVertical: Dimensions.get("window").height / 50,
        backgroundColor: "#fff"
    },
    avatar: {
        width: Dimensions.get("window").width / 3,
        height: Dimensions.get("window").width / 3,
        borderRadius: Dimensions.get("window").width / 3,
    },
    bgAvatar: {
        alignItems: "center",             
    },
    contentInput: {
        paddingHorizontal: Dimensions.get("window").width / 20,
        paddingVertical: Dimensions.get("window").height / 50,
    },
    btnUbah: {
        backgroundColor: "#d32521",
        padding: Dimensions.get("window").height / 50,
        borderRadius: Dimensions.get("window").height / 50,
    },
    textBtn: {
        fontSize: Dimensions.get("window").width / 30,
        fontFamily: fonts.primary[600],
        color: "#fff",
        textAlign: "center",
    }
})