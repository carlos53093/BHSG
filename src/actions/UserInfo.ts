import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ModeState {
    isAdmin: boolean;
}

const initialState: ModeState = {
  isAdmin: false,
};


export const mode = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin:(state, action) => {
        state.isAdmin = action.payload;
    },
  },
  
});

export const { setAdmin } = mode.actions;

export const IsAdmin = (state: RootState) => state.admin.isAdmin;

export default mode.reducer;
