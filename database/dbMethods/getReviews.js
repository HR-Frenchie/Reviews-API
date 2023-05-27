const db = require('../index.js');
const {pool} = require('../index.js');

async function getReviews (data) {

  let product_id = Number(data.product_id);
  let count = Number(data.count) || 5;
  let page = Number(data.page) || 1;
  let sort = data.sort || 'reviews.helpfulness DESC';
  let offsetIndex = Math.max(count * (page - 1));

  switch (sort) {
    case 'newest':
      sort = 'date DESC';
      break;
    case 'relevant':
      sort = 'helpfulness DESC, date DESC';
      break;
    default:
      sort = 'helpfulness DESC';
  }

  const query = {
    text: `SELECT * FROM reviews WHERE product_id = $1 AND reported = false ORDER BY ${sort} LIMIT $2 OFFSET $3`,
    values: [product_id, count, offsetIndex],
  }

  try {
    const res = await pool.query(query)
    console.log(res.rows);
    return res.rows;
  } catch (err) {
    console.log(err.stack)
  }

}

module.exports.getReviews = getReviews;