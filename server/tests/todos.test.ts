import request from 'supertest';
import app from '../src/app';
import db from '../src/db/connection';

let authToken: string;
let todoId: string;

beforeAll(async () => {
  await db.migrate.latest();

  // Register a test user and get token
  const res = await request(app)
    .post('/api/auth/register')
    .send({ email: 'todotest@example.com', password: 'password123' });

  authToken = res.body.data.token;
});

afterAll(async () => {
  await db('todos').del();
  await db('users').del();
  await db.migrate.rollback();
  await db.destroy();
});

describe('Todo Endpoints', () => {
  // ─── Create Todo ───────────────────────────────────
  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const res = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Todo', description: 'Test description' });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.todo.title).toBe('Test Todo');
      expect(res.body.data.todo.completed).toBe(false);
      todoId = res.body.data.todo.id;
    });

    it('should return 400 for missing title', async () => {
      const res = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ description: 'No title' });

      expect(res.status).toBe(400);
    });

    it('should return 401 without auth token', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'Unauthorized Todo' });

      expect(res.status).toBe(401);
    });
  });

  // ─── Get All Todos ─────────────────────────────────
  describe('GET /api/todos', () => {
    it('should return all todos for the user', async () => {
      const res = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.todos)).toBe(true);
      expect(res.body.data.todos.length).toBeGreaterThan(0);
    });

    it('should support search parameter', async () => {
      const res = await request(app)
        .get('/api/todos?search=Test')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.todos.length).toBeGreaterThan(0);
    });

    it('should support filter by completed', async () => {
      const res = await request(app)
        .get('/api/todos?completed=false')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      res.body.data.todos.forEach((todo: { completed: boolean }) => {
        expect(todo.completed).toBe(false);
      });
    });

    it('should support pagination', async () => {
      const res = await request(app)
        .get('/api/todos?page=1&limit=5')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.page).toBe(1);
      expect(res.body.data.totalPages).toBeDefined();
    });
  });

  // ─── Update Todo ───────────────────────────────────
  describe('PUT /api/todos/:id', () => {
    it('should update a todo', async () => {
      const res = await request(app)
        .put(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Updated Todo' });

      expect(res.status).toBe(200);
      expect(res.body.data.todo.title).toBe('Updated Todo');
    });

    it('should return 404 for non-existent todo', async () => {
      const res = await request(app)
        .put('/api/todos/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Ghost Todo' });

      expect(res.status).toBe(404);
    });
  });

  // ─── Toggle Complete ──────────────────────────────
  describe('PATCH /api/todos/:id/complete', () => {
    it('should toggle todo completion status', async () => {
      const res = await request(app)
        .patch(`/api/todos/${todoId}/complete`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.todo.completed).toBe(true);
    });

    it('should toggle back to incomplete', async () => {
      const res = await request(app)
        .patch(`/api/todos/${todoId}/complete`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.todo.completed).toBe(false);
    });
  });

  // ─── Delete Todo ───────────────────────────────────
  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      const res = await request(app)
        .delete(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should return 404 for deleted todo', async () => {
      const res = await request(app)
        .delete(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).toBe(404);
    });
  });

  // ─── Authorization ────────────────────────────────
  describe('Authorization', () => {
    let otherUserToken: string;
    let privateTodoId: string;

    beforeAll(async () => {
      // Create another user
      const regRes = await request(app)
        .post('/api/auth/register')
        .send({ email: 'other@example.com', password: 'password123' });
      otherUserToken = regRes.body.data.token;

      // Create a todo as the original user
      const todoRes = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Private Todo' });
      privateTodoId = todoRes.body.data.todo.id;
    });

    it('should not allow access to another user\'s todo', async () => {
      const res = await request(app)
        .put(`/api/todos/${privateTodoId}`)
        .set('Authorization', `Bearer ${otherUserToken}`)
        .send({ title: 'Hacked!' });

      expect([403, 404]).toContain(res.status);
    });

    it('should not allow deleting another user\'s todo', async () => {
      const res = await request(app)
        .delete(`/api/todos/${privateTodoId}`)
        .set('Authorization', `Bearer ${otherUserToken}`);

      expect([403, 404]).toContain(res.status);
    });
  });
});
