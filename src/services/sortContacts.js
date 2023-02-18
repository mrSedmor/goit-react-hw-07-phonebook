import collator from './collator';

const sortContacts = contacts => {
  const copyContacts = [...contacts];
  copyContacts.sort(({ name: a }, { name: b }) => collator(a, b));
  return copyContacts;
};

export default sortContacts;
