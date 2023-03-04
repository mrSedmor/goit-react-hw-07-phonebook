import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDeleteContactMutation } from 'redux/contactsApi';
import { toast } from 'react-toastify';
import sharedCss from 'shared.module.css';
import css from './contact-item.module.css';

export default function ContactItem({ id, name, phone }) {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const handleDelete = useCallback(() => {
    deleteContact(id)
      .unwrap()
      .catch(() => {
        toast.error(`Failed to delete contact: ${name}`);
      });
  }, [deleteContact, id, name]);

  return (
    <li className={css.item}>
      <span className={css.content}>
        {name}: {phone}
      </span>
      <button
        className={sharedCss.btn}
        type="button"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
