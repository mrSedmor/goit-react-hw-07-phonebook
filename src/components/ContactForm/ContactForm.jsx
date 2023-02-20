import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';
import css from './contact-form.module.css';
import sharedCss from 'shared.module.css';

const INITIAL_VALUES = {
  name: '',
  number: '',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Phone number is required'),
});

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
        initialValues={INITIAL_VALUES}
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
            <span className={css.label}>Number</span>
            <Field
              className={css.input}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              placeholder="459-12-56"
            />
            <ErrorMessage name="number" component="p" className={css.error} />
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
