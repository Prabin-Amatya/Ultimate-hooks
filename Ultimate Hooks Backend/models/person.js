const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name field cannot be empty"]
    },

    number: {
        type: String,
        required: [true, "number field cannot be empty"],
        validate: {
            validator: function(v){
                return /\d{10}/.test(v)
            },
            message: props => `${props.value} is not a valid number` 
        }
    }
})

noteSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('person', noteSchema)