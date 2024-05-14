const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread.js')

// INDEX
breads.get('/', (req, res) => {
    Bread.find()
    .then(foundBreads =>{
      res.render('index',{
        breads: foundBreads,
        title: 'Index Page'
      })
    })
    // res.render('index', {
    //     breads: Bread
    // })
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  Bread.findById(req.params.indexArray)
    .then(foundBread => {
      res.render('edit', {
        bread: foundBread,
      })
    })
})

// Show
breads.get('/:arrayIndex', (req, res) => {
  Bread.findById(req.params.arrayIndex)
    .then(foundBread =>{
      res.render('show', {
        bread: foundBread,
      })
    })
});


// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.create(req.body)
  res.redirect('/breads')
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread[req.params.arrayIndex] = req.body
  res.redirect(`/breads/${req.params.arrayIndex}`)
})


// DELETE
breads.delete('/:arrayIndex', (req, res) => {
  Bread.splice(req.params.arrayIndex, 1)
  res.status(303).redirect('/breads')
})

module.exports = breads;