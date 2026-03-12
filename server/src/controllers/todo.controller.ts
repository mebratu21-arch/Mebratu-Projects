import { Response, NextFunction } from 'express';
import { todoService } from '../services/todo.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class TodoController {
  /**
   * GET /api/todos
   */
  async getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { search, completed, priority, category, page, limit } = req.query;

      const result = await todoService.getAll(req.userId!, {
        search: search as string | undefined,
        completed: completed as string | undefined,
        priority: priority as string | undefined,
        category: category as string | undefined,
        page: page ? parseInt(String(page), 10) : undefined,
        limit: limit ? parseInt(String(limit), 10) : undefined,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/todos
   */
  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const todo = await todoService.create(req.userId!, req.body);

      res.status(201).json({
        success: true,
        data: { todo },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/todos/:id
   */
  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const todoId = String(req.params.id);
      const todo = await todoService.update(todoId, req.userId!, req.body);

      res.status(200).json({
        success: true,
        data: { todo },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/todos/:id
   */
  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const todoId = String(req.params.id);
      await todoService.delete(todoId, req.userId!);

      res.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api/todos/:id/complete
   */
  async toggleComplete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const todoId = String(req.params.id);
      const todo = await todoService.toggleComplete(todoId, req.userId!);

      res.status(200).json({
        success: true,
        data: { todo },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const todoController = new TodoController();
