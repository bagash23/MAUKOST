import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import GlobalContext from '../context/Context'
import { Grid, Row, Col } from 'react-native-easy-grid'
import Avatar from './Avatar'


export default function RowList({type, user, room, image}) {
    const navigation = useNavigation()
    // const {theme: {colors}} = useContext(GlobalContext)
    const {colors} = useTheme()
    return (
        <TouchableOpacity onPress = {() => navigation.navigate('roomchat', {user, room, image})} >
            <Grid style = {{
                maxHeight: 120, 
                margin: Dimensions.get('window').height * 0.01,
            }} >
                <Col style = {{width: Dimensions.get("window").width * 0.20, alignItems: 'center', justifyContent: 'center'}} >
                    <Avatar user={user} size={type === "contacts" ? 60 : 60} />
                    <Text style = {{color: colors.text, fontSize: 12, marginTop: 12}} >{ user.displayName}</Text>
                </Col>
            </Grid>
        </TouchableOpacity>
    )
}