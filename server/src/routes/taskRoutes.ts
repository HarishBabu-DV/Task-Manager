import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from '../controllers/taskControllers';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', isAuthenticated, getAllTasks);
router.get('/:id', isAuthenticated, getTaskById);
router.post('/create', isAuthenticated, createTask);
router.put('/update', isAuthenticated, updateTask);
router.delete('/delete', isAuthenticated, deleteTask);

export default router;
