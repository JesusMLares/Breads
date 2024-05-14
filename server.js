const express = require('express');
const mongoose = require('mongoose');

// Config
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB: ', process.env.MONGO_URI))
  .catch(err => console.log('Unable to connect to MongoDB'));



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

// Breads
const breadsController = require('./controllers/breads_controller')
app.use('/breads', breadsController)

// 404 Page
app.get('*', (req, res) => {
  res.render('error404')
})

// Listen
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})