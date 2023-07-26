const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');
const { databaseConnector } = require("../src/database");
const { createStudentToken } = require('../src/services/students_auth_service');
const validateStudentRequest = require('../src/middlewares/students_auth_middleware')

let mockStudent = {
  firstName: 'Johnathan',
  lastName: 'Dow',
  email: 'john.doe@example.com',
  password: 'hashed_password',
  lessons: ["64bafbd999bdd75bc6046b6d"]
};

// Add this before all the test cases
let validToken; // Declare a variable to store the JWT

describe('updateStudent', () => {
  beforeAll(async () => {
    // Connect to the test database
    await databaseConnector();

    // Apply the middleware to the app
    app.use(validateStudentRequest);

    // Create a new student using the signup route
    const response = await request(app)
      .post("/users/signup/student")
      .send(mockStudent);

    // save the returned token for our tests
    validToken = response.body.token;
  });

  // Drop the database and close the connection after all tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should update a student profile with a valid JWT', async () => {
    // Define the updated data for the student profile
    const updatedData = {
      firstName: 'Johnathan2',
      lastName: 'Dow2',
      email: 'john.doe2@example.com',
      password: 'hashed_password2',
      lessons: ["64bafbd999bdd75bc6046b6d"]
    };

    // Send the request to update the student profile with the valid JWT
    const response = await request(app)
      .put("/users/profile/student")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code and content
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(updatedData);
  });

  it('should return 404 if student not found', async () => {
    // Create a valid but non-existent student ID
    const nonExistentStudentID = '11baa41f334238e44139660a';
    const validToken = createStudentToken(nonExistentStudentID, 'someemail@example.com');

    // Define the updated data for the student profile
    const updatedData = {
      firstName: 'Johnathan',
    };

    // Send the request to update the student profile with the valid JWT
    const response = await request(app)
      .put("/users/profile/student")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code
    expect(response.status).toBe(404);
  });
});
