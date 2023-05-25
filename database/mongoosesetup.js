const mongoose = require('mongoose');
const { parse } = require("csv-parse");
const readline = require('readline');
const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/reviews')
  .then(() => console.log('Connected!'));

const reviewPhotoSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  review_id: Number,
  url: String
});

const reviewSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
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
  // photos: {type: [reviewPhotoSchema], sparse: true},
});

const characteristicReviewSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  characteristic_id: Number,
  review_id: Number,
  value: Number
});

const characteristicSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  product_id: Number,
  name: String,
  // characteristic_reviews: {type: [characteristicReviewSchema], sparse: true}
});

const Review = mongoose.model('Review', reviewSchema);
const ReviewPhoto = mongoose.model('ReviewPhoto', reviewPhotoSchema);
const CharacteristicReview = mongoose.model('CharacteristicReview', characteristicReviewSchema);
const Characteristic = mongoose.model('Characteristic', characteristicSchema);

let reviewPath = "/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/reviews.csv";
let photoPath = "/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/reviews_photos.csv";

// mongoimport --db=reviews --collection=reviews --type=csv --headerline --file=/Users/danielleebron/Documents/Hack\ Reactor/Week8/APIcsvs/reviews.csv

// mongoimport --db=reviews --collection=reviewphotos --type=csv --headerline --file=/Users/danielleebron/Documents/Hack\ Reactor/Week8/APIcsvs/reviews_photos.csv

// mongoimport --db=reviews --collection=characteristicreviews --type=csv --headerline --file=/Users/danielleebron/Documents/Hack\ Reactor/Week8/APIcsvs/characteristic_reviews.csv

// mongoimport --db=reviews --collection=characteristics --type=csv --headerline --file=/Users/danielleebron/Documents/Hack\ Reactor/Week8/APIcsvs/characteristics.csv
