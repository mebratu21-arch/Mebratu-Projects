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
    console.log('Inserting product...');
    
    // Check if exists
    const res = await client.query('SELECT * FROM products WHERE id = 1');
    if (res.rows.length === 0) {
       await client.query(`
         INSERT INTO products (id, title, description, price, is_active, category_id, image)
         VALUES (1, 'Test Product', 'Desc', 29.99, true, NULL, 'https://placehold.co/400')
       `);
       console.log('Product inserted.');
    } else {
       console.log('Product 1 already exists.');
    }

    await client.end();
  } catch (err) {
    console.error('Error Details:', err);
    await client.end();
  }
}

run();
