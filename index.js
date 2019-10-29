// implement your API here
const express = require('express')
const server = express()
const db = require('./data/db.js')
const port = 8000


server.use(express.json())

// base URL message
server.get('/api', (req, res) => {
    res.send('Hello, API is working 👍🏻 \n Please use /api/users to get the users \n Or you can use /api/users/:id to get one specifically by id')
})


// REQUEST HANDLERS
// GET ALL USERS
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch(error => {
        console.log('error', error)
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

// GET BY ID
server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id

    db.findById(userId)
    .then(user => {
        user ? 
        res.status(201).json(user)
        : res.status(404).json({ message: "The user with the specified ID does not exist." })
    })
    .catch(error => {
        console.log('error', error)
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    })
})

// POST
server.post('/api/users', (req, res) => {
    const userInfo = req.body
    req.body.name && req.body.bio ?
    db.insert(userInfo)
    .then(user => res.status(201).json(user))
    .catch(error => {
        console.log('error', error)
        res.status(500).json({ errorMessage: "Could not send information to the server." })
    })
    : res.status(400).json({ errorMessage: "Please provide name and bio for the user." })

})

// DELET
server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id
   
    db.remove(userId)
    .then(user => {
        user ?
        res.status(200).json('user deleted', user)
        : res.status(404).json({ message: "The user with the specified ID does not exist." })
    })
    .catch(error => {
        console.log('error', error)
        res.status(500).json({ error: "The user could not be removed" })
    }) 
})


// PUT
server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id
    if (req.body.name && req.body.bio) {
        db.update(userId, req.body)
        .then(user => {
            user ? res.status(200).json("User information updated")
            : res.status(404).json({ message: "The user with the specified ID does not exist." })
        })
        .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    
})

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})