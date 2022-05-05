const express = require('express')
const path = require('path')
const app = express()
const date = require(path.join(__dirname, 'date.js'))
const postsData = require(path.join(__dirname, 'posts.json'))
const fs = require('fs')
const port = 3000
let postCounter = 0
let postNumber;

// app config
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({ extended: true }))

// web directories
app.get('/', (_req, res) => res.redirect('/home'))
app.get('/home', (_req, res) => {
    res.render('home', {posts:postsData.posts})
})

app.post('/home', (req, res) => {
    const title = req.body.title
    const body = req.body.post_body
    let first_100_chars = body.substring(0,100)
    const newContent = {
        post_number: postCounter,
        date_created: date.getDateAndTime(),
        title,
        body,
        first_100_chars,
    }
    postCounter++
    postsData.posts.push(newContent)
    // write the new content to the json file so we can save it and load it later
    fs.writeFile(path.join(__dirname, 'posts.json'), JSON.stringify(postsData), (err) => {
        if (err) console.error(err)
    })
    res.redirect('/home')
    
})

app.post('/post', (req, res) => {
    // whenever the read more button is pressed the user is directed here for the full page of the post
    postNumber = req.body.post_number
    res.render('post',{post:postsData.posts[postNumber]})
})
app.get(`/clear`,(req, res) => {
    postsData.posts = []
    fs.writeFile(path.join(__dirname, 'posts.json'), JSON.stringify(postsData), (err) => {
        console.error(err)
    })
    res.redirect('/home')
})
app.get('/about', (_req, res) => res.render('about'))
app.get('/contact', (_req, res) => res.render('contact'))
app.get('/compose', (_req, res) => res.render('compose'))
app.listen(port, () => console.log(`Blog website app listening on port ${port}!`))