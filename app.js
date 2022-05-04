const express = require('express')
const path = require('path')
const app = express()
const date = require(path.join(__dirname, 'date.js'))
const port = 3000
const posts = []

// app config
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({ extended: true }))

// web directories
app.get('/', (_req, res) => res.redirect('/home'))
app.get('/home', (_req, res) => {
    res.render('home', {posts})
})
app.post('/home', (req, res) => {
    const title = req.body.title
    const body = req.body.post_body
    let first_100_chars = body.substring(0,100)
    posts.push({
        date_created: date.getDateAndTime(),
        title,
        body,
        first_100_chars
    })
    
    res.redirect('/home')
    
})

app.get('/about', (_req, res) => res.render('about'))
app.get('/contact', (_req, res) => res.render('contact'))
app.get('/compose', (_req, res) => res.render('compose'))
app.listen(port, () => console.log(`Blog website app listening on port ${port}!`))