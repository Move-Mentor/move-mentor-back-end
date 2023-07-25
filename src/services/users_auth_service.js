const jwt = require('jsonwebtoken')

// Create the student JWT
const createStudentToken = (student_id, email) => {
  return jwt.sign(
    // Create the token identity
    {
      student_id: student_id,
      email: email
    },

    // Set the secret key
    process.env.STUDENT_SECRET_KEY,

    // Set the token expiry date
    {expiresIn: "1 day"}
  )
}


// Verify the student JWT
const verifyStudentToken = (studentToken) => {
  try {
    return jwt.verify(studentToken, process.env.STUDENT_SECRET_KEY)
  } catch (error) {
    throw new Error("Invalid token")
  }
}

// Create the teacher JWT (to be developed)
// const createTeacherToken = (teacher_id, email)


module.exports = { createStudentToken, verifyStudentToken }