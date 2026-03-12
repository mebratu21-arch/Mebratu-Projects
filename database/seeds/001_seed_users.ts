import type { Knex } from 'knex';
import { randomUUID } from 'crypto';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('todos').del();
  await knex('users').del();

  const userId = randomUUID();

  // Bcrypt hash of 'password123'
  const passwordHash = '$2b$12$XPfvVq5ZZz/p7TRm5/QhAew0YNXkTE0F6k8HmICCV6zkFauDMsg2S';

  // Seed a demo user
  await knex('users').insert({
    id: userId,
    email: 'demo@example.com',
    password_hash: passwordHash,
  });

  // Seed demo todos
  await knex('todos').insert([
    {
      id: randomUUID(),
      title: 'Learn TypeScript',
      description: 'Study TypeScript generics and utility types',
      completed: true,
      user_id: userId,
    },
    {
      id: randomUUID(),
      title: 'Build a REST API',
      description: 'Create a secure Express.js API with JWT authentication',
      completed: false,
      user_id: userId,
    },
    {
      id: randomUUID(),
      title: 'Set up Docker',
      description: 'Containerize the application with Docker and docker-compose',
      completed: false,
      user_id: userId,
    },
  ]);
}
