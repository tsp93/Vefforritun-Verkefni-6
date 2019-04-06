import React from 'react';

import css from './Todos.css';
import TodoItem from '../todo-item/TodoItem';

/**
 * Listi af verkefnum á forsíðu
 */
export default function Todos(props) {
  const { todos } = props;

  return (
    <ul className={css.todos}>
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
}
