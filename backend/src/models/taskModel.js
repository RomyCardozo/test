import { pool } from '../config/db.js';

export const getTasks = async ({ status, sortBy = 'due_date', order = 'asc' }) => {
  const values = [];
  const whereClauses = [];

  if (status === 'pending') {
    values.push(false);
    whereClauses.push(`completed = $${values.length}`);
  }

  if (status === 'completed') {
    values.push(true);
    whereClauses.push(`completed = $${values.length}`);
  }

  const allowedSort = {
    due_date: 'due_date',
    priority: 'priority',
    created_at: 'created_at'
  };

  const safeSort = allowedSort[sortBy] || 'due_date';
  const safeOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const query = `
    SELECT id, title, description, due_date AS "dueDate", priority, completed, created_at AS "createdAt", updated_at AS "updatedAt"
    FROM tasks
    ${whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : ''}
    ORDER BY ${safeSort} ${safeOrder}, id ASC
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

export const getTaskById = async (id) => {
  const { rows } = await pool.query(
    `SELECT id, title, description, due_date AS "dueDate", priority, completed, created_at AS "createdAt", updated_at AS "updatedAt"
     FROM tasks WHERE id = $1`,
    [id]
  );

  return rows[0] || null;
};

export const createTask = async ({ title, description, dueDate, priority }) => {
  const { rows } = await pool.query(
    `INSERT INTO tasks (title, description, due_date, priority)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, description, due_date AS "dueDate", priority, completed, created_at AS "createdAt", updated_at AS "updatedAt"`,
    [title.trim(), description?.trim() || '', dueDate || null, priority]
  );

  return rows[0];
};

export const updateTask = async (id, updates) => {
  const keys = [];
  const values = [];

  if (updates.title !== undefined) {
    values.push(updates.title.trim());
    keys.push(`title = $${values.length}`);
  }

  if (updates.description !== undefined) {
    values.push(updates.description?.trim() || '');
    keys.push(`description = $${values.length}`);
  }

  if (updates.dueDate !== undefined) {
    values.push(updates.dueDate || null);
    keys.push(`due_date = $${values.length}`);
  }

  if (updates.priority !== undefined) {
    values.push(updates.priority);
    keys.push(`priority = $${values.length}`);
  }

  if (updates.completed !== undefined) {
    values.push(updates.completed);
    keys.push(`completed = $${values.length}`);
  }

  values.push(id);

  const { rows } = await pool.query(
    `UPDATE tasks
     SET ${keys.join(', ')}, updated_at = NOW()
     WHERE id = $${values.length}
     RETURNING id, title, description, due_date AS "dueDate", priority, completed, created_at AS "createdAt", updated_at AS "updatedAt"`,
    values
  );

  return rows[0] || null;
};

export const deleteTask = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return rowCount > 0;
};
