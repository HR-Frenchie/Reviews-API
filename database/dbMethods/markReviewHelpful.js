const db = require('../index.js');
const {pool} = require('../index.js');

async function markReviewHelpful (reviewIdString) {

  let reviewId = Number(reviewIdString);

  const query = {
    text: `UPDATE reviews SET helpfulness = helpfulness + 1 where review_id = $1;`,
    values: [reviewId],
  }

  try {
    const res = await pool.query(query);
  } catch (err) {
    console.log(err.stack)
  }

}

module.exports.markReviewHelpful = markReviewHelpful;