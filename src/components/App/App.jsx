import { ContactFrom, Filter, ContactList } from 'components';
import css from './app.module.css';

export default function App() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactFrom />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter />

      <ContactList />
    </div>
  );
}
