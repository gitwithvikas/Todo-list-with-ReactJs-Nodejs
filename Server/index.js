
const express = require('express')

const server = express()

const port = 8000

const cors = require('cors')
const todolist = require('./routers/todolist')


server.use(cors())
server.use(express.json())




server.use('/todo/',todolist)


server.get('/',(req,res)=>{
    res.send('Welcome to My Todo List')
})

server.listen(port, ()=>{
    console.log('Server Listen on',port)
})