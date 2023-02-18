import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

import { getContacts } from 'redux/selectors';
import { CONTACTS_KEY, persistLocalStorage } from 'services/api';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

store.subscribe(
  persistLocalStorage({ key: CONTACTS_KEY, selector: getContacts, store })
);
