// implement your API here
const express = require('express')
const server = express()
const db = require('./data/db.js')
const port = 8000


server.use(express.json())

// base URL message
server.get('/api', (req, res) => {
    res.send('Hello, API is working 👍🏻')
})
// REQUEST HANDLERS
// GET
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch(error => {
        console.log('error', error)
        res.json({error: 'failed to get users'})
    })
})

// GET BY ID
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id

    db.findById(userId)
    .then(user => res.status(200).json(user))
    .catch(error => {
        console.log('error', error)
        error.status(404).json({
            error: 'cannot find user with supplied id'
        })
    })
})

// POST
server.post('/api/users', (req, res) => {
    const userInfo = req.body
    db.insert(userInfo)
    .then(user => res.status(201).json(user))
    .catch(error => {
        console.log('error', error)
        res.status(400).json({error: 'data must include a name and bio'})
    }) 

})

// DELET
server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
   
    db.remove(userId)
    .then(user => res.status(200).json('user deleted', user))
    .catch(error => {
        console.log('error', error)
        res.status(404).json({ error: 'error deleting user, did you provide an id?' })
    }) 
})


server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})