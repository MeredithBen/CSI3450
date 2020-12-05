// imports
const express = require('express')
const app = express()
const port = 3000


// static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))


//set views
app.set('views', './views')
app.set('view engine', 'ejs')


//page paths
app.get('', (req, res) => {
    res.render('login')
})

app.get('/profile', (req, res) => {
    res.render('profile')
    
})

app.get('/playlists', (req, res) => {
    res.render('playlists')
})

app.get('/fav_songs', (req, res) => {
    res.render('fav_songs')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/search', (req, res) => {
    res.render('search')
})


// listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))