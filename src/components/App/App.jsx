import { ContactFrom, Filter, ContactList, StatusInfo } from 'components';

import css from './app.module.css';

export default function App() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactFrom className={css.contactForm} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter />
      <StatusInfo />
      <ContactList />
    </div>
  );
}
