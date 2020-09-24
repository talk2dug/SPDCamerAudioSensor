
    
var socket_io = require('socket.io');

var io = socket_io();
var socketApi = {};

var os = require('os');
var ifaces = os.networkInterfaces();

require('events').EventEmitter.prototype._maxListeners = 100;

  



var motion = new five.Motion(11);

  // "calibrated" occurs once, at the beginning of a session,
  



io.on("connection", function(socket) {
    var datestamp = "";
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;
        
    });

    socket.on('action', function(data) {
        switch (data) {
            case 'lightsOn':
              
                    break;
                
                case 'alarm':
                    
                    break;
                case 'lightsOff':
                 

                    break;
                case 'download':

                    break;
                default:

        }
    })
  

});
socketApi.io = io;

module.exports = socketApi;