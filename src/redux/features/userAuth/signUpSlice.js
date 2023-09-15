import { createSlice } from "@reduxjs/toolkit";

const signUpSLice = createSlice({
  name: "login",
  initialState: {
    signUp: [],
  },
  reducers: {
    signUpInfo: (state, action) => {
      state.signUp.push(action.payload);
    },
    getDataFromLocalStorage: (state, action) => {
      state.signUp = action.payload;
    },
  },
});

export const { signUpInfo,getDataFromLocalStorage } = signUpSLice.actions;

export default signUpSLice.reducer;
