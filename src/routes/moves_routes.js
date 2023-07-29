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

module.exports = movesRouter