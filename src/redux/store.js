// store.js
import { configureStore } from '@reduxjs/toolkit';
import contentSlice from './features/content/contentSlice';
import signinSlice from './features/userAuth/signinSlice';
import signUpSlice from './features/userAuth/signUpSlice';

const store = configureStore({
  reducer: {
    content: contentSlice,
    signInData : signinSlice,
    signUpData : signUpSlice
  },
});

export default store;
