import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredContacts, selectContacts } from 'redux/selectors';
import { selectIsLoading, selectError } from 'redux/selectors';
import { toast, ToastContainer } from 'react-toastify';

import css from './status-info.module.css';

export default function StatusInfo() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (!isLoading && error) {
      toast.error(error);
    }
  }, [isLoading, error]);

  const contacts = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);

  const message = useMemo(() => {
    if (contacts.length === 0) {
      return isLoading ? 'Fetching contacts...' : error || 'Phonebook is empty';
    }

    if (filteredContacts.length === 0) {
      return 'Nothing has been found';
    }

    return '';
  }, [contacts.length, filteredContacts.length, isLoading, error]);

  return (
    <>
      {message && <p className={css.message}>{message}</p>}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        className={css.toast}
      />
    </>
  );
}
