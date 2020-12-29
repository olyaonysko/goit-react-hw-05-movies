import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = ({ currentTarget }) => {
    setQuery(currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast.info('👺 Enter the name of movie you want to search ');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <form className={s.Searchbar} onSubmit={handleSubmit}>
        <input
          className={s.SearchForm}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleChange}
        />
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
