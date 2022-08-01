import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import { Animated, View, Text, Dimensions, FlatList, Image, Pressable, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../config';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../utils/Fonts';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import DropDownPicker from 'react-native-dropdown-picker';

const Top = createMaterialTopTabNavigator()

const All = () => {
    const [semuaAll, setSemuaAll] = useState([])    
    const { currentUser } = auth;
    const [loading, setLoading] = useState(true);
    const semuaKontrakan = query(collection(db, "Kontrakan"), where("user", "!=", currentUser.uid ))    

    useEffect(() => {
        const unsubscribe = onSnapshot(semuaKontrakan, (querySnapshot) => {
        const parsedPostingKontrakan = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
            if (loading) {
                setSemuaAll(parsedPostingKontrakan)
                setLoading(false)
            }
        })
        return () => unsubscribe()
    }, [])

    const navigation = useNavigation()


    return (
        <View style = {{
            flex: 1,            
        }} >
            {loading ? (
                <ScrollView showsVerticalScrollIndicator = {false} style = {{
                    flex: 1
                  }}  >
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
            ) : (
                <>
                    <FlatList
                        data={semuaAll}
                        showsVerticalScrollIndicator = {false}
                        renderItem={({ item, index }) => {
                            return (
                            <Pressable key={index} style = {{
                                paddingHorizontal: Dimensions.get('window').width * 0.04,
                                paddingVertical: Dimensions.get('window').height * 0.01,
                                marginBottom: Dimensions.get('window').width * 0.02,
                                flexDirection: "row",
                                backgroundColor: "#fff",
                            }} onPress = {() => navigation.navigate("TempatDetail", {item})} >
                                <View>
                                    <Image source={{uri: item.thumbnileImage}} style = {{
                                        width: Dimensions.get('window').width * 0.2,
                                        height: Dimensions.get('window').width * 0.2,
                                    }} />
                                </View>
                                <View style = {{
                                    marginLeft: Dimensions.get("window").width * 0.02,
                                }} >
                                    {item.jumlahKamar === 0 ? (
                                        <View style = {{
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        }} >
                                            <AntDesign name="closecircle" size={12} color="red" />
                                            <Text style = {{
                                                fontSize: Dimensions.get("window").width / 30,
                                                color: "#EB1D36",
                                                fontFamily: fonts.primary[600],
                                                marginLeft: Dimensions.get("window").width * 0.02,
                                            }} >Kamar tidak tersedia</Text>
                                        </View>
                                ) : (
                                        <View style = {{
                                        flexDirection: "row",
                                        alignItems: 'center',                      
                                        }} >
                                            <AntDesign name="checkcircle" size={12} color="#2FDD92" />
                                            <Text style = {{
                                                fontSize: Dimensions.get("window").width / 30,
                                                color: "#2FDD92",
                                                fontFamily: fonts.primary[600],
                                                marginLeft: Dimensions.get("window").width * 0.02,                                
                                            }} >Kamar tersedia</Text>
                                        </View>
                                )}
                                    <View>
                                    <Text style = {{
                                        fontSize: Dimensions.get('window').width * 0.04,
                                        color: "#000",
                                        fontFamily: fonts.primary[600]
                                    }} >{item.nameKontrakan}</Text>
                                    <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                        <Entypo name="location-pin" size={15} color="black" />
                                        <Text style = {{
                                            fontSize: Dimensions.get('window').width * 0.03,
                                            color: "#000",
                                            paddingTop: Dimensions.get('window').height * 0.01,
                                            fontFamily: fonts.primary[400]
                                        }} >{item.kota}</Text>
                                    </View>
                                    </View>
                                    <View style = {{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: Dimensions.get('window').height * 0.02,
                                        marginHorizontal: Dimensions.get('window').width * 0.02,   
                                    }} >
                                        <Text style = {{
                                            fontSize: Dimensions.get('window').width * 0.03,
                                            color: "#000",
                                            marginRight: Dimensions.get('window').width * 0.02,    
                                            fontFamily: fonts.primary[400]
                                        }} >Harga</Text>
                                        <Text style = {{
                                            fontSize: Dimensions.get('window').width * 0.04,
                                            color: "#000",
                                            fontFamily: fonts.primary[600]
                                        }} >Rp. {item.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}}
                    />
                </>
            )}
        </View>
    )
}

const Open = () => {
    const [terbaru, setTerbaru] = useState([])
    const { currentUser } = auth;
    const [loading, setLoading] = useState(true);
    const terbaruKontrakan = query(collection(db, "Kontrakan"), where("user", "!=", currentUser.uid ))

    useEffect(() => {
        const unsubscribe = onSnapshot(terbaruKontrakan, (querySnapshot) => {
        const parsedPostingKontrakan = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))
            if (loading) {
                setTerbaru(parsedPostingKontrakan)
                setLoading(false)
            }
        })
        return () => unsubscribe()
    }, [])

    const navigation = useNavigation()
    return (
        <View style = {{
            flex: 1,            
        }} >
            {loading ? (
                <ScrollView showsVerticalScrollIndicator = {false} style = {{
                    flex: 1
                  }}  >
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
            ): (
                <FlatList
                data={terbaru.sort((a, b) => b.updatedAt - a.updatedAt)}
                showsVerticalScrollIndicator = {false}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable key={index} style = {{
                            paddingHorizontal: Dimensions.get('window').width * 0.04,
                            paddingVertical: Dimensions.get('window').height * 0.01,
                            marginBottom: Dimensions.get('window').width * 0.02,
                            flexDirection: "row",
                            backgroundColor: "#fff",
                        }} onPress = {() => navigation.navigate("TempatDetail", {item})} >
                            <View>
                                <Image source={{uri: item.thumbnileImage}} style = {{
                                    width: Dimensions.get('window').width * 0.2,
                                    height: Dimensions.get('window').width * 0.2,
                                }} />
                            </View>
                            <View style = {{
                                marginLeft: Dimensions.get("window").width * 0.02,
                            }} >
                                {item.jumlahKamar === 0 ? (
                                    <View style = {{
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    }} >
                                        <AntDesign name="closecircle" size={12} color="red" />
                                        <Text style = {{
                                            fontSize: Dimensions.get("window").width / 30,
                                            color: "#EB1D36",
                                            fontFamily: fonts.primary[600],
                                            marginLeft: Dimensions.get("window").width * 0.02,
                                        }} >Kamar tidak tersedia</Text>
                                    </View>
                            ) : (
                                    <View style = {{
                                    flexDirection: "row",
                                    alignItems: 'center',                      
                                    }} >
                                        <AntDesign name="checkcircle" size={12} color="#2FDD92" />
                                        <Text style = {{
                                            fontSize: Dimensions.get("window").width / 30,
                                            color: "#2FDD92",
                                            fontFamily: fonts.primary[600],
                                            marginLeft: Dimensions.get("window").width * 0.02,                                
                                        }} >Kamar tersedia</Text>
                                    </View>
                            )}
                                <View>
                                <Text style = {{
                                    fontSize: Dimensions.get('window').width * 0.04,
                                    color: "#000",
                                    fontFamily: fonts.primary[600]
                                }} >{item.nameKontrakan}</Text>
                                <View style = {{flexDirection: 'row', alignItems: 'center'}} >
                                    <Entypo name="location-pin" size={15} color="black" />
                                    <Text style = {{
                                        fontSize: Dimensions.get('window').width * 0.03,
                                        color: "#000",
                                        paddingTop: Dimensions.get('window').height * 0.01,
                                        fontFamily: fonts.primary[400]
                                    }} >{item.kota}</Text>
                                </View>
                                </View>
                                <View style = {{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: Dimensions.get('window').height * 0.02,
                                    marginHorizontal: Dimensions.get('window').width * 0.02,   
                                }} >
                                    <Text style = {{
                                        fontSize: Dimensions.get('window').width * 0.03,
                                        color: "#000",
                                        marginRight: Dimensions.get('window').width * 0.02,    
                                        fontFamily: fonts.primary[400]
                                    }} >Harga</Text>
                                    <Text style = {{
                                        fontSize: Dimensions.get('window').width * 0.04,
                                        color: "#000",
                                        fontFamily: fonts.primary[600]
                                    }} >Rp. {item.hargaKontrakan.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                                </View>
                            </View>
                        </Pressable>
                    )
                }}
            />
            )}
        </View>
    )
}


const SearchTopNavigator = () => {
    return (
        <Top.Navigator
            initialRouteName="Semua"
            screenOptions={{
                tabBarActiveTintColor: '#000',                
                tabBarIndicator: ({ color }) => <Animated.View style={{ backgroundColor: color }} />,
                tabBarStyle: { backgroundColor: '#fff',}

            }}
        >
            <Top.Screen
                name="Semua"
                component={All}
                options={{ tabBarLabel: 'Semua'}}
            />
            <Top.Screen
                name="Buka"
                component={Open}
                options={{ tabBarLabel: 'Terbaru' }}
            />
        </Top.Navigator>
    )
}

export default SearchTopNavigator