import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import Avatar from './Avatar'
import { fonts } from '../utils/Fonts'

export default function Listitem({type, style, description, user, time, room, image, active}) {
    const navigation = useNavigation()    
    const {colors}  = useTheme()
    return (
        <TouchableOpacity style = {{height: 80, ...style, alignItems: 'center'}} onPress = {() => navigation.navigate('ROOMCHAT', {user, room, image})} >
            <Grid style = {{maxHeight: 80, borderBottomWidth: 1, borderBottomColor: "#F0EBE3"}} >
                <Col style = {{width: 70, alignItems: 'center', justifyContent: 'center'}} >
                    {/* <Avatar user={user} size={type === "contacts" ? 40 : 50} /> */}
                    {/* nama jadikan avatar */}
                    <Text>{user.displayName.split(" ").map((n) => n[0]).join("")}</Text>
                </Col>
                <Col style={{marginLeft: 10}} >
                    <Row style = {{alignItems: 'center'}} >
                        <Col>
                            <Text style = {{color: colors.text, fontFamily: fonts.primary[600]}} >{user.displayName}</Text>
                        </Col>
                        {time && (
                            <Col style = {{alignItems: 'flex-end', marginRight: 10}} >
                                <Text style = {{color: "#757575", fontSize: 11}} >{new Date(time.seconds * 1000).toLocaleDateString()}</Text>
                            </Col>
                            
                        )}
                        
                    </Row>
                    {description && (
                        <Row style = {{marginTop: -5}} >
                            <Text style = {{color: "#757575", fontSize: 13, width: Dimensions.get("window").width * 0.7}} >{description}</Text>
                        </Row>
                    )}
                    
            
                </Col>
            </Grid>
        </TouchableOpacity>
    )
}