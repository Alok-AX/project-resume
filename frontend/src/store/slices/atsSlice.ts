import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  score: 0,
};

const atsSlice = createSlice({
  name: 'ats',
  initialState,
  reducers: {
    setScore(state, action) {
      state.score = action.payload;
    },
  },
});

export const { setScore } = atsSlice.actions;
export default atsSlice.reducer;