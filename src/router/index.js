import React, { useEffect, useState } from 'react'
import { 
    Beranda,
    GetStarted, 
    Post, 
    Profile, 
    Search, 
    SignUp, 
    TempatDetail,    
    Login,
    DaftarBook,
    HomePageKontrakan,
    HistoryPenewaan,
    HistoryKontrakan,
    SearchBeranda,
    ListKontrakan,
    EditAkun,
    Awal,
    EditKontrakan,
    Tentang,
    Syarat,
    EmailVerifikasi,
    RoomChat,
    Coba,
    PromoScreen,
    DetilPromo,    
} from '../screen'
import { LogBox, ActivityIndicator, Modal, View, StyleSheet, Dimensions, Image, Text, StatusBar } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, DefaultTheme, NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { version } from '../../package.json'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

LogBox.ignoreAllLogs([
    'Setting a timer',
    'Animated: `useNativeDriver`',
    "AsyncStorage has been extracted from react-native core",  
    "EventEmitter.removeListener",
])

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator()

const MyApp = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#d32521"
            barStyle={{ backgroundColor: '#fff',}}
        >
            <Tab.Screen
                name="Home"
                component={Beranda}
                options={{                        
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                    headerShown: false,
                    tabBarLabel: 'Beranda',
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{                
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="search1" color={color} size={26} />
                    ),
                    headerShown: false,
                    tabBarLabel: 'Cari Kategori'
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    ),
                    headerShown: false,
                    tabBarLabel: 'Akun'

                }}
            />
        </Tab.Navigator>
    )
}



const Router = () => {

    const Splash = () => {
        const navigation = useNavigation();
        useEffect(() => {
            const Temp = auth.onAuthStateChanged((user) => {
                setTimeout(() => {
                    if (user) {
                        navigation.replace("myApp")
                    } else {
                        navigation.replace("AWAL")
                    }
                }, 3000);
            })

            return () => Temp();
    
        },[navigation]);
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <Image source={require('../assets/logo_app.png')} style = {{
                    width: Dimensions.get('window').width * 0.2,
                    height: Dimensions.get('window').width * 0.2,
                }} />
                <Text style = {{
                    position: 'absolute',
                    bottom: 10,
                    color: "#000"
                }} >Version - {version}</Text>
            </View>
        )
    }
    return (           
        <Stack.Navigator >
            <Stack.Screen name = "SPLASH" component={Splash} options={{headerShown: false}} />            
            <Stack.Screen name = "SIGNUP" component={SignUp} options={{headerShown: false}} />
            <Stack.Screen name = "LOGIN" component={Login} options={{headerShown: false}} />
            <Stack.Screen name = "GETSTARTED" component={GetStarted} options={{headerShown: false}} />
            <Stack.Screen name = "myApp" component={MyApp} options={{headerShown: false}} />
            <Stack.Screen name = "TempatDetail" component={TempatDetail} options={{headerShown: false}} />            
            <Stack.Screen name = "POST" component={Post} options={{headerShown: false}} />            
            <Stack.Screen name = "DAFTARBOOK" component={DaftarBook} options={{headerShown: false}} />
            <Stack.Screen name = "HOMEKONTRAKAN" component={HomePageKontrakan} options={{headerShown: false}} />
            <Stack.Screen name = "HISTORYPENYEWAAN" component={HistoryPenewaan} options={{headerShown: false}} />
            <Stack.Screen name = "HISTORYKONTRAKAN" component={HistoryKontrakan} options={{headerShown: false}} />
            <Stack.Screen name = "SEARCHBERANDA" component={SearchBeranda} options={{headerShown: false}} />
            <Stack.Screen name = "LISTKONTRAKAN" component={ListKontrakan} options={{headerShown: false}} />
            <Stack.Screen name = "EDITAKUN" component={EditAkun} options={{headerShown: false}} />
            <Stack.Screen name = "AWAL" component={Awal} options={{headerShown: false}} />
            <Stack.Screen name = "EDITKONTRAKAN" component={EditKontrakan} options={{headerShown: false}} />
            <Stack.Screen name = "TENTANGKAMI" component={Tentang} options={{headerShown: false}} />
            <Stack.Screen name = "SYARATKETENTUAN" component={Syarat} options={{headerShown: false}} />
            <Stack.Screen name = "VERIFIKASI" component={EmailVerifikasi} options={{headerShown: false}} />            
            <Stack.Screen name = "PROMO" component={PromoScreen} options={{headerShown: false}} />            
            <Stack.Screen name = "DETILPROMO" component={DetilPromo} options={{headerShown: false}} />                        
        </Stack.Navigator>        
    )

}

export default Router