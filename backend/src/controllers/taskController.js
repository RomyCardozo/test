import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from '../models/taskModel.js';
import { validateTaskPayload } from '../utils/validators.js';

export const listTasks = async (req, res, next) => {
  try {
    const tasks = await getTasks({
      status: req.query.status,
      sortBy: req.query.sortBy,
      order: req.query.order
    });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTaskHandler = async (req, res, next) => {
  try {
    const errors = validateTaskPayload(req.body);
    if (errors.length) {
      return res.status(400).json({ message: 'Datos inválidos', errors });
    }

    const task = await createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'ID de tarea inválido.' });
    }

    const errors = validateTaskPayload(req.body, true);
    if (errors.length) {
      return res.status(400).json({ message: 'Datos inválidos', errors });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No hay campos para actualizar.' });
    }

    const existingTask = await getTaskById(id);
    if (!existingTask) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    const updated = await updateTask(id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteTaskHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'ID de tarea inválido.' });
    }

    const deleted = await deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const toggleTaskCompletionHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'ID de tarea inválido.' });
    }

    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }

    const updated = await updateTask(id, { completed: !task.completed });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
