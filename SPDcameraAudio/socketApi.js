var socket_io = require('socket.io');

var io = socket_io();
var socketApi = {};

var os = require('os');
var ifaces = os.networkInterfaces();

require('events').EventEmitter.prototype._maxListeners = 100;

const {
    JSDOM
} = require("jsdom");
const {
    window
} = new JSDOM("");
const $ = require("jquery")(window);




// "calibrated" occurs once, at the beginning of a session,

var panspeed = 4;

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("/dev/ttyUSB0", { baudRate: 9600 })
var sendData = 0;
const parser = new Readline()
port.pipe(parser)
var moment = require("moment")
var spawn = require('child_process').spawn,
child = null;
function Startrecording(){


    var fileNameTImeStamp = moment().format("YYYY-MM-DD-HHmm");
      var name = "/home/pi/SPDcameraAudio/public/videos/"+ fileNameTImeStamp+".mp4"
      console.log(name)
       child = spawn("ffmpeg", [
          "-hide_banner",
          "-i", "rtsp://admin:UUnv9njxg123@10.10.10.3:554/cam/realmonitor?channel=1&subtype=0",
          "-vcodec", "copy", name
      ]);
      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    child.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });
  }
io.on("connection", function(socket) {
    var datestamp = "";
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;

    });
    parser.on('data', function(data){
        var serialData = data.split(':')
        //console.log(serialData[1])
        var soundArray = [serialData[1],serialData[0],serialData[2]]
        if(sendData===1){
            socket.emit('audioLevels',soundArray)
            
        }
    })
var exec = require('child_process').exec;
function sendVideoInfo(file){
var ffmpeg = require('fluent-ffmpeg');
    ffmpeg.ffprobe(file,function(err, metadata) {
        console.log(metadata);
        socket.emit('videoInfo', metadata)
        if(err){console.log(err)}
    }); 
}
function sendVideoFiles(){
    var videoFiles = []
    
    exec('ls /home/pi/SPDcameraAudio/public/videos' , function(error, stdout, stderr) {
      if (error){
        console.log(error)
      }
      if (!error){
          var newStringArray = stdout.split("\n")
          //newStringArray = toString(newStringArray)
            console.log(newStringArray.length)
            for(y=0;y<newStringArray.length;y++){
               
                    



                        if(newStringArray[y]){
                            console.log(newStringArray[y])
                        videoFiles.push(newStringArray[y])
                    }
                            if(y == newStringArray.length - 1){
                            socket.emit("videoFile",videoFiles )
                        }
                    
                   

            }
          //var videoName = ""
          //videoName = stringObject[9]
          //var fileLocation = '/media/drive/live/'+ videoName
        //console.log(fileLocation)
        //ffmpeg.ffprobe(fileLocation,function(err, metadata) {
         // console.log(metadata.format.tags.comment);
         // if(err){console.log(err)}
         //             }); 
      }
    })



}

socket.on('getVideoInfo', function(data){
    var fileURI = "/home/pi/SPDcameraAudio/public/videos/"+data
    sendVideoInfo(fileURI)



})
    socket.on('getVideos', function(data){
        sendVideoFiles()



    })
    socket.on('status', function(data){
        if(data==='sendData'){
            sendData = 1

        }
        console.log(data)


    })
    socket.on('recording', function(data) {
        console.log(data)
        if(data==="start"){

            Startrecording();
        }
        if(data==="stop"){

            child.kill('SIGINT');
            setTimeout(() => {
                sendVideoFiles()
            }, 2000);
          

        }
      })
      socket.on('panSpeed', function(data) {
            panspeed = data



      })
    socket.on('Cameraaction', function(data) {
        switch (data) {
            case 'up':
                $.ajax({
                        type: 'GET',


                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=Up&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",
                    })
                    .done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        //console.log(errorThrown)
                    })
                break;

            case 'upStop':
                console.log("upSTOP")
                $.ajax({
                        type: 'GET',


                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=stop&channel=0&code=Up&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'down':
                console.log("down")
                $.ajax({
                        type: 'GET',

                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=Down&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'downStop':
                console.log("down")
                $.ajax({
                        type: 'GET',

                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=stop&channel=0&code=Down&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'left':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=Left&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'leftStop':
               
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=stop&channel=0&code=Left&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'right':
               
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=Right&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'rightStop':
           
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=stop&channel=0&code=Right&arg1=0&arg2='+ panspeed +'&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'pos1':
                
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=1&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'pos2':
                
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=2&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'pos3':
                
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=3&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'pos4':
                
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=4&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'pos5':
                
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=5&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
                case 'pos6':
               
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=6&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
                case 'pos7':
              
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=7&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
                case 'pos8':
                
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=8&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
                case 'pos9':
              
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=GotoPreset&arg1=0&arg2=9&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'startTour':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=StartTour&arg1=1&arg2=0&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;

            case 'zoomIN':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=ZoomTele&arg1=1&arg2=0&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'zoomOUT':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=ZoomWide&arg1=1&arg2=0&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'zoomINStop':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=stop&channel=0&code=ZoomTele&arg1=1&arg2=0&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'zoomOUTStop':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=stop&channel=0&code=ZoomWide&arg1=1&arg2=0&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'scanON':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=AutoScanOn&arg1=1&arg2=0&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;
            case 'scanOff  ':
                console.log("down")
                $.ajax({
                        type: 'GET',
                        url: 'http://10.10.10.3/cgi-bin/ptz.cgi?action=start&channel=0&code=AutoScanOff&arg1=1&arg2=0&arg3=0',
                        username: "admin",
                        password: "UUnv9njxg123",

                    }).done(function(data, textStatus, jqXHR) {
                        // Process data, as received in data parameter
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown)
                    })
                break;


        }
    })


});
socketApi.io = io;

module.exports = socketApi;