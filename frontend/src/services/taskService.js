const API_URL = 'http://localhost:4000/api/tasks';

const parseResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(errorData.message || 'No se pudo completar la operación');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const fetchTasks = (params) => {
  const query = new URLSearchParams(params);
  return fetch(`${API_URL}?${query.toString()}`).then(parseResponse);
};

export const createTask = (task) =>
  fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(parseResponse);

export const updateTask = (id, task) =>
  fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }).then(parseResponse);

export const deleteTask = (id) =>
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  }).then(parseResponse);

export const toggleTask = (id) =>
  fetch(`${API_URL}/${id}/toggle`, {
    method: 'PATCH'
  }).then(parseResponse);
