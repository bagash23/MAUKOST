import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { DragDrop } from './DragDrop'

const ViewDrag = () => {
    const drag = (x: number, y: number) => {
        console.log("DRAG", x, y);
    }
    const drop = (x: number, y: number) => {
        console.log("DROP", x, y);
    }

    return (
        <SafeAreaView>
            <DragDrop 
                onDrag={drag} 
                onDrop={drop} 
            >            
            <Image source={{uri: "https://ecs7.tokopedia.net/img/blog/promo/2021/03/FLOATING-ICON-JANUARY-150x150-11.gif"}} style = {styles.bulet} /> 
            </DragDrop>

        </SafeAreaView>
    )
}

export default ViewDrag

const styles = StyleSheet.create({
    bulet: {
        width: Dimensions.get('window').width * 2 / 10,
        height: Dimensions.get('window').width * 2 / 10,
        borderRadius: 100,
        backgroundColor: "#000",
        position: "absolute",
        zIndex: 100,
        right: Dimensions.get("window").width / 10,
        bottom: Dimensions.get("window").width / 10
    },    
})