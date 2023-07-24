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

// Import the Student model after connecting to the test database
const Student = require('../src/models/students');

// Update a student profile route handler
const updateStudent = require('../src/controllers/students_controller');

describe('Test updateStudent route', () => {
  beforeEach(async () => {
    // Seed data before each test
    const studentData = [
      {
        _id: '64baa41f334238e44139660a',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'hashed_password',
        lessons: ["64bafbd999bdd75bc6046b6d"],
      },
      {
        _id: '64bbe166979e8909af626a36',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: 'hashed_password',
        lessons: ["64bafa4f8eb4e8258d9ac838"],
      }
    ];

    // Seed the student data to the test database
    await Student.insertMany(studentData);
  });

// Test successful student update
test('Updates a student profile successfully', async () => {
  const validRequest = {
    validStudent: {
      student_id: '64baa41f334238e44139660a',
    },
    body: {
      // Provide valid data for updating the student profile
      firstName: 'Johnathan',
      lastName: 'Doe',
      email: 'johnathan.doe@example.com',
      password: 'updated_password',
      lessons: ["64bafbd999bdd75bc6046b6d"],
    },
  };

  // Use supertest to make the request to the app
  const response = await request(app).put("/profile/student").send(validRequest);

  // Assert that the response status is 201 and contains the updated student object
  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    _id: '64baa41f334238e44139660a',
    firstName: 'Johnathan',
    lastName: 'Doe',
    email: 'johnathan.doe@example.com',
    password: 'updated_password',
    lessons: ['64bafbd999bdd75bc6046b6d'],
  });
});

// Test student not found
test('Returns 404 when student is not found', async () => {
  const invalidRequest = {
    validStudent: {
      student_id: 'non_existent_student_id',
    },
    body: {
      // Provide valid data for updating the student profile
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      lessons: ['64bafbd999bdd75bc6046b6d'],
    },
  };

  // Use supertest to make the request to the app
  const response = await request(app).put('/update-student').send(invalidRequest);

  // Assert that the response status is 404 and contains the error message
  expect(response.status).toBe(404);
  expect(response.body).toEqual({ Error: 'Student not found.' });
});

// Test error during database access
test('Handles error during database access', async () => {
  const validRequest = {
    validStudent: {
      student_id: '64baa41f334238e44139660a',
    },
    body: {
      // Provide valid data for updating the student profile
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      lessons: ['64bafbd999bdd75bc6046b6d'],
    },
  };

  // Mock the findByIdAndUpdate method of the Student model to throw an error
  Student.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Some database error'));

  // Use supertest to make the request to the app
  const response = await request(app).put('/update-student').send(validRequest);

  // Assert that the response status is 500 and contains the error message
  expect(response.status).toBe(500);
  expect(response.body).toEqual({ Error: 'Internal server error.' });
});

// Test validation of request data
test('Handles invalid request data', async () => {
  const invalidRequest = {
    validStudent: {
      student_id: '64baa41f334238e44139660a',
    },
    body: {
      // Provide invalid or missing data for updating the student profile
      // For example, omitting the "firstName" property
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'hashed_password',
      lessons: ['64bafbd999bdd75bc6046b6d'],
    },
  };

  // Use supertest to make the request to the app
  const response = await request(app).put('/update-student').send(invalidRequest);

  // Assert that the response status is 400 and contains the error message
  expect(response.status).toBe(400);
  expect(response.body).toEqual({ Error: 'Bad request.' });
});
});
