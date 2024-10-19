const userRouter = require('express').Router()
const _userServices = require('../models/user')
const bcrypt = require('bcryptjs')

userRouter.get('/', async (request, response) =>{
    const users = await _userServices.find({})
    response.status(200).json(users)
})

userRouter.post('/', async (request, response) =>{
    const {username, password} = request.body
    const passwordStrong = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z\d]).{8,}$/.test(password)
    if(!passwordStrong) 
        return response.status(400).json({error: "password is not strong enough"})
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const new_user = new _userServices(
        {username, passwordHash}
    )

    await new_user.save()
    response.status(201).json(new_user)
})

userRouter.put('/:id', async (request, response) =>{
    const { content } = request.body
    const modified_user = await _userServices.findByIdAndUpdate(request.params.id, {content}, {new: true}, {runValidators:true, context:'query'})
    response.status(201).json(modified_user)
})

module.exports = userRouter