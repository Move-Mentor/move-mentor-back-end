const Student = require('../models/students')
const Lesson = require('../models/lessons')
const bcrypt = require('bcrypt')
const { createStudentToken } = require('../services/users_auth_service')
const { response } = require('express')

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
    lessons: request.body.lessons // This reference works as long as the Lessons model as been imported into this file
  })

  try {
    // Check if email used to signup is already in use
    const existingStudent = await Student.findOne({email: request.body.email});
    if (existingStudent) {
      return response.status(409).json({Error: "Email is already registered."})
    }
    
    // Save new student to database
    await newStudent.save();

    // Generate student JWT
    const studentToken = createStudentToken(newStudent._id, newStudent.email)

    return response.status(201).json({
      email: newStudent.email,
      token: studentToken
    });
    } catch (error) {
    console.error(error);
    return response.json(error)
  }
}

// Existing student login
const loginStudent = async (request, response) => {
  // Find the student
  const existingStudent = await Student.findOne({email: request.body.email})

  // If the student email exists and they have a valid password return the student email and JWT
  if (existingStudent && bcrypt.compareSync(request.body.password, existingStudent.password)) {
    const studentToken = createStudentToken(existingStudent._id, existingStudent.email)

    return response.status(200).json({
      email: existingStudent.email,
      token: studentToken
    })
  
  // Else authentication has failed due to invalid or incorrect login details
  } else {
    return response.status(401).json({Error: "Authentication failed"})
  }
}

// Get a specific student based on their ID (currently for testing purposes)
// Additional auth required
const getSpecificStudent = async (request, response) => {
  try {
    // Retrieve the student id from the URL parameter
    const studentIdFromURL = request.params.studentId;

    // Retrieve the student id from the decoded student object
    const studentIdFromToken = request.validStudent.d;

    // Check the student id from URL and token match
    if (studentIdFromURL !== studentIdFromToken) {
      return response.status(403).json({Error: "Not authorised to view this profile."})
    }

    // Fetch the specific student from the database using the studentId parameter
    let student = await Student.findbyId(studentIdFromURL).populate('lessons');

    if (!student) {
      return response.status(404).json({Error: "Student not found."});
    }

    return response.status(200).send(student);

  } catch (error) {
    console.error(error);
    return response.json(error)
  }
}

// Get all students (for testing purposes)
const getAllStudents = async (request, response) => {
  // Return an array of database documents
  let allStudents = await Student.find();

  if (allStudents.length === 0) {
    return response.status(404).json({Error: "No students found."})
  } else {
    return response.status(200).send(allStudents);
  }
}

module.exports = { 
  signupStudent, 
  loginStudent, 
  getAllStudents, 
  getSpecificStudent }