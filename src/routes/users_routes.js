// import the Express module
const express = require('express');
const { signupStudent, loginStudent, getSpecificStudent, getAllStudents, updateStudent, deleteStudent } = require('../controllers/students_controller');
const { fieldValidation, signupValidation } = require('../middlewares/users_validation_middleware');
const { loginTeacher, getSpecificTeacher } = require('../controllers/teachers_controller');
const validateStudentRequest = require('../middlewares/auth_middleware');

// Create the user router instance
const usersRouter = express.Router();

// Student routes

// Retrieve student sign up page
usersRouter.get("/signup/student", (request, response) => {
  return response.status(200).json({Message: "This is the student signup page."})
})

// Sign up new student
usersRouter.post("/signup/student", fieldValidation, signupValidation,
  signupStudent)

// Retrieve student login page
usersRouter.get("/login/student", (request, response) => {
  return response.status(200).json({Message: "This is the student login page."})
})

// Login existing student
usersRouter.post("/login/student", loginStudent)

// View student profile, only accessible with a valid student token
usersRouter.get("/profile/student", validateStudentRequest, getSpecificStudent)

// List all students (for testing purposes, can only access with a valid student token)
usersRouter.get("/student/all", validateStudentRequest, getAllStudents)


// Edit student profile
usersRouter.put("/profile/student", validateStudentRequest, updateStudent)

// Delete student profile
usersRouter.delete("/profile/student", validateStudentRequest, deleteStudent) 


// Teacher routes

// Retrieve teacher login page
usersRouter.get("/login/teacher", (request, response) => {
  return response.status(200).json({Message: "This is the teacher login page."}
  )
}) 


// Login existing teacher
usersRouter.post("/login/teacher", loginTeacher)

// View teacher profile
//Additional auth required for this route - only an authenticated teacher can view their profile.
usersRouter.get("/profile/teacher/:teacherId", getSpecificTeacher)

// Edit teacher profile
// Additional auth required for this route - only an authenticated teacher can edit their profile.
usersRouter.put("/profile/teacher/:id", (request, response) => {
  response.json(
    {message: "this is to edit a teacher profile"}
  )
}) 

module.exports = usersRouter