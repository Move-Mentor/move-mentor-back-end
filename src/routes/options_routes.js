// import the Express module
const express = require('express')

// Create the user router instance
const optionsRouter = express.Router();

// View student options 
optionsRouter.get("/student", (request, response) => {
  response.json(
    {Message: "This is to view the student option cards: Class Moves, Profile, All Moves"}
  )
}) 

// View options ccards
optionsRouter.get("/teacher", (request, response) => {
  // Must include authorisation check because the cards displayed to students and teachers differ
  response.json(
    {Message: "This is to view the teacher option cards: Lessons, Profile, All Moves"}
  )
}) 

module.exports = optionsRouter