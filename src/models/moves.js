const mongoose = require('mongoose')

const MoveSchema = mongoose.Schema({
    moveName: {
      type: String,
      required: true,
      unique: true
    },
    moveCategory: {
      type: String,
      required: true
    },
    moveAlternativeName: {
      type: String,
    }
})

const Move = mongoose.model('Move', MoveSchema)

module.exports = Move