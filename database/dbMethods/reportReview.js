const db = require('../index.js');
const {pool} = require('../index.js');

async function reportReview (reviewIdString) {

  let reviewId = Number(reviewIdString);

  const query = {
    text: `UPDATE reviews SET reported = true where review_id = $1;`,
    values: [reviewId],
  }

  try {
    const res = await pool.query(query);
  } catch (err) {
    console.log(err.stack)
    return err.stack;
  }

}

module.exports.reportReview = reportReview;