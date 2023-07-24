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
    password: bcrypt.hashSync( // Hashing and salting of password for additional security
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
  // Find the student based on their email
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

// Get a specific student
const getSpecificStudent = async (request, response) => {
  try {
    // Fetch a specific student with a valid JWT from the database using their id
    let student = await Student.findById(request.validStudent.student_id).populate('lessons');

    if (!student) {
      return response.status(404).json({Error: "Student not found."});
    }

    return response.status(200).send(student);

  } catch (error) {
    console.error(error);
    return response.json(error)
  }
}

// Update a student profile
const updateStudent = async (request, response) => {
  // Fetch student with a valid JWT from the database and update and save the edited profile
  let updatedStudent = await Student.findByIdAndUpdate(request.validStudent.student_id, request.body, {new: true})
    .catch(error => {
      console.log("Some error occurred while accessing data:\n" + error)
    })

  if (updatedStudent) {
    return response.status(201).send(updatedStudent)
  } else {
    return response.status(404).json({Error: "Student not found."})
  }
}

// Delete a student profile
const deleteStudent = async (request, response) => {
  // Fetch student with a valid JWT from the database and delete the profile
  let deletedStudent = await Student.findByIdAndDelete(request.validStudent.student_id)
    .catch(error => {
      console.log("Some error occurred while accessing data:\n" + error)
    })
  
  if (deletedStudent) {
    response.status(200).json({Message: "Student deleted."})
  } else {
    response.status(404).json({Error: "Student not found."})
  }
}

module.exports = { 
  signupStudent, 
  loginStudent, 
  getAllStudents, 
  getSpecificStudent,
  updateStudent,
  deleteStudent }