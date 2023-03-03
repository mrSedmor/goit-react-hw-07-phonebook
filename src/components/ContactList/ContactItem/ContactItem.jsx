import PropTypes from 'prop-types';
import sharedCss from 'shared.module.css';
import css from './contact-item.module.css';

export default function ContactItem({ name, phone, onDelete }) {
  return (
    <li className={css.item}>
      <span className={css.content}>
        {name}: {phone}
      </span>
      <button className={sharedCss.btn} type="button" onClick={onDelete}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
