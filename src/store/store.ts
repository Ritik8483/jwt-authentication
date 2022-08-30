import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from '../service/AuthApi';
// import {authApiReducer} from '../service/AuthApi';
import authReducer from '../feature/authSlice';

 const store=configureStore({
    reducer: {
        auth:authReducer,
        [authApi.reducerPath]: authApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export type AppDispatch=typeof store.dispatch;
export type RootState=ReturnType<typeof store.getState>; 
setupListeners(store.dispatch);
export default store;