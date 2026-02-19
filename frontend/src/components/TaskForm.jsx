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
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</h2>
      <div className="field">
        <label htmlFor="title">Título</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} required />
      </div>
      <div className="field">
        <label htmlFor="description">Descripción</label>
        <textarea id="description" name="description" value={form.description} onChange={handleChange} />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="dueDate">Fecha límite</label>
          <input id="dueDate" name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="priority">Prioridad</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>
      </div>

      {localError ? <p className="error">{localError}</p> : null}

      <div className="actions">
        <button type="submit">{editingTask ? 'Guardar cambios' : 'Crear tarea'}</button>
        {editingTask ? (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
};
