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
    console.log('Finalizing Database Schema...');
    
    // 1. Fix Products Table
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS title VARCHAR(255)');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS price DECIMAL(10,2)');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS image VARCHAR(255)');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0');
    await client.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(255)');

    // 2. Fix Orders Table
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2)');
    await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT \'pending\'');
    
    // 3. Create Order Items Table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id),
        qty INTEGER NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Schema update complete.');
    await client.end();
  } catch (err) {
    console.error('Schema update error:', err);
    await client.end();
    process.exit(1);
  }
}

run();
