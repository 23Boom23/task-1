
const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let users = [ { id: 1, name: "Pasha", isMan: true, age: 25 },
{ id: 2, name: "Lesha", isMan: true, age: 28 },
{ id: 3, name: "Masha", isMan: false, age: 32 },
{ id: 4, name: "Marina", isMan: false, age: 51 }
]

app.get('/users', (req, res) => {
    if (req.query) {
        let result = users.filter(item => item.age > req.query.min && item.age < req.query.max ? item : null)
        return res.send(result)
    }
    if (!req.query) {
        res.send(users)
    }

})

app.post('/user', (req, res) => {
    users.push(req.body);
    res.status(201, () => {
        'Success'
    })
    res.send(req.body)
})

app.put('/user/:id', (req, res) => {
    const updateUsers = users.map((item) => (item.id == req.params.id ? req.body : item))
    users.splice(0, users.length, ...updateUsers)
    res.send(users)
})

app.patch('/user/:id', (req, res) => {
    const updateUsers = users.map((item) => (item.id == req.params.id ? { ...item, name: req.body.name, isMan: req.body.isMan } : item))
    users.splice(0, users.length, ...updateUsers)
    res.send(users)
})

app.delete('/user/:id', (req, res) => {
    const id = users.findIndex((item) => item.id == req.params.id)
    users.splice(id, 1);
    res.send(`${id}`);
})

app.get('/users/:gender', (req, res) => {
    // item.isMan == req.params.gender
    users = users.filter((item) => JSON.stringify(item.isMan) === req.params.gender)
    res.send(users)
})

app.listen(port, () => {
    console.log(`app start ${port}`)
})
