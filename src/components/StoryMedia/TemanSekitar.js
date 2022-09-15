import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fonts} from '../../utils/Fonts';
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {auth, db} from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {v4 as uuidv4} from 'uuid';

const TemanSekitar = () => {
  const {currentUser} = auth;
  const idUser = currentUser.uid;
  console.log(idUser);
  const alluserRef = collection(db, 'users');
  const alluserQuery = query(
    alluserRef,
    where('email', '!=', currentUser.email),
  );
  const [alluser, setAlluser] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(alluserQuery, querySnapshot => {
      const parsedUsers = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      // const interval = setInterval(() => {
      //   setAlluser(parsedUsers, [Math.floor(Math.random())]);
      // }, 86400);

      // return () => interval();
      setAlluser(parsedUsers);
    });
    return () => unsubscribe();
  }, []);

  const [teman, setTeman] = useState([]);
  const queryKomentar = query(
    collection(db, 'Teman'),
    where('idSaatini', '==', idUser),
  );
  useEffect(() => {
    const unsubscribe = onSnapshot(queryKomentar, querySnapshot => {
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTeman(data);
    });
    return () => unsubscribe();
  }, []);

  const randomId = uuidv4();

  const senderUser = {
    displayName: currentUser.displayName,
    uid: currentUser.uid,
    photoURL: currentUser.photoURL,
    email: currentUser.email,
  };
  const [seeFreinds, setSeeFerinds] = useState(10);
  const handleSeeAnother = () => [setSeeFerinds(seeFreinds + 10)];
  const handleAddFreinds = async id => {
    try {
      const tambahTeman = {
        idAnotherUser: id,
        id: randomId,
        userData: senderUser,
        idSaatini: idUser,
      };
      await Promise.all([setDoc(doc(db, 'Teman', randomId), tambahTeman)]);
      console.log('berhasil tambah teman');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: fonts.primary[600],
            color: '#000',
          }}>
          Orang yang Mungkin Anda Kenal
        </Text>
        <TouchableOpacity onPress={() => handleSeeAnother()}>
          <Text
            style={{
              fontFamily: fonts.primary[400],
              color: '#d32521',
              fontSize: 10,
            }}>
            Lihat Semua
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={alluser.slice(0, seeFreinds)}
          horizontal
          keyExtractor={Item => Item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.contentTeman}>
                <View>
                  <Image source={{uri: item.photoURL}} style={styles.avatar} />
                  <Text
                    style={{
                      fontFamily: fonts.primary[600],
                      color: '#000',
                      marginTop: 5,
                      marginBottom: 20,
                    }}>
                    {item.displayName}
                  </Text>
                </View>

                <Pressable
                  style={styles.btnTeman}
                  onPress={() => handleAddFreinds(item.id)}>
                  <Ionicons name="person-add-sharp" size={12} color="#8FE3CF" />
                  <Text
                    style={{
                      color: '#8FE3CF',
                      fontFamily: fonts.primary[600],
                      fontSize: 12,
                      marginLeft: 5,
                    }}>
                    Tambah Teman
                  </Text>
                </Pressable>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default TemanSekitar;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#CFD2CF',
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  contentTeman: {
    marginRight: 12,
    marginTop: 12,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  btnTeman: {
    backgroundColor: '#3B9AE1',
    alignItems: 'center',
    padding: 6,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnNext: {
    backgroundColor: '#8FE3CF',
    padding: 12,
    borderRadius: 12,
  },
});
