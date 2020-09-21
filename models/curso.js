const mongoose = require('mongoose')

const cursoSchema = new mongoose.Schema({
    userTitle: {
        type: String,
        required: true
    },
    userText: {
        type: String,
        required: true
    },
    userDate: {
        type: Date,
        required: true,
        default: Date.now
        
    }
})

module.exports = mongoose.model('Curso', cursoSchema)