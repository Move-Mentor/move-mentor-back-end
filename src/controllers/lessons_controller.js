const Lesson = require('../models/lessons')
const Move = require('../models/moves')

// Get all lessons (for testing purposes)
const getAllLessons = async (request, response) => {
  // Return an array of database documents
  let allLessons = await Lesson.find().populate('moves');

  if (allLessons.length === 0) {
    return response.status(404).json({Error: "No lessons found."})
  } else {
    return response.status(200).send(allLessons);
  }
}

// Get teacher's and student's lesson/s
// This function already exists in their respective controllers - getSpecificTeacher & getSpecifiStudent
// It retrieves a teacher or student based on their ID and valid JWT and sends their data along with the lesson/s attached to their profile

// Get lesson moves
const getSpecificLesson = async (request, response) => {
    // Fetch the lesson by id and list associated moves
    let lesson = await Lesson.findById(request.params.id).populate('moves')
      .catch(error => {
        console.log("Some error occurred while accessing data:\n" + error)
      })
    if (lesson) {
      return response.status(200).json(lesson)
    } else {
      return response.status(404).json({Error: "Lesson not found."})
    }
}

// Update a lesson by either adding a move, or deleting a move
const updateLesson = async (request, response) => {
    // Fetch the lesson and update the lesson body
    let updatedLesson = await Lesson.findByIdAndUpdate(request.params.id, request.body, {new: true}).populate('moves')
      .catch(error => {
        console.log("Some error occurred while accessing data:\n" + error)
      })
    
    if (updatedLesson) {
      return response.status(201).send(updatedLesson)
    } else {
      return response.status(404).json({Error: "Lesson not found."})
    }
  }

module.exports = { 
  getAllLessons, 
  getSpecificLesson, 
  updateLesson 
}