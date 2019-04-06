import React, { useState, useEffect } from 'react';

import Layout from '../components/layout/Layout';
import Todos from '../components/todos/Todos';
import Form from '../components/form/Form';

import { getTodos, updateTodo } from '../api';

function Home(props) {
  const { initTodos } = props;

  const [todos, setTodos] = useState(initTodos);
  const [loading, setLoading] = useState(false);

  async function onFetchNewTodos() {
    setLoading(true);
    const newTodos = await getTodos(hideCompleted);
    setTodos(newTodos);
    setLoading(false);
  }

  return (
    <Layout title={'Verkefni'}>
      <Todos
        loading={loading}
        todos={todos}
        onFetchNewData={onFetchNewTodos}
      />
    </Layout>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { hideCompleted } = query;

  const todos = await getTodos(hideCompleted);

  return { initTodos: todos };
}

export default Home
