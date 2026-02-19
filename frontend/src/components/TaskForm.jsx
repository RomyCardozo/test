import { useEffect, useState } from 'react';

const initialState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium'
};

export const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [form, setForm] = useState(initialState);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        dueDate: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '',
        priority: editingTask.priority
      });
      return;
    }

    setForm(initialState);
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.title.trim().length < 3) {
      setLocalError('El título debe tener al menos 3 caracteres.');
      return;
    }

    setLocalError('');
    await onSubmit(form);

    if (!editingTask) {
      setForm(initialState);
    }
  };

  return (
    <form className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold text-slate-900">{editingTask ? 'Editar tarea' : 'Nueva tarea'}</h2>

      <div className="mb-4 flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="title">
          Título
        </label>
        <input
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none ring-0 transition focus:border-brand-500"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="min-h-24 rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="dueDate">
            Fecha límite
          </label>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500"
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700" htmlFor="priority">
            Prioridad
          </label>
          <select
            className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500"
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>

      {localError ? <p className="mt-2 text-sm font-semibold text-red-700">{localError}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="submit"
          className="rounded-lg bg-brand-500 px-4 py-2 font-medium text-white transition hover:bg-brand-600"
        >
          {editingTask ? 'Guardar cambios' : 'Crear tarea'}
        </button>
        {editingTask ? (
          <button
            type="button"
            className="rounded-lg bg-slate-600 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
            onClick={onCancel}
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
};
