const { response } = require('express')
const jwt = require('jsonwebtoken')

// Create the teacher JWT
const createTeacherToken = (teacher_id, email) => {
  return jwt.sign(
    // Create the token identity
    {
      teacher_id: teacher_id,
      email: email
    },

    // Set the secret key
    process.env.TEACHER_SECRET_KEY,

    // Set the token expiry date
    {expiresIn: "1 day"}
  )
}

// Verify the teacher JWT
const verifyTeacherToken = (teacherToken) => {
  try {
    return jwt.verify(teacherToken, process.env.TEACHER_SECRET_KEY)
  } catch (error) {
    throw new Error("Invalid token.")
  }
}

module.exports = { 
  createTeacherToken, 
  verifyTeacherToken 
}