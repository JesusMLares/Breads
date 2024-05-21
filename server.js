const express = require('express');
const mongoose = require('mongoose');

// Config
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
// Static assets: CSS
app.use(express.static('public'))
// Postman urlencoded string
app.use(express.urlencoded({extended: true}))
// DEPENDENCIES TO DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'))



// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})

// Listen
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})