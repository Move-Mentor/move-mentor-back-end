const Teacher = require('../models/teachers')
const Lesson = require('../models/lessons')
const bcrypt = require('bcrypt')
const { createTeacherToken } = require('../services/teachers_auth_service')

// Existing teacher login
const loginTeacher = async (request, response) => {
  // Find the teacher
  const existingTeacher = await Teacher.findOne({ email: request.body.email })

  // If the teacher email exists and they have a valid password return the teacher email and JWT
  if (existingTeacher && bcrypt.compareSync(request.body.password, existingTeacher.password)) {
    const teacherToken = createTeacherToken(existingTeacher._id, existingTeacher.email)

    return response.status(200).json({
      email: existingTeacher.email,
      token: teacherToken
    })

    // Else authentication has failed due to invalid or incorrect login details
  } else {
    return response.status(401).json({ Error: "Authentication failed" })
  }
}

// Get a specific teacher with their lessons
const getSpecificTeacher = async (request, response) => {
  try {
    // Fetch a specific teacher with a valid JWT from the database using their id
    let teacher = await Teacher.findById(request.validTeacher.teacher_id).populate('lessons');

    if (!teacher) {
      return response.status(404).json({ Error: "Teacher not found." });
    }

    return response.status(200).send(teacher);

  } catch (error) {
    console.error(error);
    return response.json(error)
  }
}

// Update a teacher profile
const updateTeacher = async (request, response) => {
  // Fetch teacher with a valid JWT from the database and update and save the edited profile
  let updatedTeacher = await Teacher.findByIdAndUpdate(request.validTeacher.teacher_id, request.body, { new: true })
    .catch(error => {
      console.log("Some error occurred while accessing data:\n" + error)
    })

  if (updatedTeacher) {
    return response.status(201).send(updatedTeacher)
  } else {
    return response.status(404).json({ Error: "Teacher not found." })
  }
}

module.exports = { loginTeacher, getSpecificTeacher, updateTeacher }