var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const helmet = require('helmet');
const compression = require ('compression');
const winston = require('winston');

//mongodb+srv://farouk:5hrvlvrurk45@cluster0-pmw9r.mongodb.net/myproject

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(helmet())
app.use(compression())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//database connection
mongoose.connect(config.get('DBSTRING') , {useNewUrlParser: true}, (err , res) => {
  if(err) {console.log('faild to connect to the databse due to '+ err)}
   winston.info('Connected to MongoDB...')
 })

app.use('/pickup', indexRouter);
app.use('/',userRouter)

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

module.exports = app;
