import { useState } from 'react';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTaskContext } from './context/TaskContext';

const App = () => {
  const {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    toggleTask
  } = useTaskContext();

  const [editingTask, setEditingTask] = useState(null);
  const [actionError, setActionError] = useState('');

  const submitTask = async (payload) => {
    try {
      setActionError('');
      if (editingTask) {
        await updateTask(editingTask.id, payload);
        setEditingTask(null);
      } else {
        await createTask(payload);
      }
    } catch (requestError) {
      setActionError(requestError.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionError('');
      await deleteTask(id);
    } catch (requestError) {
      setActionError(requestError.message);
    }
  };

  const handleToggle = async (id) => {
    try {
      setActionError('');
      await toggleTask(id);
    } catch (requestError) {
      setActionError(requestError.message);
    }
  };

  return (
    <main className="container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestiona tus tareas personales con una interfaz simple y clara.</p>
      </header>

      <TaskForm onSubmit={submitTask} editingTask={editingTask} onCancel={() => setEditingTask(null)} />
      <TaskFilters filters={filters} onChange={setFilters} />

      {loading ? <p>Cargando tareas...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {actionError ? <p className="error">{actionError}</p> : null}

      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} onToggle={handleToggle} />
    </main>
  );
};

export default App;
