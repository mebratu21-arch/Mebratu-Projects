const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

console.log('Running migrations...');

db.migrate.latest()
  .then(() => {
    console.log('Migrations complete!');
    return db.destroy();
  })
  .catch(err => {
    console.error('Migration failed:', err);
    return db.destroy();
  });
