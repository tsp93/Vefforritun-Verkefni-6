import React, { useState } from 'react';

import { addTodo } from '../../api';

import Button from '../button/Button';
import Field from '../field/Field';
import Errors from '../errors/Errors';

import css from './Form.css';

/**
 * Form á forsíðu
 */
export default function Form(props) {
  const { onCreated } = props;

  const [data, setData] = useState({ title: '', date: undefined });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Form submission
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    let due = undefined;
    if (data.date != null) {
      try {
        due = new Date(data.date).toISOString();
      } catch (error) {
        due = data.date;
      }
    }
  
    const todo = await addTodo(data.title, due);

    if(todo.title == null) {
      setErrors(todo);
    } else {
      await onCreated();
    }

    setData({ title: '', date: undefined });
    setLoading(false);
  }

  // Handler fyrir breytingu í inputti
  function onChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <React.Fragment>
      <form className={css.form} onSubmit={onSubmit}>
      {loading && (
        (<p>Bý til todo...</p>)
      )}
      {!loading && (
        <React.Fragment>
          <h2 className={css.form__header}>Nýtt verkefni</h2>
          <Errors errors={errors} />
          <Field name={'title'} inputType={'text'} labelText={'Titill:'} onChange={onChange} />
          <Field name={'date'} inputType={'datetime-local'} labelText={'Klárast fyrir:'} onChange={onChange} />
          <Button children={'Búa til'} />
        </React.Fragment>
      )}
      </form>
    </React.Fragment>
  )
}
