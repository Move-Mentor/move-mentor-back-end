const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');
const { databaseConnector } = require("../src/database");

// Test teacher sign up 
describe("Teacher...", () => {
  // Connect to the test database before each test
  beforeEach(async () => {
    await databaseConnector();
  });

  // Close the database connection after each test
  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe("...login page...", () => {

    it("...responds with status 200", async () => {
      const response = await request(app).get("/users/login/teacher")
      expect(response.statusCode).toBe(200);
    })

    it("...responds with a JSON object", async () => {
      const response = await request(app).get("/users/login/teacher")
      const responseBodyDataType = typeof (response.body);
      expect(responseBodyDataType).toBe("object");
    })
  });
})