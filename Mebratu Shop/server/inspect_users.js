const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    return client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users'");
  })
  .then(res => {
    console.log('Users Columns:', res.rows);
    return client.end();
  })
  .catch(err => {
    console.error('Error:', err);
    client.end();
  });
