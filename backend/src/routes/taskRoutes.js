import { Router } from 'express';
import {
  createTaskHandler,
  deleteTaskHandler,
  listTasks,
  toggleTaskCompletionHandler,
  updateTaskHandler
} from '../controllers/taskController.js';

const router = Router();

router.get('/', listTasks);
router.post('/', createTaskHandler);
router.put('/:id', updateTaskHandler);
router.patch('/:id/toggle', toggleTaskCompletionHandler);
router.delete('/:id', deleteTaskHandler);

export default router;
