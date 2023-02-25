import defaultCollator from './collator';

const sortContacts = (contacts, collator = defaultCollator) => {
  contacts.sort(({ name: a }, { name: b }) => collator(a, b));
};

export default sortContacts;
