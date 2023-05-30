const db = require('../index.js');
const {pool} = require('../index.js');

async function insertReview (newReview) {

  const product_id = newReview.product_id;
  const rating = newReview.rating || 5;
  const summary = newReview.summary || "";
  const body = newReview.body || "";
  const recommend = newReview.recommend || true;
  const name = newReview.name || 'anonymous';
  const email = newReview.email || 'anonymous@email.com';
  const photos = newReview.photos || [];
  const review_characteristics = newReview.characteristics || {};
  let curTime = Date.now();

  const insertReview = {
    text: `INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING review_id;`,
    values: [product_id, rating, curTime, summary, body, recommend, false, name, email, null, 0],
  }

  try {
    reviewObj = await pool.query(insertReview);
    reviewId = reviewObj.rows[0].review_id;

    //could optimize by doing in one query, potentially using pg-promise and unnest
   if (photos.length > 0) {
    photos.forEach(async (photoUrl) => {
      let insertPhoto = {
        text: `INSERT INTO reviews_photos (review_id, url) VALUES ($1, $2);`,
        values: [reviewId, photoUrl],
      }
      await pool.query(insertPhoto);
    })}

    for (const rating in review_characteristics) {
      let numOfCharacteristic = Number(rating);
      let insertCharReview = {
        text: `INSERT INTO characteristic_reviews (characteristic_id, review_id, value) VALUES ($1, $2, $3);`,
        values: [numOfCharacteristic, reviewId, review_characteristics[numOfCharacteristic]],
      };
      pool.query(insertCharReview);
    }


  } catch (err) {
    console.log(err.stack);
  }

}

module.exports.insertReview = insertReview;