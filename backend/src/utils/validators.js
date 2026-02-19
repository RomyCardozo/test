const validPriorities = ['low', 'medium', 'high'];

export const validateTaskPayload = (payload, partial = false) => {
  const errors = [];

  if (!partial || payload.title !== undefined) {
    if (typeof payload.title !== 'string' || payload.title.trim().length < 3) {
      errors.push('El título debe tener al menos 3 caracteres.');
    }
  }

  if (!partial || payload.description !== undefined) {
    if (
      payload.description !== undefined &&
      payload.description !== null &&
      typeof payload.description !== 'string'
    ) {
      errors.push('La descripción debe ser texto.');
    }
  }

  if (!partial || payload.dueDate !== undefined) {
    if (payload.dueDate && Number.isNaN(new Date(payload.dueDate).getTime())) {
      errors.push('La fecha límite no tiene un formato válido.');
    }
  }

  if (!partial || payload.priority !== undefined) {
    if (!validPriorities.includes(payload.priority)) {
      errors.push('La prioridad debe ser low, medium o high.');
    }
  }

  if (!partial || payload.completed !== undefined) {
    if (payload.completed !== undefined && typeof payload.completed !== 'boolean') {
      errors.push('El estado completed debe ser booleano.');
    }
  }

  return errors;
};
