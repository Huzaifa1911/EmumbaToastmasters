import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {RootState} from '../store';

import {TSpeechTimeSlot} from 'Types';

export type TInitialState = {
  slots: TSpeechTimeSlot[];
};

const initialState: TInitialState = {
  slots: [],
};

export const speechTimeSlotSlice = createSlice({
  name: 'speechTimeSlotSlice',
  initialState,
  reducers: {
    addSpeechTimeSlot: (state, action: PayloadAction<TSpeechTimeSlot>) => {
      state.slots = [...state.slots, action.payload];
    },
    lockSpeechTime: (
      state,
      action: PayloadAction<{id: number; endTime: number}>,
    ) => {
      const {endTime, id} = action.payload;
      const slotIndex = state.slots.findIndex(slot => slot.id === id);
      state.slots[slotIndex].endTime = endTime;
    },
    updateSlots: (state, action: PayloadAction<TInitialState>) => {
      state.slots = action.payload.slots;
    },
  },
});

export const {addSpeechTimeSlot, lockSpeechTime, updateSlots} =
  speechTimeSlotSlice.actions;

export const selectSpeechTimeSlots = (state: RootState) =>
  state.speechTimeSlots.slots;

export default speechTimeSlotSlice.reducer;
