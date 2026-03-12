import { Router } from 'express';
import { todoController } from '../controllers/todo.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { z } from 'zod';

const router = Router();

// Validation schemas
const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must not exceed 255 characters'),
  description: z
    .string()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  due_date: z.string().optional(),
  category: z.string().max(100, 'Category must not exceed 100 characters').optional(),
});

const updateTodoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must not exceed 255 characters')
    .optional(),
  description: z
    .string()
    .max(1000, 'Description must not exceed 1000 characters')
    .optional()
    .nullable(),
  completed: z.boolean().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  due_date: z.string().optional().nullable(),
  category: z.string().max(100).optional().nullable(),
});

// All todo routes require authentication
router.use(authMiddleware);

// Routes
router.get('/', todoController.getAll.bind(todoController));
router.post('/', validate(createTodoSchema), todoController.create.bind(todoController));
router.put('/:id', validate(updateTodoSchema), todoController.update.bind(todoController));
router.delete('/:id', todoController.delete.bind(todoController));
router.patch('/:id/complete', todoController.toggleComplete.bind(todoController));

export default router;
