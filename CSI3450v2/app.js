'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
var app = express();
//const mysqlConnection = require('./connection');

//I did some basic setup for the routes here
const homeRoutes = require('./routes/home');
const searchRoutes = require('./routes/search');
const playlistRoutes = require('./routes/playlists');
const loginRoutes = require('./routes/login');
const profileRoutes = require('./routes/profile');
const favSongsRoutes = require('./routes/favoritesongs');
const favArtistsRoutes = require('./routes/favoriteartists');
const favAlbumsRoutes = require('./routes/favoritealbums');


app.use('/', homeRoutes); //this might have to be login?
app.use('/search', searchRoutes);
app.use('/playlists', playlistRoutes);
app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);
app.use('/favoritesongs', favSongsRoutes);
app.use('/favoriteartists', favArtistsRoutes);
app.use('/favoritealbums', favAlbumsRoutes);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); //change to ejs if thats what we go with 

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
