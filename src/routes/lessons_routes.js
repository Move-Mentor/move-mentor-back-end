// import the Express module
const express = require('express')

// Create the lessons router instance
const lessonsRouter = express.Router();

// Retrieve a list of all lessons
lessonsRouter.get("/all", (request, response) => {
  response.json(
    {message: "this is a list of all lessons"}
  )
})

// Retrieve a specific lesson and display a list of moves assigned to the lesson
lessonsRouter.get("/:lessonId", (request, response) => {
  // The lesson id is determined by the profile id. A teacher profile is connected to all lessons, while a student profile is only connected to one lesson.
  response.json(
    {message: "this is the list of moves assigned to a lesson"}
  )
}) 

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