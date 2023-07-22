const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    lessons: [{type: mongoose.Types.ObjectId, ref: 'Lesson'}]
})

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student
