const mongoose = require('mongoose');
const request = require('supertest');
const { databaseConnector } = require("../src/database");
const { app } = require('../src/server');

// Test student sign up 
describe("Moves...", () => {

  // Connect to the test database
  beforeAll(async () => {
    await databaseConnector();
  });

  // Drop the database and close the connection after all tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe("...categories functionality...", () => {

    it("...responds with status 200 on successful retrieval of categories", async () => {
      const response = await request(app).get("/moves/categories")
      expect(response.statusCode).toBe(200);
    })

    it("...responds with a JSON object on successful retrieval of categories", async () => {
      const response = await request(app).get("/moves/categories")
      const responseBodyDataType = typeof (response.body);
      expect(responseBodyDataType).toBe("object");
    })

    it("...responds with status 404 if no categories are found", async () => {
      const response = await request(app).get("/moves/categories")
      expect(response.statusCode).toBe(404);
    })

  });


  describe("...can sign up...", () => {
    it("...with a first name, last name, email, password and lesson", async () => {
      const response = await request(app)
        .post("/users/signup/student")
        .send({
          firstName: "Jen",
          lastName: "Student",
          email: "studentjen@email.com",
          password: "somepassword",
          lessons: ["64bd5c8bb3a65f2dbf60295f"]
        })
      expect(response.statusCode).toBe(201);
      expect(response.body.email).toBe("studentjen@email.com")
    })
  })

  describe("...can not sign up...", () => {
    it("...if an email is already registered", async () => {
      const response = await request(app)
        .post("/users/signup/student")
        .send({
          firstName: "Jen",
          lastName: "Student",
          email: "studentjen@email.com",
          password: "somepassword",
          lessons: ["64bd5c8bb3a65f2dbf60295f"]
        })
      expect(response.statusCode).toBe(409);
      expect(response.body).toEqual({ Error: "Email is already registered." })
    })
  })

  describe("...can not sign up...", () => {
    it("...when a signup field is not entered", async () => {
      const response = await request(app)
        .post("/users/signup/student")
        .send({
          firstName: "Sam",
          lastName: "",
          email: "studentsam@email.com",
          password: "somepassword",
          lessons: ["64bd5c8bb3a65f2dbf60295f"]
        })
      expect(response.statusCode).toBe(400);
    })
  })
}) 
