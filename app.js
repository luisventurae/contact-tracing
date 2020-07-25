'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 12345
const SVR = process.env.SVR || 'localhost'

app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.send('Bienvenido al API Rest de Contact Trancing')
})

const routes = require('./routes')
routes.default(app)

app.listen(PORT, () => {
    console.log(`http://${SVR}:${PORT}`)
})