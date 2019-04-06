import React, { useState, useEffect } from 'react';
import Error from 'next/error';

import Layout from '../components/layout/Layout';
import TodoDetail from '../components/todo-detail/TodoDetail';

import { getTodo } from '../api';

function Home(props) {
  const { id, todo } = props;
  
  return (
    <Layout title={`Verkefni ${id}`}>
      <TodoDetail todo={todo} />
    </Layout>
  );
}

Home.getInitialProps = async ({ query }) => {
  const { id } = query;

  const todo = getTodo(id);

  return { id, todo };
}

export default Home
