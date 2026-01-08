exports.up = async function(knex) {
  const hasCarts = await knex.schema.hasTable('carts');
  if (!hasCarts) {
    await knex.schema.createTable('carts', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }

  const hasCartItems = await knex.schema.hasTable('cart_items');
  if (!hasCartItems) {
    await knex.schema.createTable('cart_items', table => {
      table.increments('id').primary();
      table.integer('cart_id').references('id').inTable('carts').onDelete('CASCADE');
      table.integer('product_id').references('id').inTable('products').onDelete('CASCADE');
      table.integer('qty').defaultTo(1);
      table.string('variant_id'); 
      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('cart_items')
    .dropTableIfExists('carts');
};
