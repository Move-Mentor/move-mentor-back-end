const mongoose = require('mongoose')

const TeacherSchema = mongoose.Schema({
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
    admin: Boolean,
    classes: [{type: mongoose.Types.ObjectId, ref: 'Class'}]
})

const Teacher = mongoose.model('Teacher', TeacherSchema)

module.exports = Teacher
