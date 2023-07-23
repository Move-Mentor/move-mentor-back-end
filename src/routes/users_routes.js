// import the Express module
const express = require('express');
const { signupStudent, loginStudent, getSpecificStudent, getAllStudents } = require('../controllers/students_controller');
const { fieldValidation, signupValidation } = require('../services/users_validation_service');

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

// View student profile (for testing purposes). 
//Additional auth required for this route - only an authenticated student can view their profile.
usersRouter.get("/profile/student/:studentId", getSpecificStudent)

// List all students (for testing purposes)
usersRouter.get("/student/all", getAllStudents)

// Edit student profile
// Additional auth required for this route - only an authenticated student can edit their profile.
usersRouter.put("/profile/student/:studentid", (request, response) => {
  response.json(
    {message: "this is to edit a student profile"}
  )
}) 

// Delete student profile
// Additional auth required for this route - only an authenticated student can delete their profile.
usersRouter.delete("/profile/student/:studentid", (request, response) => {
  response.json(
    {message: "this is to delete a student profile"}
  )
}) 


// Teacher routes
// Functionality still needs to be developed for these routes

// Login existing teacher
// Additional auth required for this route - only an existing teacher can login
usersRouter.post("/login/teacher", (request, response) => {
  response.json(
    {message: "this is the teacher login"}
  )
}) 

// View teacher profile
//Additional auth required for this route - only an authenticated teacher can view their profile.
usersRouter.get("/profile/teacher/:id", (request, response) => {
  response.json(
    {message: "this is to view a teacher profile"}
  )
}) 

// Edit teacher profile
// Additional auth required for this route - only an authenticated teacher can edit their profile.
usersRouter.put("/profile/teacher/:id", (request, response) => {
  response.json(
    {message: "this is to edit a teacher profile"}
  )
}) 

module.exports = usersRouter