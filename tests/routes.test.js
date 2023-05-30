const app = require('../server/app.js');
const request = require('supertest');

describe('Local routes and queries tests', () => {
  //max product_id = 1000011

  let testReview = {
    "product_id": 1000011,
    "rating": 4,
    "summary": "Test Review",
    "body": "I want to insert photos into the db inserted this into the db",
    "recommend": true,
    "name": "Johnny Boy",
    "email": "John@email.com",
    "photos": ["testphoto1.com", "testPhoto2.com"],
    "characteristics": {"14" : 5,
                        "15" : 4}
};

test('GET /reviews should return reviews when they exist', async () => {
  const response = await request(app).get('/reviews/?product_id=1000011&count=5&sort=newest&page=1');
  expect(response.status).toBe(200);
  expect(response.body.product).toEqual('1000011');
  expect(response.body.page).toBe(1);
  console.log(response.body.results.length);
});

test('GET /review/meta should return information about product', async () => {
  const response = await request(app).get('/reviews/meta/?page=1&product_id=1000011');
  expect(response.status).toBe(200);
});


// test('POST /reviews should create a new review for that product_id', async () => {
//   let initialResults = await request(app).get('/reviews/?product_id=1000011&count=500&sort=newest&page=1');
//   let initialResultsLength = initialResults.body.results.length;
//   const response = await request(app).post('/reviews').send(testReview);
//   let nextResults = await request(app).get('/reviews/?product_id=1000011&count=500&sort=newest&page=1');
//   let nextResultsLength = nextResults.body.results.length
//   expect(response.status).toBe(201);
//   expect(nextResultsLength).toBeGreaterThan(initialResultsLength);
// });

test('PUT /reviews/:review_id/helpful marks a review as helpful', async () => {
  const response = await request(app).put('/reviews/5774940/helpful');
  expect(response.status).toBe(204);
});

test('PUT /reviews/:review_id/report reports a review', async () => {
  const response = await request(app).put('/reviews/5774940/report');
  expect(response.status).toBe(204);
});

});