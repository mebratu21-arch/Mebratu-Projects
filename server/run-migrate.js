require('ts-node').register({ transpileOnly: true });
const path = require('path');

// Load env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    directory: path.resolve(__dirname, '../database/migrations'),
    extension: 'ts',
  },
  seeds: {
    directory: path.resolve(__dirname, '../database/seeds'),
    extension: 'ts',
  },
});

async function run() {
  try {
    console.log('Running migrations...');
    const [batch, log] = await knex.migrate.latest();
    console.log(`Batch ${batch} complete. Migrations run:`);
    log.forEach(f => console.log('  ✅', path.basename(f)));
    
    if (log.length === 0) {
      console.log('  (Already up to date)');
    }

    console.log('\nRunning seeds...');
    await knex.seed.run();
    console.log('  ✅ Seeds complete');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await knex.destroy();
  }
}

run();
