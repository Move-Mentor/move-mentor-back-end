const Teacher = require('../models/teachers')
const Lesson = require('../models/lessons')
const bcrypt = require('bcrypt')
const { createTeacherToken } = require('../services/users_auth_service')

// Existing teacher login
const loginTeacher = async (request, response) => {
  // Find the teacher
  const existingTeacher = await Teacher.findOne({email: request.body.email})

  // If the teacher email exists and they have a valid password return the teacher email and JWT
  if (existingTeacher && existingTeacher.password) {
    const teacherToken = createTeacherToken(existingTeacher._id, existingTeacher.email)

    return response.status(200).json({
      email: existingTeacher.email,
      token: teacherToken
    })
  
  // Else authentication has failed due to invalid or incorrect login details
  } else {
    return response.status(401).json({Error: "Authentication failed"})
  }
}

// Get a specific teacher based on their ID (currently for testing purposes)
// Additional auth required
const getSpecificTeacher = async (request, response) => {

  // Retrieve the teacherId from the URL parameter
  const teacherId = request.params.teacherId;
  
  // Fetch the specific teacher from the database using the teacherId parameter
  let teacher = await Teacher.findById(request.params.teacherId).populate('lessons');

  response.send(teacher)
}

module.exports = { loginTeacher, getSpecificTeacher }