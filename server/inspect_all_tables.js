const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

async function inspect() {
  const tables = ['products', 'orders', 'carts', 'cart_items', 'users'];
  for (const table of tables) {
    try {
      const info = await db(table).columnInfo();
      console.log(`--- ${table} ---`);
      console.log(Object.keys(info).join(', '));
    } catch (err) {
      console.log(`--- ${table} --- error: ${err.message}`);
    }
  }
  await db.destroy();
}

inspect();
