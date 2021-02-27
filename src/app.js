const createError = require('http-errors');
const express = require("express");
const flash = require('connect-flash-plus');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride =  require('method-override'); 
const session = require("express-session");
const rememberMe = require("./middlewares/rememberMe");
const authenticate = require('./middlewares/authenticate');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const storeRouter = require("./routes/store");
const productsRouter = require("./routes/products");
const shopsRouter = require("./routes/shops");
const adminRouter = require("./routes/admin");

// ************ API ************
const productsApiRouter = require("./routes/api/products");


const app = express();

// ************ Template Engine ************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/// APPLY VIEWS VARIABLES ANDS FUNCTIONS
app.locals.currentUser = null;

// ************ Middlewares ************
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); 
app.use(session({secret:"Nuestro msj secreto!", resave: true, saveUninitialized: false,}));
app.use(flash());
app.use(rememberMe);
app.use(authenticate);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/store', storeRouter);
app.use('/products', productsRouter);
app.use('/shops', shopsRouter);
app.use('/admin', adminRouter);

// ************ API ************
app.use('/products', productsApiRouter);


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
