import db from '../src/db/connection';

beforeAll(async () => {
  // Run migrations
  await db.migrate.latest();
});

afterAll(async () => {
  // Rollback migrations and close connection
  await db.migrate.rollback();
  await db.destroy();
});
