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
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-800">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">TaskFlow</h1>
          <p className="mt-2 text-slate-600">Gestiona tus tareas personales con una interfaz simple y clara.</p>
        </header>

        <TaskForm onSubmit={submitTask} editingTask={editingTask} onCancel={() => setEditingTask(null)} />
        <TaskFilters filters={filters} onChange={setFilters} />

        {loading ? <p className="mb-3 text-sm font-medium text-slate-600">Cargando tareas...</p> : null}
        {error ? <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p> : null}
        {actionError ? (
          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{actionError}</p>
        ) : null}

        <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={handleDelete} onToggle={handleToggle} />
      </div>
    </main>
  );
};

export default App;
