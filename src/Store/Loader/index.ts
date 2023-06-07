import {createSlice} from '@reduxjs/toolkit';

export type LoadingState = {
  isLoading: boolean;
};

const initialState: LoadingState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: 'loaderSlice',
  initialState,
  reducers: {
    showLoader: state => {
      state.isLoading = true;
    },
    hideLoader: state => {
      state.isLoading = false;
    },
  },
});

export const {hideLoader, showLoader} = loaderSlice.actions;

export const selectLoading = (state: {appLoader: LoadingState}) =>
  state.appLoader.isLoading;

export default loaderSlice.reducer;
