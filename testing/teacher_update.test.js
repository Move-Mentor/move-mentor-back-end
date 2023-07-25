const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');
const Teacher = require('../src/models/teachers'); 
const { createTeacherToken } = require('../src/services/teachers_auth_service');
const validateTeacherRequest = require('../src/middlewares/teachers_auth_middleware')

require("dotenv").config();

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/move_mentor_test");
});

// Drop the database and close the connection after all tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

// Add this before all the test cases
let validToken; // Declare a variable to store the JWT

beforeAll(async () => {
  // Create a new teacher and save it to the test database
  const newTeacher = new Teacher({
    _id: '64baa41f334238e44139660b',
    firstName: 'Rafaela',
    lastName: 'Montanaro',
    email: 'rafaela@example.com',
    password: 'hashed_password',
    lessons: ["64bafbd999bdd75bc6046b6d"]
  });
  const savedTeacher = await newTeacher.save();

  // Create a valid JWT for the teacher and store it in the variable
  validToken = createTeacherToken(savedTeacher.teacher_id, savedTeacher.email);
});

beforeAll(() => {
  // Apply the middleware to the app
  app.use(validateTeacherRequest);
});

describe('updateTeacher', () => {
  it('should update a teacher profile with a valid JWT', async () => {
    // Define the updated data for the teacher profile
    const updatedData = {
      _id: '64baa41f334238e44139660a',
      firstName: 'Johnathan',
      lastName: 'Dow',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      lessons: ["64bafbd999bdd75bc6046b6d"]
    };

    // Send the request to update the teacher profile with the valid JWT
    const response = await request(app)
      .put("/profile/teacher")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code and content
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(updatedData);
  });

  it('should return 404 if teacher not found', async () => {
    // Create a valid but non-existent teacher ID
    const nonExistentTeacherID = 'non-existent-teacher-id';
    const validToken = createTeacherToken(nonExistentTeacherID, 'someemail@example.com');

    // Define the updated data for the teacher profile
    const updatedData = {
      firstName: 'Johnathan',
    };

    // Send the request to update the teacher profile with the valid JWT
    const response = await request(app)
      .put("/profile/teacher")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code
    expect(response.status).toBe(404);
  });
});