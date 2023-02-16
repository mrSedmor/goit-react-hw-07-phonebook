import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import * as api from 'services/api';

import sampleContacts from 'data/contacts.json';

const collator = new Intl.Collator('en', { sensitivity: 'base' }).compare;

const restoredContacts = api.restore();

const contactsInitialState =
  restoredContacts.length > 0 ? restoredContacts : sampleContacts;

sortContacts(contactsInitialState);

function sortContacts(contacts) {
  contacts.sort(({ name: a }, { name: b }) => collator(a, b));
  return contacts;
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: {
      reducer(state, { payload }) {
        const index = state.findIndex(
          ({ name }) => collator(payload.name, name) <= 0
        );
        const insertIndex = index >= 0 ? index : state.length;
        state.splice(insertIndex, 0, payload);
        api.store(state);
      },
      prepare(contact) {
        return { payload: { id: nanoid(8), ...contact } };
      },
    },
    deleteContact(state, { payload }) {
      const index = state.findIndex(({ id }) => id === payload);
      if (index < 0) {
        return;
      }

      state.splice(index, 1);
      api.store(state);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
