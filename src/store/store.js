import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    auth: authReducer,
  },
});

export default store;