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
    console.log('Connected to DB');

    const carts = await client.query('SELECT * FROM carts');
    console.log('Carts:', carts.rows);

    const items = await client.query('SELECT * FROM cart_items');
    console.log('Cart Items:', items.rows);

    const users = await client.query('SELECT id, email, name FROM users');
    console.log('Users:', users.rows);

    await client.end();
  } catch (err) {
    console.error('Error:', err);
    await client.end();
  }
}

run();
