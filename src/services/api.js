import sortContacts from 'services/sortContacts';
import sampleContacts from 'data/contacts.json';

export { default as persistLocalStorage } from './persistLocalStorage';

export const CONTACTS_KEY = 'contacts';

export function store(contacts) {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
}

export function restore() {
  try {
    const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    if (contacts instanceof Array) {
      return contacts;
    }
  } catch {}

  return [];
}

export function getInitialSortedData() {
  const restoredContacts = restore();

  const initialContacts =
    restoredContacts.length > 0 ? restoredContacts : sampleContacts;

  return sortContacts(initialContacts);
}
