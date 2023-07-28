const Move = require('../models/moves')
const Lesson = require('../models/lessons');


// Get all moves (for testing purposes)
const getAllMoves = async (request, response) => {
  let allMoves = await Move.find()

  if (allMoves.length === 0) {
    return response.status(404).json({Error: "No moves found."})
  } else {
    return response.status(200).send(allMoves);
  }
}

// Get all move categories
const getAllMoveCategories = async (request, response) => {
  let allMoveCategories = await Move.find().select("moveCategory")

  if (allMoveCategories.length === 0) {
    return response.status(404).json({Error: "No categories found."})
  } else {
    return response.status(200).send(allMoveCategories);
  }
}

// Get all moves within a category
const getAllCategoryMoves = async (request, response) => {
  const moveCategory = request.params.moveCategory
  let allCategoryMoves = await Move.find(moveCategory)

  if (allCategoryMoves.length === 0) {
    return response.status(404).json({Error: "No moves found in this category."})
  } else {
    return response.status(200).send(allCategoryMoves);
  }
}

// Get a specific move
const getSpecificMove = async (request, response) => {
  // Fetch the move by id and list associated lessons
  let move = await Move.findById(request.params.id).populate('lessons')
    .catch(error => {
      console.log("Some error occurred while accessing data:\n" + error)
      response.status(404)
    })
  if (move) {
    response.status(200).json(move)
  } else {
    response.status(404).json({Error: "Move not found."})
  }
}

module.exports = {
  getAllMoves,
  getAllMoveCategories,
  getAllCategoryMoves,
  getSpecificMove
}