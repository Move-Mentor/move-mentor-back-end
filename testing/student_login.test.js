const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');

require("dotenv").config();

// Connect to the test database before each test
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/move_mentor_test");
});

// Close the database connection after each test
afterAll(async () => {
  await mongoose.connection.close();
});

// Test student sign up 
describe("Student...", () => {
  describe("...login page...", () => {

    it("...responds with status 200", async () => {
      const response = await request(app).get("/users/login/student")
      expect(response.statusCode).toBe(200);
    })
  
    it("...responds with a JSON object", async () => {
      const response = await request(app).get("/users/login/student")
      const responseBodyDataType = typeof(response.body);
      expect(responseBodyDataType).toBe("object");
    })
  });
})