const Student = require('../models/students')
const Lesson = require('../models/lessons')
const bcrypt = require('bcrypt')
const { createStudentToken } = require('../services/users_auth_service')

// New student sign up
const signupStudent = async (request, response) => {
 
  // New student values to be entered and saved to database
  let newStudent = new Student({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    // Hashing and salting of password for additional security
    password: bcrypt.hashSync(
      request.body.password, 
      bcrypt.genSaltSync(10)
    ),
    lessons: request.body.lessons
  })

  await newStudent.save()
    .catch(error => {
      console.log(error.errors)
      // Error handling: try catch block OR middleware... email not unique, password not longer than 8 characters, required fields not entered.
    })
  
  // Generate student JWT
  const studentToken = createStudentToken(newStudent._id, newStudent.email)

  response.json({
    email: newStudent.email,
    token: studentToken
  })
}

// Existing student login
const loginStudent = async (request, response) => {
  // Find the student
  const existingStudent = await Student.findOne({email: request.body.email})

  // If the student email exists and they have a valid password return the student email and JWT
  if (existingStudent && bcrypt.compareSync(request.body.password, existingStudent.password)) {
    const studentToken = createStudentToken(existingStudent._id, existingStudent.email)

    response.json({
      email: existingStudent.email,
      token: studentToken
    })
  
  // Else send an error message to say authentication failed 
  } else {
    response.json({
      error: "authentication failed"
    })
  }
}

// Get a specific student based on their ID (currently for testing purposes)
// Additional auth required
const getSpecificStudent = async (request, response) => {

  // Retrieve the studentId from the URL parameter
  const studentId = request.params.studentId;
  
  // Fetch the specific student from the database using the studentId parameter
  let student = await Student.findById(request.params.studentId).populate('lessons');

  response.send(student)
}

// Get all students (for testing purposes)
const getAllStudents = async (request, response) => {
  // Return an array of database documents
  let allStudents = await Student.find();

  response.send(allStudents)
}

module.exports = { signupStudent, loginStudent, getAllStudents, getSpecificStudent }