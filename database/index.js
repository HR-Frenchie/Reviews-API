const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '',
  database: 'reviews',
  port: '5432',
});

pool.connect((err) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
    console.log('Connected to DB');
})

// pool
//   .query('SELECT * from characteristic_reviews LIMIT 5;')
//   .then((result) => console.log(result.rows))
//   .catch((e) => console.error(e.stack))
//   .then(() => pool.end())

  module.exports = {
    query: (text, params) => pool.query(text, params),
  }