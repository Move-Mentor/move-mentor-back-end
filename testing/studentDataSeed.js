const mongoose = require('mongoose');
const Student = require('../src/models/students');
const Lesson = require('../src/models/lessons');

// Sample student data to be seeded
const seedStudentData = async (request, response) => {
  let seededStudent = new Student({
    firstName: "Shelley",
    lastName: "student",
    email: "seededstudent@email.com",
    password: "seedpassword",
    lessons: ["64bd5c8bb3a65f2dbf60295f"]
  })
  
  await seededStudent.save();
}

module.exports = { seedStudentData };