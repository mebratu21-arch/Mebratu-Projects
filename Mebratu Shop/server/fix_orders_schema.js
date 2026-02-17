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
    console.log('Fixing orders table schema...');
    
    // Add columns if missing
    try {
        await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2)');
        await client.query('ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT \'pending\'');
        console.log('Columns total_price and payment_status added/checked.');
    } catch(e) {
        console.log('Order table fix error:', e.message);
    }

    console.log('Checking orders table structure...');
    const res = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'orders'
    `);
    console.log('Orders columns:', res.rows.map(r => r.column_name).join(', '));

    await client.end();
  } catch (err) {
    console.error('Error:', err);
    await client.end();
  }
}

run();
