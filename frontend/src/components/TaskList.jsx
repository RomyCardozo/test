const priorityLabel = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta'
};

export const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (!tasks.length) {
    return <p className="empty-state">No hay tareas para mostrar.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? 'task-card completed' : 'task-card'}>
          <div>
            <h3>{task.title}</h3>
            <p>{task.description || 'Sin descripción'}</p>
            <small>
              Fecha límite: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sin fecha'} | 
              Prioridad: {priorityLabel[task.priority]}
            </small>
          </div>

          <div className="task-actions">
            <button onClick={() => onToggle(task.id)}>
              {task.completed ? 'Reabrir' : 'Completar'}
            </button>
            <button className="secondary" onClick={() => onEdit(task)}>
              Editar
            </button>
            <button className="danger" onClick={() => onDelete(task.id)}>
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
