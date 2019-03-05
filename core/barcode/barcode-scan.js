const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

module.exports = {
    init: function (comport) {
        //Set up port
        port = new SerialPort(comport, function (err) {
            if (err) {
              return console.log('Error: ', err.message)
            }
        })

        //Set up parser
        parser = port.pipe(new Readline({ delimiter: '\r\n' }))
        console.log('Listening for scans on: ' + comport)


        //port.on needs to be called after socket connected
        //port.on('readable', function () {
        //    console.log('Data:  ', port.read())
        //
        //})
    }
}
