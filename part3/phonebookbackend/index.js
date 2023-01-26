const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('content', (req, res) => { 
  return JSON.stringify(req.body)
})
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.content(req, res)
  ].join(' ')
}))

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
  const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(p => p.id))
    : 0
  return maxId + 1
}

app.get('/api/', (request, response) => {
    response.json(phonebook)
})

app.get('/api/info', (request, response) => {
    response.send(`
        <p>Phonebook has info about ${phonebook.length}</p>
        <p> ${Date()}</p>
    `)
})
app.get('/api/:id', (request, response) => {
    const id = request.params.id
    const phone = phonebook.find(phone => phone.id == id)
    if (phone) {
        response.json(phone)
      } else {
        response.status(404).end()
      }
})
app.delete('/api/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(phone => phone.id != id)
    response.status(204).end()
})

app.post('/api/', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if (phonebook.find(phone => phone.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  const phone = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  phonebook = phonebook.concat(phone)

  response.json(phone)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })