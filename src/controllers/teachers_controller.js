const Teacher = require('../models/teachers')
const Lesson = require('../models/lessons')
const bcrypt = require('bcrypt')
const { createTeacherToken } = require('../services/teachers_auth_service')

// New teacher sign up
// NOTE: this route will only be used internally to create teachers
const signupTeacher = async (request, response) => {

  // New teacher values to be entered and saved to database
  let newTeacher = new Teacher({
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
    const existingTeacher = await Teacher.findOne({ email: request.body.email });
    if (existingTeacher) {
      return response.status(409).json({ Error: "Email is already registered." })
    }

    // Save new Teacher to database
    await newTeacher.save();

    // Generate Teacher JWT
    const teacherToken = createTeacherToken(newTeacher._id, newTeacher.email)

    return response.status(201).json({
      email: newTeacher.email,
      token: teacherToken
    });
  } catch (error) {
    console.error(error);
    return response.json(error)
  }
}

// Existing teacher login
const loginTeacher = async (request, response) => {
  // Find the teacher
  const existingTeacher = await Teacher.findOne({ email: request.body.email })

  // If the teacher email exists and they have a valid password return the teacher email and JWT
  if (existingTeacher && existingTeacher.password) {
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

// Get a specific teacher
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

module.exports = { signupTeacher, loginTeacher, getSpecificTeacher, updateTeacher }