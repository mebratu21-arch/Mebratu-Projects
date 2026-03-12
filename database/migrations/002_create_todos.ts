import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('todos', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('title', 255).notNullable();
    table.text('description').nullable();
    table.boolean('completed').defaultTo(false).notNullable();
    table.uuid('user_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();

    // Foreign key constraint - cascade delete when user is deleted
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');

    // Index for faster queries by user_id
    table.index('user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('todos');
}
