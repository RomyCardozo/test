export const TaskFilters = ({ filters, onChange }) => {
  const updateFilter = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="status">
          Estado
        </label>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500"
          id="status"
          value={filters.status}
          onChange={(event) => updateFilter('status', event.target.value)}
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="sortBy">
          Ordenar por
        </label>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500"
          id="sortBy"
          value={filters.sortBy}
          onChange={(event) => updateFilter('sortBy', event.target.value)}
        >
          <option value="due_date">Fecha límite</option>
          <option value="priority">Prioridad</option>
          <option value="created_at">Fecha de creación</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="order">
          Dirección
        </label>
        <select
          className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand-500"
          id="order"
          value={filters.order}
          onChange={(event) => updateFilter('order', event.target.value)}
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    </section>
  );
};
