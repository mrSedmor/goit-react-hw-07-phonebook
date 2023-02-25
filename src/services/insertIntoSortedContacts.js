import defaultCollator from './collator';

const insertIntoSortedContacts = (
  contacts,
  newContact,
  collator = defaultCollator
) => {
  const index = contacts.findIndex(
    ({ name }) => collator(newContact.name, name) <= 0
  );
  const insertIndex = index >= 0 ? index : contacts.length;
  contacts.splice(insertIndex, 0, newContact);
};

export default insertIntoSortedContacts;
