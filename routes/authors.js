const { response } = require('express');
const express = require('express');
const Author = require('../models/author');

const router = express.Router();

// All authors
router.get('/', async (req, res)=>{
    let searchOptions = {};
    if(req.query.name != null && req.query.name != '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    } 
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {authors: authors, searchOptions: req.query});
    } catch (error) {
        res.redirect('/')
    }
    res.render('authors/index');
})

// New author route
router.get('/new', (req, res)=>{
    res.render('authors/new', {author: new Author()});
})

// Create authors
router.post('/', async (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        //res.redirect(`authors/${newAuthor.id}`);
        res.redirect(`authors`);
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating author'
        })
    }
})


module.exports = router;