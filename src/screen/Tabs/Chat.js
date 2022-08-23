import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import Listitem from '../../components/ListItem'
import GlobalContext from '../../Context/Context'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../config'
import { fonts } from '../../utils/Fonts'

const Chat = () => {
    const { rooms, setRooms, setUnfilteredRooms, unfilteredRooms } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true);
    const { currentUser } = auth;
    const chatsQuery = query(
        collection(db, "rooms"),
        where("participantsArray", "array-contains",  currentUser.email)
    )
    useEffect(() => {
        const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
            const parsedChats = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                userB: doc.data().participants.find(p => p.email !== currentUser.email),
            }));
            if (loading) {
                setUnfilteredRooms(parsedChats)
                setRooms(parsedChats.filter((doc) => doc.lastMessage))
                setLoading(false)
            }
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
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
        )
    } else {

        if (rooms.length == 0) {
            return (
                <View style={{
                    flex: 1,
                    alignItems: 'center',        
                    justifyContent: 'center',
                    backgroundColor: '#fff',
                  // zIndex: 1000
                }}>
                    <Text style = {{
                        fontFamily: fonts.primary[600],
                        fontSize: 20,
                        color: "#000"
                    }} >
                        Obrolan Kosong
                    </Text>
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: 16,
                        color: '#000'
                    }}>Tidak ada pesan</Text>
                </View>
            )
        } else {
            return (
                <View style = {styles.container} >
                    <ScrollView showsVerticalScrollIndicator = {false} >
                        <View style = {styles.contanteHeader} >
                            <Text style = {styles.txtJudulSCreen} >Obrolan</Text>
                            
                        </View>
                        {rooms.map((room) => 
                            <Listitem 
                                type="chat" 
                                description={room.lastMessage.text} 
                                key={room.id} 
                                room={unfilteredRooms.find(r => r.participantsArray.includes(room.userB.email))} 
                                time={room.lastMessage.createdAt} 
                                user={room.userB}                    
                            />
                        )}
                    </ScrollView>
                </View>
            )
        }
    }
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contanteHeader: {
        marginHorizontal: Dimensions.get("window").width * 0.04,
        marginVertical: Dimensions.get("window").width * 1 / 100
    },
    txtJudulSCreen: {
        fontSize: Dimensions.get("window").width * 1 / 20,
        fontFamily: fonts.primary[600],
        color: "#000",
    }
})