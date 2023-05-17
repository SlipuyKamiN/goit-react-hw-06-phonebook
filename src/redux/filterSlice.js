import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter: {
      reducer(state, action) {
        state = action.payload.value;
        return state;
      },
      prepare(value) {
        return {
          payload: { value },
        };
      },
    },
  },
});

export const { filter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
