import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: [],
  },
  reducers: {
    addContent: (state, action) => {
      state.content.push(action.payload);
    },
    editContent: (state, action) => {
      const { index, content } = action.payload
      state.content[index] = content;
    },
   deleteBlog : (state,action)=>{
    state.content.splice(action.payload , 1);
   },
   readBlog: (state, action) => {
    
    if (state.content[action.payload]) {
      state.content[action.payload].read += 1;
    }
  },
  getDatafromLocalStorage:(state, action)=>{
    state.content = action.payload
  }
  
  },
});


export const { addContent, editContent,deleteBlog , readBlog ,getDatafromLocalStorage} = contentSlice.actions;

export default contentSlice.reducer;
