const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var Tokens = require('csrf')

let tokens = new Tokens()
 const token = tokens.secret().then(function (secret) {
  // do something with the secret
  console.log(secret);
});
 

// including routes files
let index = require('./routes/index');
let users = require('./routes/users');
let customers = require('./routes/customers');

let app = express();

let connection  = require('express-myconnection'); 
let mysql = require('mysql');

let session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mysql connection
app.use(
    connection(mysql,{ 
        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'nodejs'

    },'pool') //or single

);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Handling user requests
app.use('/', index);
app.use('/users', users);
app.use('/customers', customers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
