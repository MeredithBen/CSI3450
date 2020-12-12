//imports
'use strict';
var debug = require('debug');
var path = require('path');
var bodyParser = require('body-parser');
const express = require('express');
const { isBuffer } = require('util');
const app = express()
const port = 3000
var session = require('express-session');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');


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
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/img'))


//set views
app.set('port', process.env.port || port);
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


//define routes
var loginRouter = require('./routes/login')
    app.use('/login', loginRouter);
var homeRouter = require('./routes/home')
    app.use('/home', homeRouter);
var newUserRouter = require('./routes/newuser')
    app.use('/newuser', newUserRouter);
var favSongsRouter = require('./routes/favoritesongs')
    app.use('/favoritesongs', favSongsRouter);
var favArtistsRouter = require('./routes/favoriteartists')
    app.use('/favoriteartists', favArtistsRouter);
var favAlbumsRouter = require('./routes/favoritealbums')
    app.use('/favoritealbums', favAlbumsRouter);
var playlistsRouter = require('./routes/playlists')
    app.use('/playlists', playlistsRouter);
var profileRouter = require('./routes/profile')
    app.use('/profile', profileRouter);
const {getSearchPage, search} = require('./routes/search');
    app.get('/search', getSearchPage);
    app.post('/search', search);


// listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))