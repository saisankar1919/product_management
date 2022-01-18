var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
var mongoose = require('mongoose')
const { readdirSync } = require("fs");


var app = express();

// dotenv connfiguration 

dotenv.config();


//mongoose connection

mongoose.connect('mongodb://localhost:27017/product', 
        { useNewUrlParser: true },
        { useUnifiedTopology: true })
        .then(() => console.log("DB CONNECTED"))
        .catch((err) => console.log("DB CONNECTION ERR", err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//application level middlwares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routing 
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

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
