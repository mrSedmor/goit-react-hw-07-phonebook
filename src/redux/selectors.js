import { createSelector } from '@reduxjs/toolkit';

export const getContacts = state => state.contacts.items;

export const getContactsSize = createSelector(
  [getContacts],
  contacts => contacts.length
);

export const getIsLoading = state => state.contacts.isLoading;

export const getError = state => state.contacts.error;

export const getFilter = state => state.filter;

export const getFilteredContacts = createSelector(
  [getContacts, getFilter],
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

export const getFilteredContactsSize = createSelector(
  [getFilteredContacts],
  filteredContacts => filteredContacts.length
);
