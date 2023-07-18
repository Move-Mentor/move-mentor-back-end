// import the Express module
const express = require('express')

// Create the moves router instance
const movesRouter = express.Router();

// Retrieve a list of all move categories
movesRouter.get("/categories/all", (request, response) => {
  response.json(
    {message: "this is a list of all move categories"}
  )
})

// Retrieve a list of all moves in a specific category
movesRouter.get("/categories/:categoryId", (request, response) => {
  response.json(
    {message: "this is a list of all moves assigned to a category"}
  )
})


// Retrieve and display a specific move assigned to a category
movesRouter.get("/categories/:categoryId/:moveId", (request, response) => {
   // Must include an authorisation check to activate and display the 'add to class' button only for teachers
  response.json(
    {message: "this is the details of a specific move assigned to a category"}
  )
})


// Add a specific move from a class
movesRouter.put("/categories/:categoryId/:moveId", (request, response) => {
  // Must include an authorisation check to activate and display this method only for teachers
  response.json(
    {message: "this adds a move to a class"}
  )
}) 

module.exports = movesRouter