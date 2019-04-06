import React from 'react';
import PropTypes from 'prop-types';

import css from './Errors.css'

/**
 * Birtir villur fyrir form
 */
export default function Errors(props) {
  const { errors } = props;

  return (
    <ul className={css.errors}>
      {errors.map((error, i) => (
        <li key={i} className={css.errors__item}>{error.message}</li>
      ))}
    </ul>
  );
}

Errors.propTypes = {
  errors: PropTypes.array,
};
