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
  } else {
    console.log('Connected to DB');
  }
})

  module.exports.pool = pool;