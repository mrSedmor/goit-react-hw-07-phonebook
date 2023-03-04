import { Filter, ContactList, StatusInfo } from 'components';
import { ContactForm } from 'components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sharedCss from 'shared.module.css';
import css from './app.module.css';

export default function App() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm className={css.contactForm} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter />
      <StatusInfo />
      <ContactList />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        className={sharedCss.toast}
      />
    </div>
  );
}
