import request from 'supertest';
import app from '../src/app';
import db from '../src/db/connection';

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db('todos').del();
  await db('users').del();
  await db.migrate.rollback();
  await db.destroy();
});

describe('Middleware', () => {
  describe('Auth Middleware', () => {
    it('should return 401 when no token is provided', async () => {
      const res = await request(app).get('/api/todos');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('No token');
    });

    it('should return 401 for malformed Authorization header', async () => {
      const res = await request(app)
        .get('/api/todos')
        .set('Authorization', 'NotBearer some-token');

      expect(res.status).toBe(401);
    });

    it('should return 401 for expired/invalid token', async () => {
      const res = await request(app)
        .get('/api/todos')
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.payload');

      expect(res.status).toBe(401);
    });
  });

  describe('Validation Middleware', () => {
    it('should return 400 for invalid registration data', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: '', password: '' });

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Validation error');
    });
  });

  describe('Health Check', () => {
    it('should return 200 on health check', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.timestamp).toBeDefined();
    });
  });
});
