DROP TABLE IF EXISTS reviews_photos;
DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristics;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INT,
  rating SMALLINT CHECK (rating > 0 AND rating < 6),
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT false,
  reviewer_name TEXT,
  reviewer_email TEXT,
  response TEXT,
  helpfulness INT DEFAULT 0
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name TEXT
);

CREATE TABLE characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT REFERENCES characteristics (id),
  review_id INT,
  value SMALLINT CHECK (value > 0 AND value < 6)
);

CREATE TABLE reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INT REFERENCES reviews (id),
  url TEXT
);

COPY reviews
FROM '/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics
FROM '/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photos
FROM '/Users/danielleebron/Documents/Hack Reactor/Week8/APIcsvs/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX idx_reviews_product_id ON reviews (product_id);
CREATE INDEX idx_characteristics_product_id ON characteristics (product_id);
CREATE INDEX idx_characteristics_reviews_char_id ON characteristic_reviews (characteristic_id);
CREATE INDEX idx_reviews_photos_review_id ON reviews_photos (review_id);
