import React, { useState } from 'react';
import Link from 'next/link';

import Button from '../button/Button';
import Field from '../field/Field';

import { updateTodo, deleteTodo } from '../../api';
import css from './TodoDetail.css'

/**
 * Stakt verkefni á /:id
 */
export default function todoDetail(props) {
  const { todo, onUpdated } = props;

  const [data, setData] = useState({ title: todo.title, completed: todo.completed, due: getDue(todo) });
  const [loading, setLoading] = useState(false);
  
  // Fall til að breyta ISO dagsetningu *****Z í *****
  function getDue(todoTing) {
    let dueTing = null;
    if (todoTing.due != null) {
      dueTing = todoTing.due.slice(0, -1);
    }
    return dueTing;
  }

  // Meðhöndlar uppfærslu
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    let { due } = data;
    if (due != null) {
      try {
        due = new Date(due).toISOString();
      } catch (error) {
        console.error(error);
      }
    }

    await updateTodo(todo.id, { title: data.title, completed: data.completed, due });
    await onUpdated();

    setLoading(false);
  }

  // Meðhöndlar eyðslu
  async function onDelete() {
    await deleteTodo(todo.id);
  }

  // Handler fyrir breytingu í inputti
  function onChange(e) {
    if (e.target.name === 'completed') {
      setData({
        ...data,
        [e.target.name]: e.target.checked,
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <React.Fragment>
      {loading && (
        <p>Hleður verkefni...</p>
      )}
      {!loading && (
        <React.Fragment>
          <div className={css.todoDetail__list}>
            <form className={css.todoDetail__form} onSubmit={onSubmit}>
            <Field name={'title'} inputType={'text'} labelText={'Titill:'} onChange={onChange} defValue={todo.title} />
              <Field name={'completed'} inputType={'checkbox'} labelText={'Lokið:'} onChange={onChange} checked={data.completed} />
              <Field name={'due'} inputType={'datetime-local'} labelText={'Klárast fyrir:'} onChange={onChange} defValue={getDue(todo)} />
            </form>
            <p className={css.todoDetail__term}>Uppfært:</p>
            <p className={css.todoDetail__definition}>{todo.updated}</p>
            <p className={css.todoDetail__term}>Búið til:</p>
            <p className={css.todoDetail__definition}>{todo.created}</p>
          </div>
          <div className={css.todoDetail__buttons}>
            <Button children={'Uppfæra'} onClick={onSubmit}/>
            <Link as={'/'} href={'/'}><a>
              <Button children={'Eyða'} onClick={onDelete}/>
            </a></Link>
          </div>
        </React.Fragment>
        )}
      <Link as={'/'} href={'/'}><a className={css.todoDetail__back}>Til baka</a></Link>
    </React.Fragment>
  );
}
