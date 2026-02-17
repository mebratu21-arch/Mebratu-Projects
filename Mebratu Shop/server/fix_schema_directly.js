const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Fixing schema...');
    
    // Add columns if missing
    // We catch errors if they exist, or use IF NOT EXISTS logic where possible (Postgres 9.6+ supports IF NOT EXISTS for ADD COLUMN)
    try {
        await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS title VARCHAR(255)');
        await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS price DECIMAL(10,2)');
        await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT');
        await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE');
    } catch(e) {
        console.log('Column add error (ignoring):', e.message);
    }

    console.log('Schema fixed. Seeding product...');
    // Upsert product 1
    await client.query(`
      INSERT INTO products (id, title, name, description, price, is_active, stock, brand)
      VALUES (1, 'Test Product', 'Test Product', 'Desc', 29.99, true, 100, 'Generic')
      ON CONFLICT (id) DO UPDATE 
      SET title = EXCLUDED.title, price = EXCLUDED.price, name = EXCLUDED.name, stock = EXCLUDED.stock
    `);
    console.log('Product 1 seeded.');

    await client.end();
  } catch (err) {
    console.error('Error:', err);
    await client.end();
  }
}

run();
