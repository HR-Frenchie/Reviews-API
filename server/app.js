const express = require('express');
require('dotenv').config();

const port = process.env.SERVER_PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/reviews', (req, res) => {
//   if (isNaN(req.query.product_id)) {
//     res.status(422).send('Error: invalid product_id provided');
// } else {
  //Query database for metadata on reviews for this product
  //db.getMetadata(req.query.product_id)
  res.status(200).send(`Reviews for product ${req.query.product_id} requested!`)
  // }
})

app.get('/reviews/meta', (req, res) => {
//   if (isNaN(req.query.product_id)) {
//     res.status(422).send('Error: invalid product_id provided');
// } else {
  //Query database for metadata on reviews for this product
  //db.getMetadata(req.query.product_id)
  res.status(200).send(`Review metadata for product ${req.query.product_id} requested!`)
  // }
})

app.post('/reviews', (req, res) => {
//   if (isNaN(req.body.product_id)) {
//     res.status(422).send('Error: invalid product_id provided');
// } else {
  //Add review to db
  //db.addReview(req.body)
  res.status(201).send(`Created review for product ${req.body.product_id} requested!`)
  // }
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  //mark review as helpful
  //if the review is not a valid review, return a 500 and the message
  //"An error occurred. If this error persists, contact your instruction team."
  //db.markReviewHelpful(req.params.review_id)
  // console.log('params', req.params.review_id);
  res.sendStatus(204);
})

app.put('/reviews/:review_id/report', (req, res) => {
  //mark review as helpful
  //if the review is not a valid review, return a 500 and the message
  //"An error occurred. If this error persists, contact your instruction team."
  //db.reportReview(req.params.review_id)
  // console.log('params', req.params.review_id);
  res.sendStatus(204);
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})