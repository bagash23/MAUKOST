import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { auth, db } from '../../config'
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore'
import ChatItem from '../../components/ChatItem'
import { Actions, Bubble, GiftedChat } from 'react-native-gifted-chat';

const Coba = () => {
    const route = useRoute();
    const dataRoom = route.params.dataKontrakan;    
    const { currentUser } = auth;
    const [messages, setMessages] = useState([]);

    // membuat useEffect untuk membuat screen pesan
    useEffect(() => {
        const getMessages = async () => {
            const snapshot = await query(collection('chat').doc(dataRoom.id).collection('messages').orderBy('createdAt', 'asc'));
            const messages = [];
            snapshot.forEach(doc => {
                messages.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
            );
            setMessages(messages);
        }
        getMessages();
    }, []);

    //  setelah user mengklik tombol kirim, maka akan mengirimkan pesan ke database
    const sendMessage = useCallback(async (text) => {
        if (text.trim() === '') {
            return;
        }
        const message = {
            text,
            createdAt: new Date(),
            user: {
                id: currentUser.uid,
                name: currentUser.displayName,
                photoURL: currentUser.photoURL
            }
        };
        await setDoc(collection('chat').doc(dataRoom.id).collection('messages').add(message)); 
    }, [currentUser.uid]);


    return (
        <View style = {styles.page} >        
            <GiftedChat
                messages={messages}
                onSend={sendMessage}
                user={{
                    _id: currentUser.uid,
                    name: currentUser.displayName,
                    avatar: currentUser.photoURL
                }}
                renderAvatar={null}
            />

        </View>
    )
}

export default Coba

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },  
})