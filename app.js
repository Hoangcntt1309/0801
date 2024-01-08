const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Import product and category routes
const productRouter = require('./routes/product');
const categoryRouter = require('./routes/category');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', productRouter); // Use productRouter for the root path
app.use('/categories', categoryRouter);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/TestS2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Kết nối MongoDB thành công"))
.catch(err => console.error("Lỗi kết nối MongoDB", err));

// Error handling
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 404 handler
app.use((req, res) => res.status(404).render('404'));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

module.exports = app;
