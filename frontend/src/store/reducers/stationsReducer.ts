import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const stationsSlice = createSlice({
  name: 'stations',
  initialState: {
    page: 1,
  },
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = stationsSlice.actions;

export default stationsSlice.reducer;
