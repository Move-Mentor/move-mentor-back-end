const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');

require("dotenv").config();

// Connect to the test database before each test
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/move_mentor_test");
});

// Close the database connection after each test
afterEach(async () => {
  await mongoose.connection.close();
});

// Test student sign up 
describe("Student...", () => {
  describe("...sign up page...", () => {

    it("...responds with status 200", async () => {
      const response = await request(app).get("/users/signup/student")
      expect(response.statusCode).toBe(200);
    })
  
    it("...responds with a JSON object", async () => {
      const response = await request(app).get("/users/signup/student")
      const responseBodyDataType = typeof(response.body);
      expect(responseBodyDataType).toBe("object");
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
      expect(response.body).toEqual({Error: "Email is already registered."})
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
