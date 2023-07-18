const mongoose = require('mongoose')

const ClassSchema = mongoose.Schema({
    className: {
      type: String,
      required: true
    },
    classDay: {
      type: String,
      required: true
    },
    classTime: {
      type: String,
      required: true,
    },
    students: [{type: mongoose.Types.ObjectId, ref: 'Student'}],
    teachers: [{type: mongoose.Types.ObjectId, ref: 'Teacher'}],
    moves: [{type: mongoose.Types.ObjectId, ref: 'Move'}],
})

const Class = mongoose.model('Class', ClassSchema)

module.exports = Class