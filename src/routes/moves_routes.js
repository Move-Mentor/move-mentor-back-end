// import the Express module
const express = require('express');
const { getAllMoves, getSpecificMove, getCategoryMoves, getMoveCategories } = require('../controllers/moves_controller');

// Create the moves router instance
const movesRouter = express.Router();

// Retrieve a list of all moves (for testing purposes)
movesRouter.get("/all", getAllMoves)

// Retrieve a list of all move categories
movesRouter.get("/categories", getMoveCategories)

// Retrieve moves within a category
movesRouter.get("/categories/:category", getCategoryMoves)

// Retrieve a specific move
movesRouter.get("/:id", getSpecificMove)


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