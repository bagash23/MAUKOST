import { StyleSheet, Text, View, Dimensions, TextInput, Image, Pressable, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { pickImage, uploadImage } from '../../utils/imagePicker'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../config'
import { v4 as uuidv4 } from 'uuid'
import 'react-native-get-random-values';
import Toast from 'react-native-toast-message';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons'
import notifee from '@notifee/react-native';
import { Button } from 'react-native'
import RadioList from '../../components/RadioList'

const Post = () => {

  const [checked, setChecked] = useState(false)
  const [selectedImageAvatar, setSelectedImageAvatar] = useState(null)  
  const [selectedImageThumbnile, setSelectedImageThumbnile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImage2, setSelectedImage2] = useState(null)
  const [selectedImage3, setSelectedImage3] = useState(null)
  const [post, setPost] = useState(null);
  const navigation = useNavigation();
  const [uploading, setUploading] = useState(false);   
  const [postHash, setPostHash]  = useState('')
  const {  currentUser } = auth;
  const randomId = uuidv4();

  // inputan
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [nameKontrakan, setNameKontrakan] = useState('')
  const [kota, setKota] = useState('')
  const [sediaKamar, setSediaKamar] = useState(null)
  const [genre, setGenre] = useState('')

  

  // handle photo all
  const handleAvtarPress = async () => {
    const result = await pickImage();
    if (!result.didCancel) {
      setSelectedImageAvatar(result.assets.filter(asset => asset.fileName === asset.fileName));
    }    
  }

  const handleThumbnilePress = async () => {
    const result = await pickImage();
    if (!result.didCancel) {
      setSelectedImageThumbnile(result.assets.filter(asset => asset.fileName === asset.fileName));
    }
  }

  const handleImagePress = async () => {
    const result = await pickImage();
    if (!result.didCancel) {
      setSelectedImage(result.assets.filter(asset => asset.fileName === asset.fileName));
    }
  }

  const handleImagePress2 = async () => {
    const result = await pickImage();
    if (!result.didCancel) {
      setSelectedImage2(result.assets.filter(asset => asset.fileName === asset.fileName));
    }
  }

  const handleImagePress3 = async () => {
    const result = await pickImage();
    if (!result.didCancel) {
      setSelectedImage3(result.assets.filter(asset => asset.fileName === asset.fileName));
    }
  }

  const senderUser = {
    displayName: currentUser.displayName,
    uid: currentUser.uid,
    photoURL: currentUser.photoURL,
    email: currentUser.email
  }

  const imageDetil = {
    image1: selectedImage,
    image2: selectedImage2,
    image3: selectedImage3,
  }

  // membuat handle post
  const handlePost = async () => {
    if (!checked || !nameKontrakan || !price || !kota || !sediaKamar || !address || !description || !selectedImage || !selectedImage2 || !selectedImage3 || !selectedImageAvatar || !name || !email || !phone ) {
      toastMessage({
        type: 'error',
        title: 'Gagal menambahkan kontrakan',
        message: 'Mohon lengkapi data anda',
      })
      return;
    } else {
        setUploading(true);
        var avatarMitra;
        var thumbnailMitra;
        var imageMitra;
        var imageMitra2;
        var imageMitra3;
    
        if (selectedImageAvatar) {
          const { url } = await uploadImage(selectedImageAvatar[0].uri, `images/kontrakan/${randomId}`, 'avatarMitra');
          avatarMitra = url;
        }
    
        if (selectedImageThumbnile) {
          const { url } = await uploadImage(selectedImageThumbnile[0].uri, `images/kontrakan/${randomId}`, 'thumbnailMitra');
          thumbnailMitra = url;
        }
    
        if (selectedImage) {
          const { url } = await uploadImage(selectedImage[0].uri, `images/kontrakan/${randomId}`, 'imageMitra');
          imageMitra = url;
        }
    
        if (selectedImage2) {
          const { url } = await uploadImage(selectedImage2[0].uri, `images/kontrakan/${randomId}`, 'imageMitra2');
          imageMitra2 = url;
        }
    
        if (selectedImage3) {
          const { url } = await uploadImage(selectedImage3[0].uri, `images/kontrakan/${randomId}`, 'imageMitra3');
          imageMitra3 = url;
        }
    
        const post = {
          id: randomId,
          namePemilik: name,
          descriptionKontrakan: description,
          hargaKontrakan: price,
          emailPemilik: email,
          phonePemilik: phone,
          addressKontrakan: address,
          nameKontrakan: nameKontrakan,
          kota: kota,
          modelKost: genre,
          fasilitas: selectedFasilitas,
          idUsers: currentUser.uid,
          user: senderUser,
          jumlahKamar: sediaKamar,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
    
      if (avatarMitra && thumbnailMitra && imageMitra && imageMitra2 && imageMitra3) {
        post.avatarImage = avatarMitra;
        post.thumbnileImage = thumbnailMitra;
        post.detilImage = {
          image1: imageMitra,
          image2: imageMitra2,
          image3: imageMitra3,
        }
      }
    
        await Promise.all([
          setDoc(doc(db, "Kontrakan", randomId), post),
        ]);
        setUploading(false);
        navigation.reset({ index: 0, routes: [{ name: 'myApp' }] });    
      }
    
      const toastMessage = ({type, title, message}) => {
        Toast.show({
            type,
            text1: title,
            text2: message,
        });      
    }
  };


  const fasilitasList = [
    {
      name: 'Fasilitas',
      id: 0,

      children: [
        {
          name: 'Parkir',
          id: 1,
        },
        {
          name: 'Security',
          id: 2,
        },
        {
          name: 'Wi-Fi',
          id: 3,
        },
        {
          name: 'Dapur Bersama',
          id: 4,
        },
        {
          name: 'Rooftop',
          id: 5,
        },
        {
          name: 'Kost Wanita',
          id: 6,
        },
        {
          name: 'Kost Pria',
          id: 7,
        },    
      ]
    }
  ]

  const [selectedFasilitas, setSelectedFasilitas] = useState([]);
  console.log(selectedFasilitas, "WLWLWLL");

  return (
    <View style = {styles.container} >
      <ScrollView>
        <View style = {styles.contentBody} >
          <Text style = {{
            fontSize: 16,
            fontWeight: 'bold',
            color: "#000",
          }} >Data Diri</Text>
          <View style = {styles.dataDiri} >
            {/* <Image source={selectedImageAvatar} style = {styles.imageAvatar} /> */}
            <Pressable onPress={handleAvtarPress} >
              {!selectedImageAvatar ? (<Image source = {require('../../assets/user.png')} style = {styles.imageAvatar} />): (<Image source = {selectedImageAvatar} style = {styles.imageAvatar}/>)}
            </Pressable>
            <View style = {styles.bodyContentDataDiri} >
              <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
                <Text style = {styles.bodyTitleOwner} >Nama Lengkap Pemilik</Text>
                <TextInput 
                  style = {styles.input} 
                  placeholder = 'Nama lengkap anda' 
                  onChangeText = {setName}
                  value = {name}
                />
              </View>
              <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
                <Text style = {styles.bodyTitleOwner} >Email Pemilik</Text>
                <TextInput 
                  style = {styles.input} 
                  placeholder = 'example@mail.com' 
                  onChangeText = {setEmail}
                  value = {email}
                />
              </View>
              <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
                <Text style = {styles.bodyTitleOwner} >Nomor Handphone Pemilik</Text>
                <TextInput 
                  style = {styles.input} 
                  placeholder = '08++'  
                  onChangeText = {setPhone}
                  value = {phone}
                  keyboardType = 'decimal-pad'
                />
              </View>
            </View>
          </View>

          <Text style = {{
            fontSize: 16,
            fontWeight: 'bold',
            color: "#000",
          }} >Data Kost</Text>
          <View style = {styles.dataKontrakan} >
            <Pressable style = {styles.dataKontrakanContentImage} onPress={handleThumbnilePress} >
              {!selectedImageThumbnile ? (
                <Image source = {require('../../assets/insert-picture-icon.png')} style = {styles.imageAvatar2} />                
              ) : (
                <Image source = {selectedImageThumbnile} style = {styles.imageThumbnile} />
              )}
            </Pressable>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
              <Text style = {styles.bodyTitleOwner} >Nama Kost</Text>
              <TextInput 
                style = {styles.inputKontrakan} 
                placeholder = 'tulis nama kontrakan' 
                onChangeText = {setNameKontrakan}
                value = {nameKontrakan}
              />
            </View>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
              <Text style = {styles.bodyTitleOwner} >Harga</Text>
              <TextInput 
                style = {styles.inputKontrakan} 
                placeholder = 'tulis biaya kontrakan anda' 
                onChangeText = {setPrice}
                value = {price}
                keyboardType = 'numeric'
              />
            </View>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
              <Text style = {styles.bodyTitleOwner} >Kota</Text>
              <TextInput 
                style = {styles.inputKontrakan} 
                placeholder = 'tulis kota anda' 
                onChangeText = {setKota}
                value = {kota}
              />
            </View>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
              <Text style = {styles.bodyTitleOwner} >Jumlah Kamar</Text>
              <TextInput 
                style = {styles.inputKontrakan} 
                placeholder = 'tulis jumlah kamar yang tersedia' 
                onChangeText = {setSediaKamar}
                value = {sediaKamar}
                keyboardType = 'numeric'
              />
            </View>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
              <Text style = {styles.bodyTitleOwner} >Fasilitas</Text>
              <SectionedMultiSelect
                items={fasilitasList}
                uniqueKey="name"
                subKey='children'
                displayKey='name'
                selectText="Pilih Fasilitas"
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={setSelectedFasilitas}
                selectedItems={selectedFasilitas}
                IconRenderer={Icon}
              />
            </View>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.03}} >
              <Text style = {styles.bodyTitleOwner} >Model Kost-an</Text>
              <RadioList
                onPick={setGenre}
              />
            </View>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
              <Text style = {styles.bodyTitleOwner} >Alamat Spesifik Lokasi</Text>
              <TextInput 
                style = {styles.inputKontrakanDeskripsi} 
                placeholder = 'tulis alamat spesifik' 
                numberOfLines={10} 
                multiline={true} 
                onChangeText = {setAddress}
                value = {address}
              />
            </View>
            <View style = {{marginVertical: Dimensions.get('window').width * 0.02}} >
              <Text style = {styles.bodyTitleOwner} >Deksripsi Kost</Text>
              <TextInput 
                style = {styles.inputKontrakanDeskripsi} 
                placeholder = 'tulis deskripsi kontrakan' 
                numberOfLines={10} 
                multiline={true} 
                onChangeText = {setDescription}
                value = {description}
              />
            </View>
            <View style = {styles.detailImageKontrakan} >
              <Pressable style = {styles.dataKontrakanContentImageDetail} onPress = {handleImagePress} >
                {!selectedImage ? (<Image source = {require('../../assets/insert-picture-icon.png')} style = {styles.imageAvatar2} />) : (<Image source = {selectedImage} style = {styles.imageThumbnile2} />)}
              </Pressable>
              <Pressable style = {styles.dataKontrakanContentImageDetail} onPress = {handleImagePress2} >
                {!selectedImage2 ? (<Image source = {require('../../assets/insert-picture-icon.png')} style = {styles.imageAvatar2}/>) : (<Image source = {selectedImage2} style = {styles.imageThumbnile2} />)}
              </Pressable>
              <Pressable style = {styles.dataKontrakanContentImageDetail} onPress = {handleImagePress3} >
                {!selectedImage3 ? (<Image source = {require('../../assets/insert-picture-icon.png')} style = {styles.imageAvatar2} />) : (<Image source = {selectedImage3} style = {styles.imageThumbnile2} />)}
              </Pressable>
            </View>
          </View>
        </View>
        <View style = {{
          flexDirection: "row",
          alignItems: 'center',        
        }} >
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color= "#d32521"
          />
          <Text style = {{
            fontSize: Dimensions.get('window').width * 0.03,
            color: "#000",
            width: Dimensions.get('window').width * 0.8,
          }} >Bahwa anda telah mengisi data dengan benar dan siap dipertanggung jawabkan</Text>
        </View>
        {uploading ? (                
            <View style={{
              flex: 1,
              alignItems: 'center',        
              justifyContent: 'center',
              backgroundColor: '#fff',
                    // zIndex: 1000
            }}>
              <Image source={require("../../assets/loading.gif")} style = {{
                width: 50,
                height: 50
              }} />
            </View>
              
            ) : null}
        <TouchableOpacity 
          style = {styles.continue} 
          disabled = {!checked || !nameKontrakan || !price || !kota || !sediaKamar || !address || !description || !selectedImage || !selectedImage2 || !selectedImage3 || !selectedImageAvatar || !name || !email || !phone || !genre}
          onPress={handlePost}
        >
          <Text  style = {styles.textContinue} >Kirim Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  contenHeader: {
    alignItems: 'center',    
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.03,
    backgroundColor: "#d32521"
  },
  bodyTitleDesk: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#fff",
    fontWeight: 'bold',
  },
  bodyTitleBrand: {
    fontSize: Dimensions.get('window').width * 0.06,
    color: "#fff",
    fontWeight: 'bold',
  },
  contentBody: {
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.03,
  },
  imageAvatar: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: Dimensions.get('window').width * 0.1,
  },
  imageAvatar2: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,    
  },
  imageThumbnile: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.5,
  },
  dataDiri: {
    flexDirection: 'row',    
    paddingVertical: Dimensions.get('window').height * 0.03,      
  },
  bodyContentDataDiri: {
    paddingHorizontal: Dimensions.get('window').width * 0.04,
  },
  bodyTitleOwner: {
    fontSize: Dimensions.get('window').width * 0.03,
    color: "#000",
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
    width: Dimensions.get('window').width * 0.6,
    paddingHorizontal: Dimensions.get('window').width * 0.04,
    paddingVertical: Dimensions.get('window').height * 0.01,
  },
  dataKontrakanContentImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.5,
    backgroundColor: '#f4f4f4',    
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Dimensions.get('window').height * 0.03,
  },
  inputKontrakanDeskripsi: {
    height: Dimensions.get('window').width * 0.3,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#f4f4f4',
  },
  inputKontrakan: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
  },
  detailImageKontrakan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Dimensions.get('window').height * 0.02,
    alignItems: 'center'
  },

  dataKontrakanContentImageDetail: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').width * 0.01,
  },
  imageThumbnile2: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
  },
  continue: {
    backgroundColor: "#d32521",
    paddingVertical: Dimensions.get('window').height * 0.02,
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').height * 0.04,    
    borderRadius: Dimensions.get('window').height * 0.05,
    marginVertical: Dimensions.get('window').height * 0.03,
  },
  textContinue: {
    fontSize: Dimensions.get('window').height * 0.02,
    color: "#fff",
    fontWeight: "bold"
  }
})