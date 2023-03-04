import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsApi';
import { selectFilteredContacts } from 'redux/selectors';
import ContactItem from './ContactItem';
import { toast } from 'react-toastify';
import css from './contact-list.module.css';

export default function ContactList() {
  const { isFetching: isLoading, error } = useGetContactsQuery(undefined, {
    refetchOnReconnect: true,
  });

  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch contacts');
    }
  }, [error]);

  return (
    <>
      <ul className={isLoading ? `${css.list} ${css.disabled}` : css.list}>
        {filteredContacts.map(({ id, name, phone }) => (
          <ContactItem key={id} id={id} name={name} phone={phone} />
        ))}
      </ul>
    </>
  );
}
