import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../store';
import {TColorScheme} from 'Types';

type TInitialState = {
  theme: TColorScheme;
};
const initialState: TInitialState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<TInitialState>) => {
      state.theme = action.payload.theme;
    },
  },
});

export const {updateTheme} = themeSlice.actions;
export const selectTheme = (state: RootState): TColorScheme => state.appTheme.theme;
export default themeSlice.reducer;
