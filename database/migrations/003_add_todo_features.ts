import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todos', (table) => {
    table.enu('priority', ['low', 'medium', 'high']).defaultTo('medium').notNullable();
    table.date('due_date').nullable();
    table.string('category', 100).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('todos', (table) => {
    table.dropColumn('priority');
    table.dropColumn('due_date');
    table.dropColumn('category');
  });
}
