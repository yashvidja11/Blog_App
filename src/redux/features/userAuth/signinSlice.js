import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'userLogin';

const signinSlice = createSlice({
  name: 'login',
  initialState: {
    login: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || '', 
  },
  reducers: {
    loginInfo: (state, action) => {
      state.login = action.payload;

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.login = '';

      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
  },
});

export const { loginInfo, logout } = signinSlice.actions;

export default signinSlice.reducer;
