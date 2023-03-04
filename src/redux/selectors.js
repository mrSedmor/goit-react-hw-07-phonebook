import { createSelector } from '@reduxjs/toolkit';
import { contactsApi } from './contactsApi';

const emptyArray = [];

// NB! Якщо не буде підписників (useGetContactsQuery),
// то запит контаків зроблено не буде
export const selectContactsFromEndpoint =
  contactsApi.endpoints.getContacts.select();

export const selectContacts = createSelector(
  [selectContactsFromEndpoint],
  contacts => contacts.data ?? emptyArray
);

export const selectContactsSize = createSelector(
  [selectContacts],
  contacts => contacts.length
);

export const selectIsLoading = createSelector(
  [selectContactsFromEndpoint],
  contacts => {
    console.log(contacts);
    return contacts.isLoading;
  }
);

export const selectError = createSelector(
  [selectContactsFromEndpoint],
  contacts => contacts.error
);

export const selectFilter = state => state.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (filter === '') {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(({ name }) =>
      name.toLocaleLowerCase().includes(normalizedFilter)
    );
  }
);

export const selectFilteredContactsSize = createSelector(
  [selectFilteredContacts],
  filteredContacts => filteredContacts.length
);
