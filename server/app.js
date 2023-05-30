const express = require('express');
const getReviews = require('../database/dbMethods/getReviews.js');
const getMetadata = require('../database/dbMethods/getMetadata.js');
const insertReview = require('../database/dbMethods/insertReview.js');
const markReviewHelpful = require('../database/dbMethods/markReviewHelpful.js');
const reportReview = require('../database/dbMethods/reportReview.js');
require('dotenv').config();

const port = process.env.SERVER_PORT || 3000;

const app = express();
app.use(express.json());

app.get('/reviews', async (req, res) => {
  //20 - 27 ms
  var startTime = performance.now();
  let reviewList = await getReviews.getReviews(req.query);
  var endTime = performance.now();
  console.log(`Call to get reviews took ${endTime - startTime} milliseconds`);

  reviewList.forEach((item) => {
    let msTime = Number(item.date);
    let newDate = new Date(msTime);
    item.date = newDate.toISOString();
    if (item.response === 'null') {
      item.response = null;
    }
  })

  let returnItem = {
    product: req.query.product_id,
    page: Number(req.query.page),
    count: Number(req.query.count),
    results: reviewList
  }

  res.status(200).send(returnItem);
})

app.get('/reviews/meta', async (req, res) => {
  //47 - 14 ms
  // var startTime = performance.now();
  let metadata = await getMetadata.getMetadata(req.query.product_id);
  // var endTime = performance.now();
  // console.log(`Call to get meta took ${endTime - startTime} milliseconds`);
  let characteristics = {};

  metadata[1].forEach((characteristic) => {
    let item = {
      id: characteristic.id,
      value: characteristic.round
    };
    characteristics[characteristic.name] = item;
  })

  let returnItem = {
    product_id: req.query.product_id,
    ratings: {
      1: Number(metadata[0][0]["one"]),
      2: Number(metadata[0][0]["two"]),
      3: Number(metadata[0][0]["three"]),
      4: Number(metadata[0][0]["four"]),
      5: Number(metadata[0][0]["one"])
    },
    recommended: {
      0: Number(metadata[0][0]["notrecommended"]),
      1: Number(metadata[0][0]["recommended"])
    },
    characteristics: characteristics
  }

  res.status(200).send(returnItem);
})

app.post('/reviews', (req, res) => {
  //Add review to db
  //3.8089579939842224 ms
  // var startTime = performance.now();
  insertReview.insertReview(req.body);
  // var endTime = performance.now();
  // console.log(`Call to insert review took ${endTime - startTime} milliseconds`);

  res.status(201).send(`Created review for product ${req.body.product_id}!`)
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  //mark review as helpful
  //if the review is not a valid review, return a 500 and the message
  //"An error occurred. If this error persists, contact your instruction team."
  try {
    //3 ms
    // var startTime = performance.now();
    markReviewHelpful.markReviewHelpful(req.params.review_id);
    // var endTime = performance.now();
    // console.log(`Call to mark review as helpful took ${endTime - startTime} milliseconds`);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.put('/reviews/:review_id/report', (req, res) => {
  //mark review as helpful
  //if the review is not a valid review, return a 500 and the message
  //"An error occurred. If this error persists, contact your instruction team."
  try {
    //3-5 ms
    // var startTime = performance.now();
    reportReview.reportReview(req.params.review_id)
    // var endTime = performance.now();
    // console.log(`Call to report review took ${endTime - startTime} milliseconds`);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
})

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`)
// })

module.exports = app;