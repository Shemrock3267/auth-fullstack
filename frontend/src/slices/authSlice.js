import { createSlice } from '@reduxjs/toolkit';

const localUserInfo = localStorage.getItem('userInfo');

const initialState = {
  userInfo: localStorage.getItem(localUserInfo)
    ? JSON.parse(localUserInfo)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
