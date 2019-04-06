import React, { useState, useEffect } from 'react';
import Error from 'next/error';

import Layout from '../components/layout/Layout';
import TodoDetail from '../components/todo-detail/TodoDetail';

import { getTodo } from '../api';

/**
 * Verkefnissíða
 */
function Home(props) {
  const { todo } = props;
  
  return (
    <Layout title={`${todo.title}`}>
      <TodoDetail
        todo={todo}
      />
    </Layout>
  );
}

/**
 * Upphafsstilla gildi
 */
Home.getInitialProps = async ({ query }) => {
  const { id } = query;

  const todo = getTodo(id);

  return { id, todo };
}

export default Home
