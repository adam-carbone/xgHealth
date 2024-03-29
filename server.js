    // set up ======================================================================
    var express  = require('express');
    var path = require('path');
    var app      = express();                               // create our app w/ express
    var port     = process.env.PORT || 8080;                // set the port
    var logger = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var cookieParser = require('cookie-parser');


    // configuration ===============================================================


    app.use(express.static(path.join(__dirname, 'public')));        // set the static files location /public/img will be /img for users
    app.use(logger('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    app.use(cookieParser());

    // routes ======================================================================

    var index = require('./app/routes/index');
    var patients = require('./app/routes/patients');
    app.use('/', index);
    app.use('/api/v1/', patients);

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port " + port);

    module.exports = app;
