'use strict'

/**
 * Modelo Colección Pin
 */

const { Schema, model } = require('mongoose')

const Pin = new Schema({
    username: { type: String, required: true },
    location: { type: Array, required: true },
    state: { type: Number, required: true },
    type: { type: String, required: true },
}, { timestamps: true })

module.exports = model('pins', Pin)