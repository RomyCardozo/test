export const TaskFilters = ({ filters, onChange }) => {
  const updateFilter = (key, value) => {
    onChange((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="filters">
      <div className="field">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          value={filters.status}
          onChange={(event) => updateFilter('status', event.target.value)}
        >
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="sortBy">Ordenar por</label>
        <select
          id="sortBy"
          value={filters.sortBy}
          onChange={(event) => updateFilter('sortBy', event.target.value)}
        >
          <option value="due_date">Fecha límite</option>
          <option value="priority">Prioridad</option>
          <option value="created_at">Fecha de creación</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="order">Dirección</label>
        <select
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
