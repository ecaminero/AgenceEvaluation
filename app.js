'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var engines = require('consolidate');
var SwaggerExpress = require('swagger-express-mw');

const homePage = require('./env/develop').homePage;

var app = express();
module.exports = app; // for testing

app.set('views', __dirname + '/app');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

var config = {
  appRoot: __dirname // required config
};
app.use(express.static(path.join(__dirname, '/app')));

// App views
app.get('*', renderStart);
function renderStart(req, res, next) {
  if(req.originalUrl.startsWith('/api')){
    next();
  }else{
    res.render('index');
  }
}

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 5000;
  console.log('try this:\ncurl http://127.0.0.1:' + port);
  app.listen(port);

});
