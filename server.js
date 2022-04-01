if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // load the env variables if its not production
}

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect(process.env.DATABASE_URL);// connect mongoose
const db = mongoose.connection; // get the mongoose connection

// check the connection is succesful or not
db.on('error', error=>console.error(error)); // if error then logs it
db.once('open', ()=>console.log('Connected to mongoose')); // id connected then log it

const app = express(); 

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');


app.set('view engine', 'ejs'); // set the view engine
app.set('views', __dirname + '/views'); // setting the view, get current directory name and set the view folder
app.set('layout', 'layouts/layout') // every single file is going to be put inside this layout file so we dont have to duplicate all the html like header and footer
app.use(expressLayouts); // make app use expressLayouts
app.use(express.static('public')); // set app use static files like css or images location
app.use(bodyParser.urlencoded({limit: '10mb', extended: false})); // tells app how to use data send in request body, makes it easy to work with express.
 
app.use('/', indexRouter); // tells the app to use indexRouter for routes matching to '/'
app.use('/authors', authorRouter);
app.listen(process.env.PORT || 3001, ()=>console.log('Server Running...')); // app listens on 3000