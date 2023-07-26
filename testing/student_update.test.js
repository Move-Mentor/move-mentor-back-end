const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');
const Student = require('../src/models/students'); 
<<<<<<< HEAD
const { createStudentToken } = require('../src/services/students_auth_service');
const validateStudentRequest = require('../src/middlewares/students_auth_middleware')
=======
const { createStudentToken } = require('../src/services/users_auth_service');
const validateStudentRequest = require('../src/middlewares/auth_middleware')
>>>>>>> main

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

<<<<<<< HEAD
// Add this before all the test cases
let validToken; // Declare a variable to store the JWT

=======
beforeAll(() => {
  // Apply the middleware to the app
  app.use(validateStudentRequest);
});

// Add this before all the test cases
let validToken; // Declare a variable to store the JWT

>>>>>>> main
beforeAll(async () => {
  // Create a new student and save it to the database (use your Student model or database mock)
  const newStudent = new Student({
    _id: '64baa41f334238e44139660a',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'hashed_password',
    lessons: ["64bafbd999bdd75bc6046b6d"]
<<<<<<< HEAD
  });
  const savedStudent = await newStudent.save();

  // Create a valid JWT for the student and store it in the variable
  validToken = createStudentToken(savedStudent.student_id, savedStudent.email);
});

describe('updateStudent', () => {
  it('should update a student profile with a valid JWT', async () => {
    // Define the updated data for the student profile
    const updatedData = {
      _id: '64baa41f334238e44139660a',
      firstName: 'Johnathan',
      lastName: 'Dow',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      lessons: ["64bafbd999bdd75bc6046b6d"]
    };

    // Send the request to update the student profile with the valid JWT
    const response = await request(app)
      .put("/profile/student")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code and content
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(updatedData);
  });

  it('should return 404 if student not found', async () => {
    // Create a valid but non-existent student ID
    const nonExistentStudentID = 'non-existent-student-id';
    const validToken = createStudentToken(nonExistentStudentID, 'someemail@example.com');

    // Define the updated data for the student profile
    const updatedData = {
      firstName: 'Johnathan',
    };

    // Send the request to update the student profile with the valid JWT
    const response = await request(app)
      .put("/profile/student")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code
    expect(response.status).toBe(404);
=======
>>>>>>> main
  });
  const savedStudent = await newStudent.save();

  // Create a valid JWT for the student and store it in the variable
  validToken = createStudentToken(savedStudent.student_id, savedStudent.email);
});

<<<<<<< HEAD
// Apply the validateStudentRequest middleware after the route definitions
app.use(validateStudentRequest);
=======
describe('updateStudent', () => {
  it('should update a student profile with a valid JWT', async () => {
    // Define the updated data for the student profile
    const updatedData = {
      _id: '64baa41f334238e44139660a',
      firstName: 'Johnathan',
      lastName: 'Dow',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      lessons: ["64bafbd999bdd75bc6046b6d"]
    };

    // Send the request to update the student profile with the valid JWT
    const response = await request(app)
      .put("/profile/student")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code and content
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(updatedData);
  });

  it('should return 404 if student not found', async () => {
    // Create a valid but non-existent student ID
    const nonExistentStudentID = 'non-existent-student-id';
    const validToken = createStudentToken(nonExistentStudentID, 'someemail@example.com');

    // Define the updated data for the student profile
    const updatedData = {
      firstName: 'Johnathan',
    };

    // Send the request to update the student profile with the valid JWT
    const response = await request(app)
      .put("/profile/student")
      .set('Authorization', `Bearer ${validToken}`)
      .send(updatedData);

    // Check the response status code
    expect(response.status).toBe(404);
  });
});
>>>>>>> main
