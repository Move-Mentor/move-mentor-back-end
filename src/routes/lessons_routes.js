// import the Express module
const express = require('express');
const { getAllLessons, getSpecificLesson, updateLesson } = require('../controllers/lessons_controller');
const validateTeacherRequest = require('../middlewares/teachers_auth_middleware')

// Create the lessons router instance
const lessonsRouter = express.Router();

// Retrieve a list of all lessons (for testing purposes)
lessonsRouter.get("/all", getAllLessons)

// Retrieve a specific lesson and display a list of moves assigned to the lesson
lessonsRouter.get("/:id", getSpecificLesson) 

// Add a move to a lesson
lessonsRouter.put("/:id", validateTeacherRequest, updateLesson) 

// Retrieve and display a specific move assigned to a lesson
lessonsRouter.get("/:lessonId/:moveId", (request, response) => {
  response.json(
    {message: "this is the details of a specific move assigned to a lesson"}
  )
}) 

// Delete a specific move from a lesson
lessonsRouter.delete("/:lessonId/:moveId", (request, response) => {
  // Must include an authorisation check to activate and display this method only for teachers
  response.json(
    {message: "this deletes a move from a lesson"}
  )
}) 

module.exports = lessonsRouter