import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact } from './actions';

export const initialState = [];

export const contactsReducer = createReducer(initialState, {
  [addContact]: (state, action) => {
    //костилі

    state = Object.values(state);
    return [action.payload, ...state];
  },
  [deleteContact]: (state, action) => {
    //костилі

    state = Object.values(state);

    return state.filter(({ id }) => {
      return id !== action.payload.id;
    });
  },
});
