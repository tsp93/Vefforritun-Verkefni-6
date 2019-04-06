import 'isomorphic-fetch';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
const { apiUrl } = publicRuntimeConfig;

/**
 * Eyðir verkefni.
 *
 * @param {number} id Id á verkefni
 * @returns {object} Hlutur með svari, tómur ef verkefni hefur verið eytt
 */
export async function deleteTodo(id) {
  const url = new URL(`/${id}`, apiUrl);
  const response = await fetch(url.href, {
    method: 'DELETE'
  });

  return response.json();
}

/**
 * Bætir við verkefni.
 *
 * @param {string} title Heiti á verkefni
 * @param {string} due Dagsetning sem fylgir ISO8601 staðli
 * @returns {object} Hlutur með verkefninu sem var bætt við, annars villu/r
 */
export async function addTodo(title, due) {
  const updatedInfo = {
    title,
    due,
  };
  const url = new URL(`/`, apiUrl);
  const response = await fetch(url.href, {
    method: 'POST',
    body: JSON.stringify(updatedInfo),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.json();
}

/**
 * Uppfærir verkefni.
 *
 * @param {number} id Heiti á verkefni
 * @param {Todo} todo Uppfærð gildi fyrir verkefni
 * @returns {object} Hlutur með verkefninu sem var uppfært, annars villu/r
 */
export async function updateTodo(id, { title, completed, due } = {}) {
  const updatedInfo = {
    title,
    completed,
    due,
  };
  const url = new URL(`/${id}`, apiUrl);
  const response = await fetch(url.href, {
    method: 'PATCH',
    body: JSON.stringify(updatedInfo),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.json();
}

/**
 * Nær í verkefni.
 *
 * @param {boolean} hideCompleted Gildi sem segir hvort skyldi fela kláruð verkefni
 * @returns {array} Fylki af verkefnum
 */
export async function getTodos(hideCompleted = undefined) {
  const url = hideCompleted != undefined ? new URL(`/?completed=false`, apiUrl) : new URL(`/`, apiUrl);
  const response = await fetch(url.href);

  return response.json();
}

/**
 * Nær í stakt verkefni.
 *
 * @param {number} id Id á verkefni
 * @returns {object} Hlutur með verkefni ef til, annars villu
 */
export async function getTodo(id) {
  const url = new URL(`/${id}`, apiUrl);
  const response = await fetch(url.href);

  return response.json();
}
