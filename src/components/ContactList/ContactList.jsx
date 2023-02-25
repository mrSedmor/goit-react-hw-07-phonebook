import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getFilteredContacts, getContacts } from 'redux/selectors';

import css from './contact-list.module.css';
import sharedCss from 'shared.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filteredContacts = useSelector(getFilteredContacts);

  if (contacts.length === 0) {
    return <p className={css.message}>Phonebook is empty</p>;
  }

  if (filteredContacts.length === 0) {
    return <p className={css.message}>Nothing has been found</p>;
  }

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id} className={css.item}>
          <span className={css.content}>
            {name}: {phone}
          </span>
          <button
            className={sharedCss.btn}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
