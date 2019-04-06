import React, { useState } from 'react';
import Link from 'next/link';

import { updateTodo } from '../../api';
import css from './TodoItem.css';

/**
 * Verkefni í lista á forsíðu
 */
export default function todoItem(props) {
  const { item } = props;

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(item.completed);

  // Meðhöndlar hak í checkbox
  async function handleCheck() {
    setLoading(true);

    await updateTodo(item.id, { completed: !checked });

    setChecked(!checked);
    setLoading(false);
  }

  return (
    <React.Fragment>
      <li className={css.item}>
        {loading && (
          (<p>Uppfærir...</p>)
        )}
        {!loading && (
          <React.Fragment>
            <input type="checkbox" className={css.item__input} onChange={handleCheck} checked={checked}></input>
            <Link as={`/${item.id}`} href={`/${item.id}?id=${item.id}`}><a className={css.item__link}>{item.title}</a></Link>
            <p className={css.item__due}>{item.due ? "Klárist fyrir " + item.due : null}</p>
          </React.Fragment>
        )}
      </li>
    </React.Fragment>
  );
}
