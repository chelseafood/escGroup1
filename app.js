var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let passport = require('passport');
let session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let {isLoggedIn,hasAuth} = require('./middleware/hasAuth');
/* the next 2 lines is just an example of how we pass arguments when we perform require('package')(<parameters>) */
// const print = require('./print-in-frame');
// print(5, 'Hey');
// is the same as saying require('./print-in-frame')(5, 'Hey');
require('./passport_setup')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/******************* use Session **************************/
// take note that we have to write the following codes in order
// bcus nodejs read codes line by line
app.use(session({ secret: 'our little secret' }));
app.use(passport.initialize());   // we want to set up passport in a separate file from app.js. for that, we add in the line at line 12
app.use(passport.session());

/** if user is not logged in, direct to usersRouter */
// app.all('/secret', isLoggedIn)
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
