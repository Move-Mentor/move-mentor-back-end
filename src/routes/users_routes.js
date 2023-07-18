// import the Express module
const express = require('express')

// Create the user router instance
const usersRouter = express.Router();

// New student sign up
usersRouter.post("/signup/student", (request, response) => {
  response.json(
    {message: "this is the student signup"}
  )
}) 

// Existing student login
usersRouter.post("/login/student", (request, response) => {
  response.json(
    {message: "this is the student login"}
  )
}) 

// Existing teacher login
usersRouter.post("/login/teacher", (request, response) => {
  response.json(
    {message: "this is the teacher login"}
  )
}) 

// View user profile
usersRouter.get("/profile/:userId", (request, response) => {
  // Must include authorisation because the profile functions available to students and teachers differ
  response.json(
    {message: "this is to view a profile"}
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