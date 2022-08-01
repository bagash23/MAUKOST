import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from '../reducers';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //blacklist : ['modalState'],
   //  whitelist: ['paket', 'childState', 'userReducer', 'showSecret'] 
}
const persistedReducer = persistReducer(persistConfig, reducers)
export let store = createStore(persistedReducer);
export let persistore = persistStore(store);