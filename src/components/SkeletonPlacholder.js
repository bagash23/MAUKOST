import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const SkeletonPlacholder = () => {
    return (
        <View style = {styles.container} >
            <ScrollView showsVerticalScrollIndicator = {false} style = {{
                flex: 1
            }} >
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator = {false} >
                        <SkeletonPlaceholder>
                            <View style = {{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }} >
                                <View>
                                    <View style={{
                                        margin: Dimensions.get('window').width * 0.04,
                                        width: Dimensions.get('window').width * 0.5, 
                                        height: Dimensions.get('window').width * 0.5, 
                                        borderTopLeftRadius: Dimensions.get('window').height * 0.01,
                                        borderTopRightRadius: Dimensions.get('window').height * 0.01,
                                    }} />
                                    <View
                                        style = {{
                                            marginVertical: Dimensions.get("window").width *0.02,
                                            marginHorizontal: Dimensions.get('window').width * 0.04,
                                            width: Dimensions.get('window').width * 0.5,
                                            height: Dimensions.get('window').width * 0.05,
                                            borderRadius: Dimensions.get('window').height * 0.01,
                                        }}
                                    />
                                    <View
                                        style = {{
                                            marginHorizontal: Dimensions.get('window').width * 0.04,
                                            width: Dimensions.get('window').width * 0.5,
                                            height: Dimensions.get('window').width * 0.05,
                                            borderRadius: Dimensions.get('window').height * 0.01,
                                        }}
                                    />
                                </View>
                                <View>
                                    <View style={{
                                        margin: Dimensions.get('window').width * 0.04,
                                        width: Dimensions.get('window').width * 0.5, 
                                        height: Dimensions.get('window').width * 0.5, 
                                        borderTopLeftRadius: Dimensions.get('window').height * 0.01,
                                        borderTopRightRadius: Dimensions.get('window').height * 0.01,
                                    }} />
                                    <View
                                        style = {{
                                            marginVertical: Dimensions.get("window").width *0.02,
                                            marginHorizontal: Dimensions.get('window').width * 0.04,
                                            width: Dimensions.get('window').width * 0.5,
                                            height: Dimensions.get('window').width * 0.05,
                                            borderRadius: Dimensions.get('window').height * 0.01,
                                        }}
                                    />
                                    <View
                                        style = {{
                                            marginHorizontal: Dimensions.get('window').width * 0.04,
                                            width: Dimensions.get('window').width * 0.5,
                                            height: Dimensions.get('window').width * 0.05,
                                            borderRadius: Dimensions.get('window').height * 0.01,
                                        }}
                                    />
                                </View>
                            </View>
                        </SkeletonPlaceholder>
                    </ScrollView>
                </View>
                <SkeletonPlaceholder>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get("window").width * 0.2, marginHorizontal: Dimensions.get("window").width * 0.04}}>
                        <View style={{width: 60, height: 60, }} />
                        <View style={{marginLeft: 20}}>
                            <View style={{width: 120, height: 20, borderRadius: 4}} />
                            <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get("window").width * 0.2, marginHorizontal: Dimensions.get("window").width * 0.04}}>
                        <View style={{width: 60, height: 60, }} />
                        <View style={{marginLeft: 20}}>
                            <View style={{width: 120, height: 20, borderRadius: 4}} />
                            <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Dimensions.get("window").width * 0.2, marginHorizontal: Dimensions.get("window").width * 0.04}}>
                        <View style={{width: 60, height: 60, }} />
                        <View style={{marginLeft: 20}}>
                            <View style={{width: 120, height: 20, borderRadius: 4}} />
                            <View style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}} />
                        </View>
                    </View>
                </SkeletonPlaceholder>

            </ScrollView>
        </View>
    )
}

export default SkeletonPlacholder

const styles = StyleSheet.create({
    container: {
        flex: 1,        
    }
})