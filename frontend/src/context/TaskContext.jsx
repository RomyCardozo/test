import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createTask,
  deleteTask,
  fetchTasks,
  toggleTask,
  updateTask
} from '../services/taskService';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: 'all', sortBy: 'due_date', order: 'asc' });

  const loadTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const query = {
        sortBy: filters.sortBy,
        order: filters.order
      };

      if (filters.status !== 'all') {
        query.status = filters.status;
      }

      const data = await fetchTasks(query);
      setTasks(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [filters.status, filters.sortBy, filters.order]);

  const handleCreateTask = async (payload) => {
    await createTask(payload);
    await loadTasks();
  };

  const handleUpdateTask = async (id, payload) => {
    await updateTask(id, payload);
    await loadTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  const handleToggleTask = async (id) => {
    await toggleTask(id);
    await loadTasks();
  };

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      filters,
      setFilters,
      createTask: handleCreateTask,
      updateTask: handleUpdateTask,
      deleteTask: handleDeleteTask,
      toggleTask: handleToggleTask
    }),
    [tasks, loading, error, filters]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de TaskProvider');
  }
  return context;
};
