var http = require("http");
var url = require('url');
var fs = require('fs');
//const SerialPort = require('serialport')
//const Readline = require('@serialport/parser-readline')
//const port = new SerialPort('COM4')
//const parser = port.pipe(new Readline({ delimiter: '\r\n' }))



var barcodeScan = require('./core/barcode/barcode-scan')
barcodeScan.init('COM4', io)

var server = http.createServer(function(request, response){
 var path = url.parse(request.url).pathname;
 switch(path){
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('<h1>Hey, have you heard about our <a href="/signup.html">signup page</a></h1>');
            response.end();
            break;
        case '/signup.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                  response.writeHead(404);
                  response.write("opps this doesn't exist - 404");
                  response.end();
                }
                else{
                  response.writeHead(200, {"Content-Type": "text/html"});
                  response.write(data, "utf8");
                  response.end();
                }
            });
            break;
        default:
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
          response.end();
          break;
  }
});

//Call after server
var io = require('socket.io').listen(server);
server.listen(8001);

    //Socket connected event fired
    io.sockets.on('connection', function(socket){

            //Barcode scan event fired
            parser.on('data', function(data) {
              console.log('Data:  ', data)
              socket.emit('stream', {'title': data})
            })
    });
