import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Form.module.css';

const Form = ({ setSearchParams }) => {
  const [query, setQuery] = useState('');

  const handleSearchParams = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return alert('Input searchText!');
    }
    setSearchParams({ query });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies title"
        value={query}
        onChange={handleSearchParams}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  setSearchParams: PropTypes.func.isRequired,
};
