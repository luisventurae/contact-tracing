'use strict'

const express = require('express')
const app = express()
const PORT = process.env.PORT || 12345
const SVR = process.env.SVR || 'localhost'

app.listen(PORT, () => {
    console.log(`http://${SVR}:${PORT}`)
})