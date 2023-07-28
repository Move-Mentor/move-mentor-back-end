const mongoose = require('mongoose');
const request = require('supertest');
const { app } = require('../src/server');
const Lesson = require('../src/models/lessons');

require("dotenv").config();

// Connect to the test database before each test
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/move_mentor_test");
});

// Close the database connection after each test
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("When retrieving a specific lesson...", () => {

  it("...should return the lesson data if it exists", async () => {
    // Create a lesson in the test database
    const testLesson = new Lesson({
      lessonName: "Intro To Pole",
	    lessonDay: "Monday",
	    lessonTime: "6:00pm",
	    moves: ["64bfce2454ae6f3e602ebc25"]
      });
      
      await Lesson.create(testLesson);

    const response = await request(app).get(`/lessons/${testLesson._id}`);
    expect(response.status).toBe(200);
    expect(response.body.lessonName).toBe("Intro To Pole")
    expect(response.body.lessonDay).toBe("Monday")
    expect(response.body.lessonTime).toBe("6:00pm")
  });

  it("...should return a 404 error if the lesson is not found", async () => {
    const invalidObjectId = "64bfd0c178bbd87588a0b545555";

    if (mongoose.Types.ObjectId.isValid(invalidObjectId)) {
      const response = await request(app).get("/lessons/64bfd0c178bbd87588a0b545555");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({Error: "Lesson not found."});
    }
  });
});