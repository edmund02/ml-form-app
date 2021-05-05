import { createStore, combineReducers } from 'redux';
import reducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage'
// import autoMergeLevel2 from 'redux persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
}

const rootReducer = combineReducers(
   { app: reducer }
);

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor }
