import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContactFrom, Filter, ContactList } from 'components';
import { fetchContacts } from 'redux/operations';
import { selectIsLoading, selectError } from 'redux/selectors';
import css from './app.module.css';

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactFrom className={css.contactForm} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter />
      {error && (
        <p>
          <strong>Error: </strong>
          {error}
        </p>
      )}
      {isLoading && <p>Request in progress...</p>}
      <ContactList />
    </div>
  );
}
