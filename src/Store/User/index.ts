import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../store';
import {TUser} from 'Types';

type TInitialState = {
  user: TUser | null;
};
const initialState: TInitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<TInitialState>) => {
      state.user = action.payload.user;
    },
  },
});

export const {updateUser} = userSlice.actions;
export const selectUser = (state: RootState): TUser | null =>
  state.appUser.user;
export default userSlice.reducer;
