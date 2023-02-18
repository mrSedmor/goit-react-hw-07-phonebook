import collator from './collator';

const insertIntoSortedContacts = (contacts, newContact) => {
  const copyContacts = [...contacts];
  const index = copyContacts.findIndex(
    ({ name }) => collator(newContact.name, name) <= 0
  );
  const insertIndex = index >= 0 ? index : copyContacts.length;
  copyContacts.splice(insertIndex, 0, newContact);

  return copyContacts;
};

export default insertIntoSortedContacts;
