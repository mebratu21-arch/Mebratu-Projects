const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

async function migrate() {
  try {
    const hasRating = await db.schema.hasColumn('products', 'rating');
    const hasReviewCount = await db.schema.hasColumn('products', 'review_count');
    const hasDeliveryInfo = await db.schema.hasColumn('products', 'delivery_info');
    const hasCategory = await db.schema.hasColumn('products', 'category');

    await db.schema.table('products', (table) => {
      if (!hasRating) table.decimal('rating', 2, 1).defaultTo(0);
      if (!hasReviewCount) table.integer('review_count').defaultTo(0);
      if (!hasDeliveryInfo) table.string('delivery_info');
      if (!hasCategory) table.string('category');
    });

    console.log('Schema updated successfully');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await db.destroy();
  }
}

migrate();
