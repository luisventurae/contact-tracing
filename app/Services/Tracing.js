'use strict'

const Pin = require('App/Models/Pin')
const moment = require('moment')
const radius = 0.75 // 1.5m de diámetro - Distancia mínima permitida

class Tracing {

    async getPins() {
        // let now = new Date()
        // return Pin.find({$minute:now})
        return Pin.find()
    }
    /**
     * @param {Object} pin 
     */
    async savePin(pin) {
        console.log('pin',pin)
        const n_pin = new Pin(pin) 
        await n_pin.save()
        this.discoverAround(pin.location[0],pin.location[1])
        return true
    }
    /**
     * @param {Number} lat Latitud
     * @param {Number} long Longitud
     */
    async discoverAround(lat, long) {
        // Filtra los puntos que se encuentran en el mismo punto
        let sameMinutes = pins.filter(pin => {
            let sameMinute = pins.some(nextPin => {
                if(pin.id!==nextPin.id)
                    return moment(pin.time).isSame(nextPin.time, 'minute')
                else 
                    return false
            })
            return sameMinute
        })
        // console.log('sameMinutes',sameMinutes)
        console.log('sameMinutes length',sameMinutes.length)
        // Filtra los puntos que se encuentran dentro de la distancia mínima en el eje X
        const self = this
        let insides = sameMinutes.filter(pin => {
            let inside = false
            sameMinutes.forEach(async otherPin => {
                if(pin.id!==otherPin.id) {
                    let distance = await self.measure(
                        {
                            lat1: pin.location[0],
                            lng1: pin.location[1],
                        },
                        {
                            lat2: otherPin.location[0],
                            lng2: otherPin.location[1],
                        },
                    )
                    console.log('distance',distance,'m')
                    console.log('entre',pin)
                    console.log('con',otherPin)
                    return distance <= radius ? true : false
                }
                else return false
            })
            return inside
            // sameMinutes.forEach(async otherPin => {
            //     let yDistance = Math.abs(pin.location[0] - otherPin.location[0])
            //     let xDistance = Math.abs(pin.location[1] - otherPin.location[1])
            //     console.log('yDistance',yDistance)
            //     console.log('xDistance',xDistance)
            //     let distance = await self.measure(
            //         {
            //             lat1: pin.location[0],
            //             lng1: pin.location[1],
            //         },
            //         {
            //             lat2: yDistance,
            //             lng2: xDistance,
            //         },
            //     )
            //     // console.log('distance',distance,'m')
            //     // console.log('entre',pin)
            //     // console.log('con',otherPin)

            // })
        })
        // console.log('insides',insides)
        console.log('insides length',insides.length)
    }
    /**
     * Distancia entre 2 coordenadas
     * @param {Object} location1 
     * @param {Number} location1.lat1 Latitud de la primera ubicación
     * @param {Number} location1.lng1 Longitud de la primera ubicación
     * @param {Object} location2 
     * @param {Number} location2.lat2 Latitud de la segunda ubicación
     * @param {Number} location2.lng2 Longitud de la segunda ubicación
     */
    async measure({ lat1, lng1 }, { lat2, lng2 }){ 
        var R = 6378.137 // Radio de la tierra en KM
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180
        var dLng = lng2 * Math.PI / 180 - lng1 * Math.PI / 180
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2)
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        var d = R * c
        return d * 1000 // meters
    }

}

module.exports = new Tracing