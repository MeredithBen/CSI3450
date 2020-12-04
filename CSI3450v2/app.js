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

//Check/fix all the names after Charles adds his functions! 
const { getHomePage } = require('./routes/home');
const { getSearchPage, search } = require('./routes/search');
const { getPlaylistsPage, returnPlaylists } = require('./routes/playlists');
const { getLoginPage } = require('./routes/login');
const { getProfilePage, changeUsername, setFavDecades, setFavGenres } = require('./routes/profile');
const { getFavSongsPage } = require('./routes/favoritesongs');
const { getFavArtistsPage } = require('./routes/favoriteartists');
const { getFavAlbumsPage } = require('./routes/favoritealbums');

app.get('/testing', getLoginPage);
app.get('/prof', getProfilePage)

app.get('/', getHomePage); //this might have to be login?
app.get('/search', getSearchPage);
app.get('/profile', getProfilePage);
app.get('/playlists', getPlaylistsPage);
app.get('/favoritesongs', getFavSongsPage);
app.get('/favoriteartists', getFavArtistsPage);
app.get('/favoritealbums', getFavAlbumsPage);
app.get('/login', getLoginPage);

app.post('/profile', changeUsername)
app.post('/profile', setFavDecades)
app.post('/profile', setFavGenres)
//app.post('/login', login);
app.post('/search', search);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

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

//// error handlers

//// development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//// production error handler
//// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
//});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
