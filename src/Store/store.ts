import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {PersistConfig, persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import themeReducer from './Theme';
import loaderReducer from './Loader';
import userReducer from './User';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  // put reducer name that you dont want to persist
  blacklist: ['appLoader', 'appUser'],
};

const reducer = combineReducers({
  appTheme: themeReducer,
  appLoader: loaderReducer,
  appUser: userReducer,
});

const persistedReducer = persistReducer<ReturnType<typeof reducer>>(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistedStore = persistStore(store);

export default store;
