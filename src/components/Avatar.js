import { Dimensions, Image, View } from 'react-native'
import React from 'react'

export default function Avatar({size, user}) {
    return (
        <Image style = {{
            width: size,
            height: size,
            borderRadius: size
        }} source = {user.avatar ? {uri: user.avatar} : require('../assets/user.png')} resizeMode="cover" />
    )
}