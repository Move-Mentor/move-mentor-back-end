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
    classes: [{type: mongoose.Types.ObjectId, ref: 'Class'}]
    
})

const Move = mongoose.model('Move', MoveSchema)

module.exports = Move