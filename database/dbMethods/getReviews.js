const db = require('../index.js');
const {pool} = require('../index.js');

async function getReviews (data) {

  let product_id = Number(data.product_id);
  let count = Number(data.count) || 5;
  let page = Number(data.page);

  if (page < 1) {
    page = 1;
  }

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
    text: `SELECT reviews.review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, coalesce(json_agg(json_build_object(
      'id', reviews_photos.id,
      'url', url)), '[]') AS photos
      FROM reviews INNER JOIN reviews_photos on reviews.review_id = reviews_photos.review_id
      WHERE product_id = $1 AND reported = false GROUP BY reviews.review_id
      ORDER BY ${sort} LIMIT $2 OFFSET $3;`,
    values: [product_id, count, offsetIndex],
  }

  try {
    const res = await pool.query(query)
    return res.rows;
  } catch (err) {
    console.log(err.stack)
    return err;
  }

}

module.exports.getReviews = getReviews;