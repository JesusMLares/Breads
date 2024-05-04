const express = require('express');

// Config
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads')
})

// Breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)


// Listen
app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})