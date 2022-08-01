import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../../config'
import { version } from '../../../package.json'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, useTheme } from '@react-navigation/native'
import Toast from 'react-native-toast-message';
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { fonts } from '../../utils/Fonts'

const Profile = () => {
  const navigation = useNavigation()
  const { currentUser } = auth;
  const [jumlahBooking, setJumlahBooking] = useState(0);  
  const DataBooking = query(collection(db, "Booking"), where("idUser", "==", currentUser.uid))
  useEffect(() => {
    const unsubscribe = onSnapshot(DataBooking, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))
        setJumlahBooking(data.length)
    })
    return () => unsubscribe()
  },[])

  const handlePressAndJumlahBooking = () => {
    navigation.navigate('HISTORYPENYEWAAN')
    setJumlahBooking(0)
  }
  
  const toastMessage = ({type, title, message}) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
    });
  };

  const [show, setShow] = useState(false)  

  const signOut = async () => {    
    await auth.signOut();
    toastMessage({
      type: 'success',
      title: "Keluar Berhasil",
      message: "Selamat tinggal",
    })
    navigation.replace("SPLASH")
  }

  return (
    <View style = {styles.container} >
      <TouchableOpacity style = {styles.bgAvatar} onPress = {() => setShow(true)} >
      {!currentUser.photoURL ? (
          <Image source = {require('../../assets/user.png')} style = {styles.avatar} />
        ) : (
          <Image source = {{uri: currentUser.photoURL}} style = {styles.avatar} />
        )}
        <View>
          <Text style = {styles.avatarName} >{currentUser.displayName}</Text>
          <Text style = {styles.avatarEmail} >{currentUser.email}</Text>
        </View>
      </TouchableOpacity>
      <View style = {styles.contentBody} >
        <View style = {{
          marginVertical: 5,
          backgroundColor: "#fff",
          paddingHorizontal: Dimensions.get('window').width * 0.05,
          paddingVertical: Dimensions.get('window').width * 0.02,
        }} >
          <Text style = {styles.avatarEmail} >Kontrakan</Text>
          <TouchableOpacity style = {{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5
          }} onPress = {() => navigation.navigate("HOMEKONTRAKAN")} >
            <Text style = {styles.titleDeskKontrakan}  >Kost-an Saya</Text>
            <AntDesign name="right" size={12} color="black" />
          </TouchableOpacity>
        </View>        
        <View style = {{
          marginVertical: 5,
          backgroundColor: "#fff",
          paddingHorizontal: Dimensions.get('window').width * 0.05,
          paddingVertical: Dimensions.get('window').width * 0.02,
        }} >
          <Text style = {styles.avatarEmail} >Akun saya</Text>
          <TouchableOpacity style = {{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
          }} 
            onPress={() => navigation.navigate("EDITAKUN") }
          >
            <Text style = {styles.titleDeskKontrakan} >Edit Akun</Text>
            <AntDesign name="right" size={12} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style = {{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 5,
          }} 
            onPress = {handlePressAndJumlahBooking}
          >
            <Text style = {styles.titleDeskKontrakan} >History Penyewaan</Text>
            {jumlahBooking > 0 ? (
              <View style = {{
                backgroundColor: "#d32521",
                width: Dimensions.get('window').width * 0.05,
                height: Dimensions.get('window').width * 0.05,
                borderRadius: Dimensions.get('window').width * 0.05,
                alignItems: 'center',
                justifyContent: "center",
                position: "absolute",
                right: Dimensions.get('window').width * 0.05,
              }} >
                <Text style = {{
                  color: "#fff",
                  fontSize: Dimensions.get('window').width * 0.03,
                  fontFamily: fonts.primary[400],
                }} >{jumlahBooking}</Text>
              </View>
            ) : (
              null
            )}
            
            <AntDesign name="right" size={12} color="black" />
          </TouchableOpacity>
        </View>    
        <View style = {{
          marginVertical: 5,
          backgroundColor: "#fff",
          paddingHorizontal: Dimensions.get('window').width * 0.05,
          paddingVertical: Dimensions.get('window').width * 0.02,
        }} >
          <Text style = {styles.avatarEmail} >Aplikasi</Text>
          <TouchableOpacity style = {{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }} 
            onPress={() => navigation.navigate("TENTANGKAMI") }
          >
            <Text style = {styles.titleDeskKontrakan} >Tentang Kami</Text>
            <AntDesign name="right" size={12} color="black" />
          </TouchableOpacity>
          {/* <TouchableOpacity style = {{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }} 
            onPress = {() => navigation.navigate("SYARATKETENTUAN")}
          >
            <Text style = {styles.titleDeskKontrakan} >Syarat dan Ketentuan</Text>
            <AntDesign name="right" size={12} color="black" />
          </TouchableOpacity> */}
          <TouchableOpacity style = {{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 10,
          }} onPress = {signOut} >
            <Text style = {styles.textLogout} >Keluar</Text>
            <AntDesign name="right" size={12} color="black" />
          </TouchableOpacity>
        </View>    
      </View>
      <View style = {{
        position: "absolute",
        bottom: Dimensions.get('window').height * 0.02,
        width: Dimensions.get('window').width,

      }} >
        <Text style = {styles.textVersion} >Version - {version}</Text>
      </View>

      {show && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
        >
          <View style = {styles.contentView} >
            <View style = {styles.modalView} >
              <TouchableOpacity style = {{
                backgroundColor: "#d32521",
                padding: Dimensions.get('window').width * 0.02,
                position: "absolute",
                right: Dimensions.get('window').width * 0.02,
                top: Dimensions.get('window').width * 0.02,
                borderRadius: Dimensions.get('window').width * 0.2,
              }}
                onPress={() => setShow(false)}
              >
                <AntDesign name="close" size={Dimensions.get('window').width * 0.03} color="#fff" />
              </TouchableOpacity>

              <View style = {{
                flexDirection: "row",
                alignItems: 'center',
                marginVertical: Dimensions.get('window').width * 0.05,
              }} >                
                <Image source = {require('../../assets/logo_app.png')} style = {styles.avatar} />
                <Text style = {{
                  fontSize: Dimensions.get('window').width * 0.05,
                  fontFamily: fonts.primary[600],
                  color: "#000"
                }} >MAUKOST</Text>
              </View>
              <View style = {{
                alignItems: "center",
                marginVertical: Dimensions.get('window').width * 0.05,
              }} >                
                <Image source = {{uri: currentUser.photoURL}} style = {styles.avatarModal} />
                <View style = {{
                  marginVertical: Dimensions.get('window').width * 0.05,
                  alignItems: 'center'
                }} >
                  <Text style = {styles.avatarName} >{currentUser.displayName}</Text>
                  <View style = {{
                    flexDirection: "row",
                    alignItems: 'center',
                  }} >
                    <MaterialCommunityIcons name="email" size={Dimensions.get('window').width * 0.05} color="black" style = {{
                      marginRight: Dimensions.get('window').width * 0.03,
                    }} />
                    <Text style = {styles.avatarEmail} >{currentUser.email}</Text>                    
                  </View>
                  <View style = {{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginTop: Dimensions.get('window').width * 0.03,
                  }}>
                    <AntDesign name="checkcircle" size={Dimensions.get('window').width * 0.05} color="#2FDD92" style = {{
                      marginRight: Dimensions.get('window').width * 0.03,
                    }} />
                    <Text style = {{
                      fontSize: Dimensions.get("window").width / 30,
                      color: "#2FDD92",
                      fontFamily: fonts.primary[600],                      
                    }} >Email sudah terverifikasi</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  avatar: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,        
    borderRadius: Dimensions.get("window").width * 0.1,
    marginRight: Dimensions.get("window").width * 0.05,
  },
  bgAvatar: {        
    alignItems: "center",    
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: Dimensions.get("window").width * 0.05,
    paddingVertical: Dimensions.get("window").width * 0.03,

  },
  avatarName: {
    fontSize: Dimensions.get("window").width * 0.03,
    fontWeight: "bold",
    color: '#000',
    // marginTop: Dimensions.get("window").height * 0.02,
  },
  avatarEmail: {
    fontSize: Dimensions.get("window").width * 0.03,
    color: '#000',
  },
  textVersion: {
    fontSize: Dimensions.get("window").width * 0.03,
    color: '#000',
    textAlign: "center",
  },
  btnLogout: {
    backgroundColor: '#d32521',
    borderRadius: Dimensions.get("window").height * 0.01,
    paddingVertical: Dimensions.get("window").height * 0.01,
    paddingHorizontal: Dimensions.get("window").width * 0.01,
    marginVertical: Dimensions.get("window").height * 0.01,
    marginHorizontal: Dimensions.get("window").width * 0.05,
  },
  textLogout: {
    fontSize: Dimensions.get("window").width * 0.03,    
    fontWeight: 'bold',
    color: "#000"
  },
  titleDeskKontrakan: {
    fontSize: Dimensions.get("window").width * 0.03,
    color: '#000',
    fontWeight: 'bold',
  },
  contentView: {
    backgroundColor: "rgba(0,0,0,0.5)",    
    height: Dimensions.get("window").height,
  },
  modalView: {
    backgroundColor: "#fff",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.5,
    marginHorizontal: Dimensions.get("window").width * 0.05,
    marginVertical: Dimensions.get("window").height * 0.05,
    borderRadius: Dimensions.get("window").height * 0.01,
  },
  avatarModal: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").width * 0.3,
    borderRadius: Dimensions.get("window").width * 0.4,    
  }
})