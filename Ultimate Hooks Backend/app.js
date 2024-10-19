require('express-async-errors')
const express = require('express')
const cors = require('cors')

const userRouter = require('./controller/userController')
const noteRouter = require('./controller/noteController')
const personRouter = require('./controller/personController')
const loginRouter = require('./controller/loginController')

const middleware = require('./utils/middleware')

const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
.then(result =>{
    console.log('Connected to database succesfully')})
.catch(error =>{
    console.log(error)
})

const app = express()

app.use(cors())
app.use(express.json())

app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/note', noteRouter)
app.use('/api/person', personRouter)
app.use('/api/user', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app
