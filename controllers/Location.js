'use strict'

const pins = []

class Location {

    getLocations(req, res) {
        return res.send(pins)
    }

    saveLocation(req, res) {
        let location = req.body
        console.log('location',location)
        pins.push(location)
        return res.send('ok')
    }

}

module.exports = new Location