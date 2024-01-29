import { configureStore } from '@reduxjs/toolkit';
import stationsSlice from '@/store/reducers/stationsReducer';

export const store = configureStore({
  reducer: {
    stations: stationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
