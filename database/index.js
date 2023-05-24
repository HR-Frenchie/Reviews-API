const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviews'
  port: '5432',
});

pool.connect((err, client) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
    console.log('Connected?');
})