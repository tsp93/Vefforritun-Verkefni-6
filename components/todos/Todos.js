import React from 'react';

import css from './Todos.css';
import TodoItem from '../todo-item/TodoItem';

// Listi af verkefnum á forsíðu
export default function Todos(props) {
  const { todos, loading } = props;

  return (
    <React.Fragment>
      {loading && (
        (<p>Hleð gögnum...</p>)
      )}
      {!loading && (
        <React.Fragment>
          <ul className={css.todos}>
            {todos.map((item, i) => (
              <TodoItem
                key={i}
                item={item}
              />
            ))}
          </ul>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
