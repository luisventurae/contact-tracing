'use strict'

const Tracing = require('App/Services/Tracing')
// estado - check
// posicion - check
// tiempo -check
// probabilidad de contagio por zona
// está en vehículo o es peaton?

class Location {

    async getLocations(req, res) {
        let pins = await Tracing.getPins()
        return res.send(pins)
    }

    async saveLocation(req, res) {
        try {
            let pin = req.body
            await Tracing.savePin(pin)
            return res.send('ok')
        } catch (error) {
            console.error('[LocationCtrl][saveLocation] error', error)
        }
    }

}

module.exports = new Location