import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order : orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;