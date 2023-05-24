import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (gDM) => gDM(),
  devTools: true,
});

export default store;
