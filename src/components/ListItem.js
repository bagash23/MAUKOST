import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ListItem = ({user, room, image}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style = {{
            flexDirection: "row",
            alignItems: "center"
        }} 
            onPress={() => navigation.navigate('ROOMCHAT', {user, room, image})}
        >            
            <Image source={{uri: user.photoURL}} style = {{
                width: Dimensions.get("window").width * 0.1,
                height: Dimensions.get("window").width * 0.1,
                borderRadius: Dimensions.get("window").width * 0.1,
            }} />
            <View style = {{
                marginLeft: Dimensions.get("window").width * 0.02,
            }} >
                <Text>{user.displayName}</Text>
                <Text>Chat Sekarang</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({})