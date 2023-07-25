import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../store';

import {TSpeechTimeLog} from 'Types';

export type TInitialState = {
  logs: TSpeechTimeLog[];
};

const initialState: TInitialState = {
  logs: [],
};

export const speechTimeLogsSlice = createSlice({
  name: 'speechTimeLogsSlice',
  initialState,
  reducers: {
    addSpeechTimeLog: (state, action: PayloadAction<TSpeechTimeLog>) => {
      state.logs = [...state.logs, action.payload];
    },
    lockSpeechTime: (
      state,
      action: PayloadAction<{id: number; endTime: number}>,
    ) => {
      const {endTime, id} = action.payload;
      const slotIndex = state.logs.findIndex(log => log.id === id);
      state.logs[slotIndex].endTime = endTime;
    },
    updateLogs: (state, action: PayloadAction<TInitialState>) => {
      state.logs = action.payload.logs;
    },
  },
});

export const {addSpeechTimeLog, lockSpeechTime, updateLogs} =
  speechTimeLogsSlice.actions;

export const selectSpeechTimeLogs = (state: RootState) =>
  state.speechTimeLogs.logs;

export default speechTimeLogsSlice.reducer;
