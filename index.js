// implement your API here
const express = require('express')
const db = require('./data/db.js')
const server = express()
const port = 8000


server.use(express.json())

// REQUEST HANDLERS
// get request to '/' on localhost:8000
server.get('/users', (req, res) => {
    db.find()
    .then(users => res.json(users))
    .catch(error => {
        console.log('error', error)
        res.json({error: 'failed to get users'})
    })
})

// POST
server.post('/users', (req, res) => {
    const userInfo = req.body

    db.insert(userInfo)
    .then(user => res.json(user))
    .catch(error => {
        console.log('error', error)
        res.json({error: 'error creating user'})
    })
})

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})