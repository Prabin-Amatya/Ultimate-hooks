require("dotenv").config()
const noteRouter = require('express').Router()
const _noteServices = require('../models/note')
const jwt = require('jsonwebtoken')

noteRouter.get('/', async (request, response) =>{
    const notes = await _noteServices.find({})
    response.status(200).json(notes)
})

noteRouter.post('/', async (request, response) =>{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id)
        return response.status.json({error: "Invalid Token"})
    const note = request.body
    const new_note = new _noteServices(note)
    await new_note.save()
    response.status(201).json(new_note)
})

noteRouter.put('/:id', async (request, response) =>{
    const { content } = request.body
    const modified_note = await _noteServices.findByIdAndUpdate(request.params.id, {content}, {new: true}, {runValidators:true, context:'query'})
    response.status(201).json(modified_note)
})

module.exports = noteRouter