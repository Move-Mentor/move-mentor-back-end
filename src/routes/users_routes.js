// import the Express module
const express = require('express')

// Create the user router instance
const usersRouter = express.Router();

// Student routes

// Sign up new student
usersRouter.post("/signup/student", signupStudent)

// Login existing student
usersRouter.post("/login/student", loginStudent)

// View student profile (for testing purposes). 
//Additional auth required for this route - only an authenticated student can view their profile.
usersRouter.get("/profile/student/:id", getSpecificStudent)

// List all students (for testing purposes)
usersRouter.get("/student/all", getAllStudents)

// Edit student profile
usersRouter.put("/profile/student/:id", (request, response) => {
  response.json(
    {message: "this is to edit a student profile"}
  )
}) 

// Delete student profile
usersRouter.delete("/profile/student/:id", (request, response) => {
  // Must include authorisation because only a student can delete their profile
  response.json(
    {message: "this is to delete a profile"}
  )
}) 



// Teacher routes

// Existing teacher login
usersRouter.post("/login/teacher", (request, response) => {
  response.json(
    {message: "this is the teacher login"}
  )
}) 

// View teacher profile
usersRouter.get("/profile/teacher/:id", (request, response) => {
  response.json(
    {message: "this is to view a teacher profile"}
  )
}) 

// Edit user profile
usersRouter.put("/profile/:userId", (request, response) => {
  response.json(
    {message: "this is to edit a profile"}
  )
}) 

// Delete user profile
usersRouter.delete("/profile/:userId", (request, response) => {
  // Must include authorisation because only a student can delete their profile
  response.json(
    {message: "this is to delete a profile"}
  )
}) 

module.exports = usersRouter