const priorityLabel = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta'
};

const priorityBadgeClass = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700'
};

export const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  if (!tasks.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
        No hay tareas para mostrar.
      </p>
    );
  }

  return (
    <ul className="grid gap-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${
            task.completed ? 'opacity-70' : ''
          }`}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
              <p className={`mt-1 text-slate-600 ${task.completed ? 'line-through' : ''}`}>
                {task.description || 'Sin descripción'}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-700">
                  Fecha límite: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Sin fecha'}
                </span>
                <span className={`rounded-md px-2 py-1 ${priorityBadgeClass[task.priority]}`}>
                  Prioridad: {priorityLabel[task.priority]}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-600"
                onClick={() => onToggle(task.id)}
              >
                {task.completed ? 'Reabrir' : 'Completar'}
              </button>
              <button
                className="rounded-lg bg-slate-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                onClick={() => onEdit(task)}
              >
                Editar
              </button>
              <button
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                onClick={() => onDelete(task.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
