import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
import css from './contact-form.module.css';
import sharedCss from 'shared.module.css';
import schema from './validation-schema';
import initialValues from './initial-values';

export default function ContactForm({ className }) {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  function handleAddContact(contact, { resetForm }) {
    const normalizedName = contact.name.toLocaleLowerCase();

    if (
      contacts.find(({ name }) => name.toLocaleLowerCase() === normalizedName)
    ) {
      toast.error(`${contact.name} is already in contacts.`);
      return;
    }

    dispatch(addContact(contact));
    resetForm();
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleAddContact}
      >
        <Form className={className}>
          <label className={css.fieldWrapper}>
            <span className={css.label}>Name</span>
            <Field
              className={css.input}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              placeholder="Rosie Simpson"
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </label>

          <label className={css.fieldWrapper}>
            <span className={css.label}>Phone</span>
            <Field
              className={css.input}
              type="tel"
              name="phone"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              placeholder="459-12-56"
            />
            <ErrorMessage name="phone" component="p" className={css.error} />
          </label>
          <div className={css.controls}>
            <button className={sharedCss.btn} type="submit">
              Add contact
            </button>
            <button className={sharedCss.btn} type="reset">
              Reset form
            </button>
          </div>
        </Form>
      </Formik>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        className={css.toast}
      />
    </>
  );
}

ContactForm.propTypes = {
  className: PropTypes.string,
};
