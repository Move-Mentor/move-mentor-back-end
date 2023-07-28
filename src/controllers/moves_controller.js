const Lesson = require('../models/lessons');
const Move = require('../models/moves')

// Get all moves
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

// // Get category by lesson
// const getCategoryLessons = async (request, response) => {
//   let categoryLessons = await Move.find()
//   .select("moveCategory")
//   .populate('lessons')

//   if (categoryLessons.length === 0) {
//     return response.status(404).json({Error: "No lessons found in this category."})
//   } else {
//     return response.status(200).send(categoryLessons);
//   }
// }


// Get a specific move
const getSpecificMove = async (request, response) => {
  // Fetch the move by id and list associated lessons
  let move = await Lesson.findById(request.params.id).populate('lessons')
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
  // getCategoryLessons,
  getSpecificMove
}