import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

import insertIntoSortedContacts from 'services/insertIntoSortedContacts';

const contactsInitialState = [];

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        return insertIntoSortedContacts(state, payload);
      },
      prepare(contact) {
        return { payload: { id: nanoid(8), ...contact } };
      },
    },
    deleteContact(state, { payload }) {
      return state.filter(({ id }) => id !== payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
