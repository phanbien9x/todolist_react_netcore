import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FiltersSlice from './../features/Filters/slice.js';
import TodoListSlice from './../features/TodoList/slice.js';
import AuthSlice from './../features/Auth/slice.js';
import LoaderSlice from './LoaderSlice.js';
import UserInfoSlice from './../features/UserInfo/slice.js';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga.js';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      version: 1,
      storage,
      whitelist: ['access_token'],
      blacklist: ['_persist'],
    },
    combineReducers({
      filters: FiltersSlice,
      todoList: TodoListSlice,
      loader: LoaderSlice,
      access_token: AuthSlice,
      userinfo: UserInfoSlice,
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
