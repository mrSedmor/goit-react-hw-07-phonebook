import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import css from './filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  function handleChange({ currentTarget: { value } }) {
    dispatch(setFilter(value));
  }
  return (
    <label className={css.field}>
      <span className={css.label}>Find contacts by name</span>
      <input
        className={css.input}
        type="text"
        name="filter"
        onChange={handleChange}
        value={filter}
      />
    </label>
  );
}
