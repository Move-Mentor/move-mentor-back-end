const mongoose = require('mongoose')

const LessonSchema = mongoose.Schema({
    lessonName: {
      type: String,
      required: true
    },
    lessonDay: {
      type: String,
      required: true
    },
    lessonTime: {
      type: String,
      required: true,
    },
    moves: [{type: mongoose.Types.ObjectId, ref: 'Move'}],
})

const Lesson = mongoose.model('Lesson', LessonSchema)

module.exports = Lesson