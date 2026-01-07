const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

async function forceUpdate() {
  try {
    // Add columns blindly inside try/catch to ignore 'already exists'
    try { await db.schema.alterTable('products', t => t.decimal('rating', 3, 1).defaultTo(0)); } catch (e) { console.log('rating col exists or error'); }
    try { await db.schema.alterTable('products', t => t.integer('review_count').defaultTo(0)); } catch (e) { console.log('review_count col exists or error'); }
    try { await db.schema.alterTable('products', t => t.string('delivery_info')); } catch (e) { console.log('delivery_info col exists or error'); }
    try { await db.schema.alterTable('products', t => t.string('category')); } catch (e) { console.log('category col exists or error'); }
    
    console.log('Schema update attempted.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await db.destroy();
  }
}

forceUpdate();
