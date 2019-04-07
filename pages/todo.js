import React, { useState, useEffect } from 'react';
import Error from 'next/error';

import Layout from '../components/layout/Layout';
import TodoDetail from '../components/todo-detail/TodoDetail';

import { getTodo } from '../api';

/**
 * Verkefnissíða
 */
function Home(props) {
  const { initTodo } = props;

  if (initTodo.error != null) {
    return <Error statusCode={404} />;
  }

  const [todo, setTodo] = useState(initTodo);

  async function showUpdated() {
    const newTodo = await getTodo(todo.id);

    setTodo(newTodo);
  }
  
  return (
    <Layout title={`${todo.title}`}>
      <TodoDetail todo={todo} onUpdated={showUpdated}/>
    </Layout>
  );
}

/**
 * Upphafsstilla gildi
 */
Home.getInitialProps = async ({ query }) => {
  const { id } = query;

  const initTodo = await getTodo(id);

  return { initTodo };
}

export default Home
