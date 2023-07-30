// import the Express module
const express = require('express')

// Create the user router instance
const optionsRouter = express.Router();

// View options cards 
optionsRouter.get("/", (request, response) => {
  response.json(
    {Message: "This is to view the lessons, profile and moves options cards."}
  )
}) 

module.exports = optionsRouter