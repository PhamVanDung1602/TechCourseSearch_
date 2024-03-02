import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: ''
  },
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
    }
  }
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;