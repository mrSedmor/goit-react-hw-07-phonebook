import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBackspace } from 'react-icons/fa';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import css from './filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = useCallback(
    ({ currentTarget: { value } }) => {
      dispatch(setFilter(value));
    },
    [dispatch]
  );

  const handleClear = useCallback(() => {
    dispatch(setFilter(''));
  }, [dispatch]);
  return (
    <label className={css.field}>
      <span className={css.label}>Find contacts by name</span>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="text"
          name="filter"
          onChange={handleChange}
          value={filter}
          placeholder="&nbsp;"
        />
        <button type="button" className={css.iconButton} onClick={handleClear}>
          <FaBackspace />
        </button>
      </div>
    </label>
  );
}
