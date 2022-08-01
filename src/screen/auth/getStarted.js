import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView, Modal, ActivityIndicator, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Toast from 'react-native-toast-message';
import { auth, db } from '../../config';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper'
import { pickImage, uploadImage } from '../../utils/imagePicker';
import { fonts } from '../../utils/Fonts';


const GetStarted = () => {
  const [displayName, setDisplayName] = useState("");
  const navigation = useNavigation()
  const [selectedAvatar, setSelectedAvatar] = useState(null)
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

  const handlePhoto = async () => {
    const result = await pickImage()
    if (!result.didCancel) {
      setSelectedAvatar(result.assets.filter(asset => asset.fileName === asset.fileName));
    }
  }

  const handlePress = async () => {
    setLoading(true)
    const user = auth.currentUser;    
    // let photoURL = selectedAvatar[0].uri;
    let photoURL;
    if (selectedAvatar) {
      const {url} = await uploadImage(selectedAvatar[0].uri, `images/avatars/${user.uid}`, 'profilePicture')
      photoURL = url
    }
    const userData = {
      displayName,         
      email: user.email
    }
    if (photoURL) {
      userData.photoURL = photoURL
    }

    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), {...userData, uid: user.uid})
    ])
    setLoading(false)
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Data berhasil disimpan',
    });
    navigation.replace('VERIFIKASI')
  }

  return (
    <View style = {styles.container} >
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView>
        
        <View style = {styles.headerText} >
          <Text style = {styles.text}>Lengkapi Data Anda</Text>
          <Text style = {styles.textDeskripsi}>Menjadi anggota - Anda tidak lagi kebinggungan untuk mencari tempat tinggal sementara karena di kami banyak sekali penawaran kontrakan untuk disewa.</Text>
        </View>
        <View>
          {!selectedAvatar ? (
            <TouchableOpacity style = {styles.button} onPress = {handlePhoto} >
              <Image source = {require('../../assets/user.png')} style = {styles.image} />
            </TouchableOpacity>
          ): (
            <TouchableOpacity style = {styles.button} onPress = {handlePhoto} >
              <Image source = {selectedAvatar} style = {styles.image} />
            </TouchableOpacity>
          )}
        </View>
        <View style = {styles.content} >
          <View style = {styles.bodyInput} >          
            <TextInput 
              label={'Nama Lengkap'}
              style = {styles.inputan} 
              placeholder = {'Nama Lengkap'}            
              value={displayName}
              onChangeText={setDisplayName}
              activeOutlineColor='#d32521'
              mode='outlined'
            />
          </View>
        </View>
        <TouchableOpacity style = {styles.continue} onPress={handlePress} disabled={!displayName || !selectedAvatar} >
          <Text style = {styles.textContinue} >Member Baru</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    justifyContent: "space-between"
  },
  headerText: {
    paddingHorizontal: Dimensions.get('window').height * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.03,
  },
  text: {
    fontSize: Dimensions.get('window').height * 0.03,
    fontFamily: fonts.primary[600],
    color: "#000"
  },
  textDeskripsi: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",
    fontFamily: fonts.primary[400],
    marginVertical: Dimensions.get('window').height * 0.02,
  },
  content: {
    paddingHorizontal: Dimensions.get('window').height * 0.04, 
    marginVertical: Dimensions.get('window').height * 0.04,   
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
    borderWidth: 1,
    borderColor: "#f4f4f4",
    paddingHorizontal: Dimensions.get('window').height * 0.02,
  },
  inputan2: {
    borderWidth: 1,
    borderColor: "#f4f4f4",
    paddingHorizontal: Dimensions.get('window').height * 0.02,
    paddingVertical: Dimensions.get('window').height * 0.02,
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
    fontFamily: fonts.primary[600]
  },
  image: {
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
    borderRadius: Dimensions.get('window').width * 0.5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})