const loginRouter = require('express').Router()
const _userServices = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) =>{
    const {username, password} = request.body
    const user = await _userServices.findOne({username})
    const passwordCorrect = user === null?false : bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect))
    {
        return response.status(401).json({error: "username or password incorrect"})
    }

    const userTokenFor = {
        id : user._id,
        username
    }

    const token = jwt.sign(userTokenFor, process.env.SECRET, {expiresIn: 60*60})
    response.status(201).json({token, username})
})


module.exports = loginRouter