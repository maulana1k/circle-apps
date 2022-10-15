import { UserWithToken } from '@circle-app/api-interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';

const initialState: UserWithToken = {
  ...JSON.parse(localStorage.getItem('user') || '{}'),
  token: localStorage.getItem('token') || '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state: any, action: PayloadAction<UserWithToken>) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.counter.value;
export default userSlice.reducer;
