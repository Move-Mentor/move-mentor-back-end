// import the Express module
const express = require('express');
const { getAllMoves, getAllMoveCategories, getSpecificMove, getCategoryLessons } = require('../controllers/moves_controller');

// Create the moves router instance
const movesRouter = express.Router();

// Retrieve a list of all moves
movesRouter.get("/all", getAllMoves)

// Retrieve a list of all move categories
movesRouter.get("/categories", getAllMoveCategories)

// Retrieve a list of lessons in a specific category
movesRouter.get("/categories/lessons", getCategoryLessons)

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