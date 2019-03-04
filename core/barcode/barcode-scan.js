const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')



module.exports = {
    init: function (comport) {
        port = new SerialPort(comport, function (err) {
            if (err) {
              return console.log('Error: ', err.message)
            }
            console.log('Listening for scans on: ' + comport)
        })

});
        //port.on('readable', function () {
        //    console.log('Data:  ', port.read())
        //
        //})
    }
}
