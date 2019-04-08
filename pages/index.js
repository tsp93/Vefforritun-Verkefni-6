import React, { useState } from 'react';

import Layout from '../components/layout/Layout';
import Button from '../components/button/Button';
import Todos from '../components/todos/Todos';
import Form from '../components/form/Form';

import { getTodos } from '../api';

/**
 * Forsíða
 */
function Home(props) {
  const { initTodos } = props;

  const [todos, setTodos] = useState(initTodos);
  const [loading, setLoading] = useState(false);
  const [hideCompleted, setHideCompleted] = useState(false);

  // Meðhöndlar fela búið/sýna allt takka
  async function toggleHideCompleted() {
    updateList();
    setHideCompleted(!hideCompleted);
  }

  // Uppfærir verkefnalista
  async function updateList() {
    setLoading(true);

    let completed = undefined;
    if (hideCompleted === false) {
      completed = false;
    }
    const newTodos = await getTodos(completed);

    setTodos(newTodos);
    setLoading(false);
  }

  return (
    <Layout title={'Verkefni'}>
      <Button
        children={hideCompleted ? 'Sýna allt' : 'Fela búið'}
        onClick={toggleHideCompleted}
      />
      {loading && (
        (<p>Sækir verkefni...</p>)
      )}
      {!loading && (
      <Todos todos={todos} />
      )}
      <Form onCreated={updateList} />
    </Layout>
  );
}

/**
 * Upphafsstilla gildi
 */
Home.getInitialProps = async ({ query }) => {
  const { hideCompleted } = query;

  const todos = await getTodos(hideCompleted);

  return { initTodos: todos };
}

export default Home
