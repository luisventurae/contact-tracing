'use strict'

const LocationCtrl = require('../controllers/Location')

exports.default = (app) => {
    app.get('/ok', (req, res) => {
        res.send('super')
    }),
    app.post('/location', (req, res) => {
        LocationCtrl.saveLocation(req, res)
    })
    app.get('/location', (req, res) => {
        LocationCtrl.getLocations(req, res)
    })
}