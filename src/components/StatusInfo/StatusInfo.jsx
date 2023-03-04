import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFilteredContactsSize,
  selectContactsSize,
} from 'redux/selectors';

import css from './status-info.module.css';
import { useGetContactsQuery } from 'redux/contactsApi';

export default function StatusInfo() {
  const { isFetching: isLoading, error } = useGetContactsQuery();

  const contactsSize = useSelector(selectContactsSize);
  const filteredContactsSize = useSelector(selectFilteredContactsSize);

  const message = useMemo(() => {
    if (contactsSize === 0) {
      if (isLoading) {
        return 'Fetching contacts...';
      }
      return error ? 'Failed to fetch contacts' : 'Phonebook is empty';
    }
    if (filteredContactsSize === 0) {
      return 'Nothing has been found';
    }

    return '';
  }, [contactsSize, filteredContactsSize, isLoading, error]);

  return message ? <p className={css.message}>{message}</p> : null;
}
