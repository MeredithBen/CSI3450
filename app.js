//imports
'use strict';
var debug = require('debug');
var path = require('path');
var bodyParser = require('body-parser');
var ejs = require('ejs');
const express = require('express');
const { isBuffer } = require('util');
const app = express()
const port = 3000
const { changeUsername, setFavDecades, setFavGenres } = require('./routes/profile');
var session = require('express-session');
var jsdom = require("jsdom");
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');




//middle-ware
//session handling for HTTP requests
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))


//extract data from login form
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


//set views
app.set('port', process.env.port || port);
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


//removed login route and declared in login.js
//testing this route
var loginRouter = require('./routes/login')
    app.use('/login', loginRouter);

var homeRouter = require('./routes/home')
    app.use('/home', homeRouter);

var newUserRouter = require('./routes/newuser')
    app.use('/newuser', newUserRouter);

//define routes
//const {getLoginPage} = require('./routes/login');
const {getSearchPage} = require('./routes/search');
const {getProfilePage} = require('./routes/profile');
const {getPlaylistsPage} = require('./routes/playlists');
const {getFavSongsPage} = require('./routes/favoritesongs');
const {getFavArtistsPage} = require('./routes/favoriteartists');
const {getFavAlbumsPage} = require('./routes/favoritealbums');
//const {getHomePage} = require('./routes/home');
//const {getNewUserPage} = require('./routes/newuser');




//connect routes and views
//app.get('/login', getLoginPage); 
app.get('/search', getSearchPage);
app.get('/profile', getProfilePage);
app.get('/playlists', getPlaylistsPage);
app.get('/favoritesongs', getFavSongsPage);
app.get('/favoriteartists', getFavArtistsPage);
app.get('/favoritealbums', getFavAlbumsPage);
//app.get('/home', getHomePage);
//app.get('/newuser', getNewUserPage);

/* app.post('/profile', changeUsername)
app.post('/profile', setFavDecades)
app.post('/profile', setFavGenres)
app.post('/login', login);
app.post('/search', search); */

// listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))



