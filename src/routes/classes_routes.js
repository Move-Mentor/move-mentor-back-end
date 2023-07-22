// import the Express module
const express = require('express')

// Create the classes router instance
const classesRouter = express.Router();

// Retrieve a list of all classes
classesRouter.get("/all", (request, response) => {
  response.json(
    {message: "this is a list of all classes"}
  )
})

// Retrieve a specific class and display a list of moves assigned to the class
classesRouter.get("/:classId", (request, response) => {
  // The class id is determined by the profile id. A teacher profile is connected to all classes, while a student profile is only connected to one class.
  response.json(
    {message: "this is the list of moves assigned to a class"}
  )
}) 

// Retrieve and display a specific move assigned to a class
classesRouter.get("/:classId/:moveId", (request, response) => {
  response.json(
    {message: "this is the details of a specific move assigned to a class"}
  )
}) 

// Delete a specific move from a class
classesRouter.delete("/:classId/:moveId", (request, response) => {
  // Must include an authorisation check to activate and display this method only for teachers
  response.json(
    {message: "this deletes a move from a class"}
  )
}) 

module.exports = classesRouter