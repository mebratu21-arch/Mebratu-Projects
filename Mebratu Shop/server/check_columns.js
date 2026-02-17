const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

async function inspect() {
  const info = await db('products').columnInfo();
  console.log(JSON.stringify(info, null, 2));
  await db.destroy();
}

inspect();
