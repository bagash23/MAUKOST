import React, {useState, useEffect} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Router from './router';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import {EventRegister} from 'react-native-event-listeners';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import {NativeBaseProvider} from 'native-base';
import ContextWrapper from './Context/ContextWrapper';
import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <InternetConnectionAlert
            onChange={connectionState => {
              console.log('Connection State: ', connectionState);
            }}
            title="Periksa Koneksi Internet Anda"
            message="Koneksi Internet Anda tidak stabil, mohon cek kembali">
            <ContextWrapper>
              <Router />
            </ContextWrapper>
          </InternetConnectionAlert>
          <Toast position="top" />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
