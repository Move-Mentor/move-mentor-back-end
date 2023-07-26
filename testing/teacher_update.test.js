const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');
const Teacher = require('../src/models/teachers');
const { createTeacherToken } = require('../src/services/teachers_auth_service');
const validateTeacherRequest = require('../src/middlewares/teachers_auth_middleware')
const { databaseConnector } = require("../src/database");

let mockTeacher = {
  firstName: 'Rafaela',
  lastName: 'Montanaro',
  email: 'rafaela@example.com',
  password: 'hashed_password',
  lessons: ["64bafbd999bdd75bc6046b6d"]
};

// Add this before all the test cases
let validToken; // Declare a variable to store the JWT

describe('updateTeacher', () => {

  beforeAll(async () => {
    // Connect to the test database
    await databaseConnector();

    // Apply the middleware to the app
    app.use(validateTeacherRequest);

    // Create a new teacher using the signup route
    const response = await request(app)
      .post("/users/signup/teacher")
      .send(mockTeacher);

    // save the returned token for our tests
    validToken = response.body.token;
  });

  // Drop the database and close the connection after all tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should update a teacher profile with a valid JWT', async () => {
    // Define the updated data for the teacher profile
    const updatedData = {
      firstName: 'Rafaela2',
      lastName: 'Montanaro2',
      email: 'rafaela2@example.com',
      password: 'hashed_password2',
      lessons: ["64bafbd999bdd75bc6046b6d"]
    };

    // Send the request to update the teacher profile with the valid JWT
    const response = await request(app)
      .put("/users/profile/teacher")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code and content
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(updatedData);
  });

  it('should return 404 if teacher not found', async () => {
    // Create a valid but non-existent teacher ID
    const nonExistentTeacherID = '64baa41f334238e44139660a';
    const validToken = createTeacherToken(nonExistentTeacherID, 'someemail@example.com');

    // Define the updated data for the teacher profile
    const updatedData = {
      firstName: 'Johnathan',
    };

    // Send the request to update the teacher profile with the valid JWT
    const response = await request(app)
      .put("/users/profile/teacher")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code
    expect(response.status).toBe(404);
  });
});