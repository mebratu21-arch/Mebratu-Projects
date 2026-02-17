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
    console.log('\n--- ALL TRANSACTIONS (ORDERS) ---\n');

    const orders = await client.query(`
      SELECT o.id, u.email, o.total_price, o.status, o.created_at 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    if (orders.rows.length === 0) {
      console.log('No transactions found.');
    } else {
      orders.rows.forEach(o => {
        console.log(`Order ID: ${o.id} | User: ${o.email} | Total: $${Number(o.total_price).toFixed(2)} | Status: ${o.status} | Date: ${o.created_at}`);
      });
    }

    await client.end();
  } catch (err) {
    console.error('Error:', err);
    await client.end();
  }
}

run();
