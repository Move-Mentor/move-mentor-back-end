// import the Express module
const express = require('express')

// Create the user router instance
const optionsRouter = express.Router();

// View options ccards
optionsRouter.get("/", (request, response) => {
  // Must include authorisation check because the cards displayed to students and teachers differ
  response.json(
    {message: "this is to view the three option cards"}
  )
}) 

module.exports = optionsRouter