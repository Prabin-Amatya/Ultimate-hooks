require("dotenv").config()
const personRouter = require('express').Router()
const _personServices = require('../models/person')
const jwt = require('jsonwebtoken')


personRouter.get('/', async (request, response) =>{
    const persons = await _personServices.find({})
    response.status(200).json(persons)
})

personRouter.post('/', async (request, response) =>{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id)
        return response.status.json({error: "Invalid Token"})
    const person = request.body
    const new_person = new _personServices(person)
    await new_person.save()
    response.status(201).json(new_person)
})

personRouter.put('/:id', async (request, response) =>{
    const { content } = request.body
    const modified_person = await _personServices.findByIdAndUpdate(request.params.id, {content}, {new: true}, {runValidators:true, context:'query'})
    response.status(201).json(modified_person)
})

module.exports = personRouter