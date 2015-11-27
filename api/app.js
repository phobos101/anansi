// Require packages
var express = require('express');
var cors = require('cors');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

// Require relative files
var config = require('./config/config');
var routes = require('./config/routes');
var secret = require('./config/config').secret; // Set up secret used by JWT

// Hook into mongoDB via mongoose
mongoose.connect(config.database);

// Create App
var app = express();

// Set our app to use packages
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());

// Set-up method-override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  };
}));

// Set app to use JWTs when called though '/api'
// app.use('/api', expressJWT({ secret: secret })
//   .unless({
//     path: [
//       { url: '/api/events', methods: ['GET'] }
//     ]
//   }));

// Display user friendly error when 401 occurs
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({message: 'Unauthorized request.'});
  };
  next();
});

// Tell app to use routing via the '/api' sub-domain
app.use("/api", routes);

app.listen(3000);
console.log("Anansi is alive and listening on port 3000.");
