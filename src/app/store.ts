import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import adminMode from '../actions/UserInfo';

export const store = configureStore({
  reducer: {
    admin: adminMode
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
