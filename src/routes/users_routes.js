// import the Express module
const express = require('express');
const { signupStudent, loginStudent, getSpecificStudent, getAllStudents, updateStudent, deleteStudent } = require('../controllers/students_controller');
const { fieldValidation, signupValidation } = require('../middlewares/users_validation_middleware');
const { signupTeacher, loginTeacher, getSpecificTeacher, updateTeacher } = require('../controllers/teachers_controller');
const validateStudentRequest = require('../middlewares/students_auth_middleware');
const validateTeacherRequest = require('../middlewares/teachers_auth_middleware')

// Create the user router instance
const usersRouter = express.Router();

// Student routes

// Retrieve student sign up page
usersRouter.get("/signup/student", (request, response) => {
  return response.status(200).json({ Message: "This is the student signup page." })
})

// Sign up new student
usersRouter.post("/signup/student", fieldValidation, signupValidation,
  signupStudent)

// Retrieve student login page
usersRouter.get("/login/student", (request, response) => {
  return response.status(200).json({ Message: "This is the student login page." })
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

// Sign up new teacher (for testing purposes, internal use only)
usersRouter.post("/signup/teacher", fieldValidation, signupValidation,
  signupTeacher)

// Retrieve teacher login page
usersRouter.get("/login/teacher", (request, response) => {
  return response.status(200).json({ Message: "This is the teacher login page." }
  )
})

// Login existing teacher
usersRouter.post("/login/teacher", loginTeacher)

// View teacher profile
usersRouter.get("/profile/teacher", validateTeacherRequest, getSpecificTeacher)

// Edit teacher profile
usersRouter.put("/profile/teacher", validateTeacherRequest, updateTeacher)

module.exports = usersRouter