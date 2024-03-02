import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import UserReducer from "./UserReducer";
import { configureStore } from "@reduxjs/toolkit";

//config redux persist for userReducer
const userPersistConfig = {
    key: 'user',
    storage
};

//create configured reducer for redux persist
const persistedUserReducer = persistReducer(userPersistConfig,UserReducer);

//create store
export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store);



