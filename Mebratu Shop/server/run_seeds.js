const knex = require('knex');
const config = require('./knexfile');
const db = knex(config.development);

console.log('Running seeds...');

db.seed.run()
  .then(() => {
    console.log('Seeds complete!');
    return db.destroy();
  })
  .catch(err => {
    console.error('Seed failed:', err);
    return db.destroy();
  });
