var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var touchRouter = require('./routes/touch');
var usersRouter = require('./routes/users');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/touch', touchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*
Stream = require('node-rtsp-stream')
stream = new Stream({
   name: 'name',
    streamUrl: 'rtsp://admin:EHSQEU@192.168.86.45:554/Streaming/Channels/102',
    wsPort: 9998,
   ffmpegOptions: { // options ffmpeg flags
       
   }
  })
  Stream = require('node-rtsp-stream')
  stream2 = new Stream({
     name: 'name2',
      streamUrl: 'rtsp://admin:PSJNCJ@192.168.86.79:554/Streaming/Channels/102',
      wsPort: 9999,
     ffmpegOptions: { // options ffmpeg flags
         
     }
    })
    stream3 = new Stream({
      name: 'name3',
       streamUrl: 'rtsp://admin:BPQSFD@192.168.86.42:554/Streaming/Channels/102',
       wsPort: 9997,
      ffmpegOptions: { // options ffmpeg flags
          
      }
     })
     stream3 = new Stream({
      name: 'name4',
       streamUrl: 'rtsp://admin:DLEVTZ@192.168.86.43:554/Streaming/Channels/102',
       wsPort: 9996,
      ffmpegOptions: { // options ffmpeg flags
          
      }
     })
     */
    
    
    



module.exports = app;
