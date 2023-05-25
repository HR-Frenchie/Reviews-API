const { Pool } = require('pg');
require('dotenv').config();

console.log(process.env)
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  database: process.env.DB || 'reviews',
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
    console.log('Connected to DB');
})

pool
  .query('SELECT * from characteristics LIMIT 5;')
  .then((result) => console.log(result.rows))
  .catch((e) => console.error(e.stack))
  .then(() => pool.end())

  module.exports = {
    query: (text, params) => pool.query(text, params),
  }