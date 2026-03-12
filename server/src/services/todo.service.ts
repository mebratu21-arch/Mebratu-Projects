import { v4 as uuidv4 } from 'uuid';
import db from '../db/connection';
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/todo.model';
import { ApiError } from '../utils/ApiError';

export class TodoService {
  /**
   * Get all todos for a user with optional search, filter, and pagination
   */
  async getAll(
    userId: string,
    options: {
      search?: string;
      completed?: string;
      priority?: string;
      category?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<{ todos: Todo[]; total: number; page: number; totalPages: number }> {
    const { search, completed, priority, category, page = 1, limit = 10 } = options;

    let query = db('todos').where({ user_id: userId });

    // Search by title or description
    if (search) {
      query = query.andWhere(function () {
        this.where('title', 'ilike', `%${search}%`)
          .orWhere('description', 'ilike', `%${search}%`);
      });
    }

    // Filter by completion status
    if (completed !== undefined) {
      query = query.andWhere({ completed: completed === 'true' });
    }

    // Filter by priority
    if (priority) {
      query = query.andWhere({ priority });
    }

    // Filter by category
    if (category) {
      query = query.andWhere('category', 'ilike', `%${category}%`);
    }

    // Get total count for pagination
    const [{ count }] = await query.clone().count('* as count');
    const total = parseInt(count as string, 10);
    const totalPages = Math.ceil(total / limit);

    // Paginated results — sort by due_date first (nulls last), then created_at
    const todos = await query
      .orderByRaw('due_date IS NULL, due_date ASC')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset((page - 1) * limit);

    return { todos, total, page, totalPages };
  }

  /**
   * Create a new todo
   */
  async create(userId: string, dto: CreateTodoDto): Promise<Todo> {
    const id = uuidv4();

    const [todo] = await db('todos')
      .insert({
        id,
        title: dto.title,
        description: dto.description || null,
        priority: dto.priority || 'medium',
        due_date: dto.due_date || null,
        category: dto.category || null,
        completed: false,
        user_id: userId,
      })
      .returning('*');

    return todo;
  }

  /**
   * Update an existing todo (only if owned by user)
   */
  async update(todoId: string, userId: string, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOwnedTodo(todoId, userId);

    const [updatedTodo] = await db('todos')
      .where({ id: todo.id })
      .update({
        ...dto,
        updated_at: db.fn.now(),
      })
      .returning('*');

    return updatedTodo;
  }

  /**
   * Delete a todo (only if owned by user)
   */
  async delete(todoId: string, userId: string): Promise<void> {
    const todo = await this.findOwnedTodo(todoId, userId);
    await db('todos').where({ id: todo.id }).del();
  }

  /**
   * Toggle the completed status of a todo
   */
  async toggleComplete(todoId: string, userId: string): Promise<Todo> {
    const todo = await this.findOwnedTodo(todoId, userId);

    const [updatedTodo] = await db('todos')
      .where({ id: todo.id })
      .update({
        completed: !todo.completed,
        updated_at: db.fn.now(),
      })
      .returning('*');

    return updatedTodo;
  }

  /**
   * Find a todo and verify ownership
   */
  private async findOwnedTodo(todoId: string, userId: string): Promise<Todo> {
    const todo = await db('todos').where({ id: todoId }).first<Todo>();

    if (!todo) {
      throw ApiError.notFound('Todo not found');
    }

    if (todo.user_id !== userId) {
      throw ApiError.forbidden('You do not have access to this todo');
    }

    return todo;
  }
}

export const todoService = new TodoService();
