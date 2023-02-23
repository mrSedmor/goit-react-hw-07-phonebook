export const getContacts = ({ contacts }) => contacts;

export const getFilter = ({ filter }) => filter;

export const getFilteredContacts = ({ contacts, filter }) => {
  if (filter === '') {
    return contacts;
  }

  const normalizedFilter = filter.toLocaleLowerCase();
  return contacts.filter(({ name }) =>
    name.toLocaleLowerCase().includes(normalizedFilter)
  );
};
