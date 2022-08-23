// @refresh result
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { auth, db } from '../../config';
import 'react-native-get-random-values';
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { Actions, Bubble, GiftedChat } from 'react-native-gifted-chat';
import { v4 as uuidv4 } from 'uuid'
import { fonts } from '../../utils/Fonts';

const randomId = uuidv4();

const RoomChat = () => {    
    const [roomHash, setRoomHash] = useState("");
    const [messages, setMessages] = useState([]);    

    const route = useRoute();
    const room = route.params.room
    console.log(room, "WKWKWK");
    const image = route.params.iamge;
    console.log(image, "WKWKWK");
    const { currentUser } = auth;    
    const userB  = route.params.user;    
    console.log(userB, "wlwlwlwl");


    const senderUser = currentUser.photoURL ? {name: currentUser.displayName, _id: currentUser.uid, avatar: currentUser.photoURL} : {name: currentUser.displayName, _id: currentUser.uid} ;
    const roomId = room ? room.id : randomId;

    const roomRef = doc(db, "rooms", roomId);
    const roomMessageRef = collection(db, "rooms", roomId, "messages");

    useEffect(() => {
        (async () => {
            if (!room) {
                const currentUserData = {
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                }
                if (currentUser.photoURL) {
                    currentUser.photoURL = currentUser.photoURL;
                }
                const userBData = {
                    displayName: userB.displayName,
                    email: userB.email,
                }
                if (userB.photoURL) {
                    userB.photoURL = userB.photoURL;
                }
                const roomData = {
                    participants: [currentUserData, userBData],
                    participantsArray: [currentUser.email, userB.email],
                }
                try {
                    await setDoc(roomRef, roomData);
                } catch (error) {
                    console.log(error);
                }
                const emailHash = `${currentUser.email} : ${userB.email}`;
                setRoomHash(emailHash);
            }
        })()
    },[])

    useEffect(() => {
        const unsubscribe = onSnapshot(roomMessageRef, querySnapshot => {
            const messagesFirestore = querySnapshot.docChanges().filter(({type}) => type === "added").map(({doc}) => {
                const message = doc.data();
                return {...message, createdAt: message.createdAt.toDate()};
            }).sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
            appendMessages(messagesFirestore)
        })
        return () => unsubscribe();
    },[])

    const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },[messages])

    async function onSend(messages = []) {
        const writes = messages.map(m => addDoc(roomMessageRef, m));
        const lastMessage = messages[messages.length - 1];    

        writes.push(updateDoc(roomRef, {lastMessage} ));
        await Promise.all(writes);
    };


    return (
        <View style = {styles.container} >
            <View style = {styles.header} >  
                <Text style = {styles.txtHeader} >
                    {userB.displayName}
                </Text>                
            </View>
            <GiftedChat
                onSend={onSend}
                messages={messages}
                user={senderUser}
                renderAvatar={null}
                timeTextStyle={{right: {color: "#fff"}}}
                renderBubble={(props) => (
                    <Bubble {...props}  textStyle={{right: {color: "#fff"}}} wrapperStyle = {{left: {backgroundColor: "#fff"}, right: {backgroundColor: "#d32521"}}} />
                )} 
            />            
        </View>
    )
}

export default RoomChat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }, 
    header: {
        paddingVertical: Dimensions.get("window").width * 0.02,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtHeader: {
        fontFamily: fonts.primary[600],
        textAlign: 'center',
        color: "#000"
    },
})