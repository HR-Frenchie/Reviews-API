const db = require('../index.js');
const {pool} = require('../index.js');

async function getMetadata (product_id) {

  const counts = {
    text: `SELECT COUNT(CASE WHEN rating = 1 THEN rating END) AS one,
    COUNT(CASE WHEN rating = 2 THEN rating END) AS two,
    COUNT(CASE WHEN rating = 3 THEN rating END) AS three,
    COUNT(CASE WHEN rating = 4 THEN rating END) AS four,
    COUNT(CASE WHEN rating = 5 THEN rating END) AS five,
    COUNT(CASE WHEN recommend = true THEN recommend END) AS recommended,
    COUNT(CASE WHEN recommend = false THEN recommend END) AS notrecommended FROM reviews WHERE product_id = $1;`,
    values: [product_id],
  }

  const values = {
    text: `SELECT characteristics.id, name, ROUND(AVG(value), 4) FROM characteristics INNER JOIN characteristic_reviews ON characteristics.id = characteristic_reviews.characteristic_id WHERE product_id = $1 GROUP BY characteristics.id, name;`,
    values: [product_id]
  }

  try {
    const itemCounts = await pool.query(counts);
    const characteristics = await pool.query(values);
    let returnObject = [itemCounts.rows, characteristics.rows];
    return returnObject;
  } catch (err) {
    console.log(err.stack)
  }

}

module.exports.getMetadata = getMetadata;