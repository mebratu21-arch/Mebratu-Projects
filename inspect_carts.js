const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

async function inspect() {
  try {
    await client.connect();
    const res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'carts'");
    console.log('Carts Columns:', res.rows);
    
    // Check for cart_items too
    const resItems = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'cart_items'");
    console.log('Cart Items Columns:', resItems.rows);
    
    await client.end();
  } catch(e) {
    console.error(e);
    await client.end();
  }
}

inspect();
