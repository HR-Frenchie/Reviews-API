const mongoose = require('mongoose');
const csv = require('csv-parser')
const fs = require('fs')

mongoose.connect('mongodb://127.0.0.1:27017/reviews')
  .then(() => console.log('Connected!'));

const reviewPhotoSchema = new mongoose.Schema({
  photo_id: {type: Number, unique: true},
  review_id: Number,
  url: String
});

const reviewSchema = new mongoose.Schema({
  review_id: {type: Number, unique: true},
	product_id: Number,
  reported: {type: Boolean, default: false},
  rating: Number,
  summary: String,
  response: {type: String, default: null},
  body: String,
  date: Number,
  reviewer_name: String,
  reviewer_email: String,
  recommended: Boolean,
  helpfulness: Number,
  photos: [reviewPhotoSchema],
});

const characteristicReviewSchema = new mongoose.Schema({
  char_review_id: {type: Number, unique: true},
  characteristic_id: Number,
  review_id: Number,
  value: Number
});

const characteristicSchema = new mongoose.Schema({
  char_id: {type: Number, unique: true},
  product_id: Number,
  name: String,
  characteristic_reviews: [characteristicReviewSchema]
});

const Review = mongoose.model('Review', reviewSchema);
const ReviewPhoto = mongoose.model('ReviewPhoto', reviewPhotoSchema);

let reviewPath = "/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/reviews.csv";
let photoPath = "/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/reviews_photos.csv";


// fs.createReadStream(photoPath)
//   .pipe(csv())
//   .on('data', (data) => {
//     const item = {
//       photo_id: data.id,
//       review_id: data.review_id,
//       url: data.url
//     }
//     const row = new ReviewPhoto(item);
//     row.save();
//   })
//   .on('end', () => {
//     console.log('Done importing photos.csv');
//   });
