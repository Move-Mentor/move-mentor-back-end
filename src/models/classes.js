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
})

const Class = mongoose.model('Class', ClassSchema)

module.exports = Class