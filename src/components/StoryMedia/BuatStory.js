import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {auth} from '../../config';
import {fonts} from '../../utils/Fonts';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const BuatStory = () => {
  const {currentUser} = auth;
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={{uri: currentUser.photoURL}} style={styles.avatar} />
          <TouchableOpacity style={styles.modalBuat}>
            <Text>{`Apa yang Anda pikirkan, ${currentUser.displayName} ?`}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
            <Entypo name="images" size={20} color="#EB1D36" />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: fonts.primary[600],
                color: '#000',
              }}>
              Foto / Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
            <AntDesign name="camera" size={20} color="#42855B" />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: fonts.primary[600],
                color: '#000',
              }}>
              Buat Cerita
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BuatStory;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: '#f4f4f4',
  },
  avatar: {
    width: (Dimensions.get('window').width * 2) / 22,
    height: (Dimensions.get('window').width * 2) / 22,
    borderRadius: (Dimensions.get('window').width * 2) / 20,
  },
  Header: {
    padding: (Dimensions.get('window').width * 2) / 80,
  },
  modalBuat: {
    backgroundColor: '#CFD2CF',
    marginLeft: 12,
    padding: 10,
    borderRadius: 15,
  },
});
