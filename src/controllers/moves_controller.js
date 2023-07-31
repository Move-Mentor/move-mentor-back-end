const Move = require('../models/moves')


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
const getMoveCategories = async (request, response) => {
  let moveCategories = await Move.find().select("moveCategory")

  if (moveCategories.length === 0) {
    return response.status(404).json({Error: "No categories found."})
  } else {
    return response.status(200).send(moveCategories);
  }
}

// Get all moves within a category
const getCategoryMoves = async (request, response) => {
  const category = request.params.category
  let categoryMoves = await Move.find({moveCategory: category})

  if (categoryMoves.length === 0) {
    return response.status(404).json({Error: "No moves found in this category."})
  } else {
    return response.status(200).send(categoryMoves);
  }
}

// Get a specific move
const getSpecificMove = async (request, response) => {
  // Fetch the move by id
  let move = await Move.findById(request.params.id)
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
  getMoveCategories,
  getCategoryMoves,
  getSpecificMove
}