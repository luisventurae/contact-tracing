'use strict'

/**
 * Establece todos los ficheros de las rutas que existirán
 */

const LocationCtrl = require('Ctrl/Location')

module.exports = (app) => {
    app.post('/location', LocationCtrl.saveLocation)
    app.get('/location', LocationCtrl.getLocations)

    app.use('*', require('./api/handle') )   
}
