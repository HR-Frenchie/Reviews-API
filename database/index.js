const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER,
  database: process.env.PGDATABASE || 'reviews',
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
  max: 16,
});

pool.connect((err) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  } else {
    console.log('Connected to DB');
  }
})

  module.exports.pool = pool;