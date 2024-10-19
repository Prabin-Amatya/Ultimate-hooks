const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, "notes field cannot be empty"]
    }
})

noteSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('notes', noteSchema)