var buttons = "<div class='container'>"+

  "<div class='row'>"+
    "<div class='col'>"+
        "<div class='container'>"+
            "<div class='row'>"+
                "<div class='col'>"+
                    "<button type='button' class='btn btn-secondary up'> Up </button>"+
                "</div>"+
                "<div class='col'>"+
                    "<button type='button' class='btn btn-secondary down' >Down</button>"+
                "</div>"+
                "<div class='col'>"+
                    "<button type='button' class='btn btn-secondary left'>Left</button>"+
                "</div>"+
                "<div class='col'>"+
                    "<button type='button' class='btn btn-secondary right'>Right</button>"+
                "</div>"+
            "</div>"+
            "<div class='btn-toolbar mb-3' role='toolbar' aria-label='Toolbar with button groups'>"+
            "<h4>Position</h4>"+
            "<div class='btn-group mr-2' role='group' aria-label='First group'>"+
              "<button type='button' class='btn btn-secondary pos1'>1</button>"+
              "<button type='button' class='btn btn-secondary pos2'>2</button>"+
              "<button type='button' class='btn btn-secondary pos3'>3</button>"+
              "<button type='button' class='btn btn-secondary pos4'>4</button>"+
              "<button type='button' class='btn btn-secondary pos5'>5</button>"+
            "</div>"+
            "<button type='button' class='btn btn-secondary startTour'>Start Tour</button>"+
            "<button type='button' class='btn btn-secondary zoomin'>Zoom IN</button>"+
            "<button type='button' class='btn btn-secondary zoomout'>Zoom Out</button>"+
            "<button type='button' class='btn btn-secondary scanon'>Start Scanning</button>"+
            "<button type='button' class='btn btn-secondary scanoff'>Stop Scanning</button>"+
        "</div>"+
    "</div>"+
    
  "</div>"+
"</div>"


var sound0 = 0;
var sound1 = 0;
var sound2 = 0;

var sound0Diff = 0;
var sound1Diff = 0;
var sound2Diff = 0;
const Http = new XMLHttpRequest();
var socket = io();
var mainServer = io('//192.168.196.75:3000/');
$(function() {
   
    $('#mainDIV').html(buttons+"<div id='sound2'></div><div id='sound1'></div><div id='sound0'></div><div id='batt'></div><img id='canvas' src='http://192.168.196.75:8081/' width='1000' height='600'></img>")
   
 	
        

          $( ".up" ).mousedown(function() {
            mainServer.emit('Cameraaction','up')
            
              
          });
          $( ".up" ).mouseup(function() {
            mainServer.emit('Cameraaction','upStop')
            console.log("upstop")
             
          });


          $( ".down" ).mousedown(function() {
            mainServer.emit('Cameraaction','down')
          });
          $( ".down" ).mouseup(function() {
            mainServer.emit('Cameraaction','downStop')
          });
          $( ".left" ).mousedown(function() {
            mainServer.emit('Cameraaction','left')
          });
          $( ".left" ).mouseup(function() {
            mainServer.emit('Cameraaction','leftStop')
          });
          $( ".right" ).mousedown(function() {
            mainServer.emit('Cameraaction','right')
          });
          $( ".right" ).mouseup(function() {
            mainServer.emit('Cameraaction','rightStop')
          });
          $( ".pos1" ).mouseup(function() {
            mainServer.emit('Cameraaction','pos1')
          });
          $( ".pos2" ).mouseup(function() {
            mainServer.emit('Cameraaction','pos2')
          });
          $( ".pos3" ).mouseup(function() {
            mainServer.emit('Cameraaction','pos3')
          });
          $( ".pos4" ).mouseup(function() {
            mainServer.emit('Cameraaction','pos4')
          });
          $( ".pos5" ).mouseup(function() {
            mainServer.emit('Cameraaction','pos5')
          });
          $( ".startTour" ).mouseup(function() {
            mainServer.emit('Cameraaction','startTour')
          });
          $( ".zoomin" ).mousedown(function() {
            mainServer.emit('Cameraaction','zoomIN')
          });

          $( ".zoomout" ).mousedown(function() {
            mainServer.emit('Cameraaction','zoomOUT')
          });

          $( ".zoomin" ).mouseup(function() {
            mainServer.emit('Cameraaction','zoomINStop')
          });

          $( ".zoomout" ).mouseup(function() {
            mainServer.emit('Cameraaction','zoomOUTStop')
          });
          $( ".scanon" ).mouseup(function() {
            mainServer.emit('Cameraaction','scanON')
          });
          $( ".scanoff" ).mouseup(function() {
            mainServer.emit('Cameraaction','scanOff')
          });
         //  io.on("connection", function(socket) {
          mainServer.on('battery', function(data) {
            console.log(data)
            var voltage = data - .39
            //$('#batt').html("<h1>Battery: "+voltage+"</h1>")
          })
         mainServer.on('sound1', function(data) {
               if(data!=sound1){
                  sound1Diff = data - sound1;
                  sound1 = data
               }
               
               //else{sound1Diff = 0}
               if(sound1Diff>20){
               console.log('MIDDLE: ' + sound1Diff)
               
               }

         })
         mainServer.on('sound0', function(data) {
             if(data!=sound0){
               sound0Diff = data - sound0;
               sound0 = data
            }
            
            //else{sound0Diff = 0}
            if(sound0Diff>20){
            console.log('RIGHT: ' + sound0Diff)
           
         }

      })
      mainServer.on('sound2', function(data) {
         if(data!=sound2){
            sound2Diff = data - sound2;
            sound2 = data
            
         }
         
            //else{sound2Diff = 0}
            if(sound2Diff>5){
         console.log('LEFT: ' + sound2Diff)
         $('#sound2').html("<h3>Left Sound: "+sound2Diff+"</h3>")
            }
            if(sound1Diff>5){
              console.log('Center: ' + sound2Diff)
              $('#sound1').html("<h3>Center Sound: "+sound2Diff+"</h3>")
                 }
                 if(sound0Diff>5){
                  console.log('Right: ' + sound2Diff)
                  $('#sound0').html("<h3>Right Sound: "+sound2Diff+"</h3>")
                     }
   })
   


    })