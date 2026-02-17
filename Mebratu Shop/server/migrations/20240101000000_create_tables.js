exports.up = function(knex) {
  return knex.schema
    // Users Table
    .createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('role').defaultTo('customer'); // customer/admin
      table.timestamps(true, true);
    })
    // Products Table
    .createTable('products', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    // Product Variants Table
    .createTable('product_variants', table => {
      table.increments('id').primary();
      table.integer('product_id').references('id').inTable('products').onDelete('CASCADE');
      table.string('variant_name'); // size/color
      table.string('value');
      table.string('sku').unique();
      table.decimal('price', 10, 2);
      table.integer('stock_qty').defaultTo(0);
      table.timestamps(true, true);
    })
    // Orders Table
    .createTable('orders', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.string('status').defaultTo('processing');
      table.decimal('total', 10, 2);
      table.timestamps(true, true);
    })
    // Payments Table
    .createTable('payments', table => {
      table.increments('id').primary();
      table.integer('order_id').references('id').inTable('orders');
      table.string('provider').defaultTo('stripe');
      table.string('status').defaultTo('pending');
      table.decimal('amount', 10, 2);
      table.string('transaction_id');
      table.timestamps(true, true);
    })
    // Wishlist Table
    .createTable('wishlist', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('product_id').references('id').inTable('products');
      table.unique(['user_id', 'product_id']);
      table.timestamps(true, true);
    })
    // Reviews Table
    .createTable('reviews', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('product_id').references('id').inTable('products');
      table.integer('rating').notNullable();
      table.text('review_text');
      table.string('status').defaultTo('pending'); // approved/pending/rejected
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reviews')
    .dropTableIfExists('wishlist')
    .dropTableIfExists('payments')
    .dropTableIfExists('orders')
    .dropTableIfExists('product_variants')
    .dropTableIfExists('products')
    .dropTableIfExists('users');
};
