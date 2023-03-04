import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFilteredContactsSize,
  selectContactsSize,
} from 'redux/selectors';
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

  const contactsSize = useSelector(selectContactsSize);
  const filteredContactsSize = useSelector(selectFilteredContactsSize);

  const message = useMemo(() => {
    if (contactsSize === 0) {
      return isLoading ? 'Fetching contacts...' : error || 'Phonebook is empty';
    }

    if (filteredContactsSize === 0) {
      return 'Nothing has been found';
    }

    return '';
  }, [contactsSize, filteredContactsSize, isLoading, error]);

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
