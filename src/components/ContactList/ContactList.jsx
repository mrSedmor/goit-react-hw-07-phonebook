import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/operations';
import { selectFilteredContacts } from 'redux/selectors';
import { selectIsLoading } from 'redux/selectors';
import ContactItem from './ContactItem';

import css from './contact-list.module.css';

export default function ContactList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={isLoading ? `${css.list} ${css.disabled}` : css.list}>
      {filteredContacts.map(({ id, name, phone }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          phone={phone}
          onDelete={() => dispatch(deleteContact(id))}
        />
      ))}
    </ul>
  );
}
