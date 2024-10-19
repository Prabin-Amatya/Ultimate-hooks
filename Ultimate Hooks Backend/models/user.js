const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username field cannot be empty"],
        minLength: [3, 'Username needs more than 3 characters']
    },

    passwordHash: {
        type: String,
        required: [true, "password field cannot be empty"],
    }
})

userSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('users', userSchema)