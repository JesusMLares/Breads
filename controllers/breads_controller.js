const express = require("express");
const breads = express.Router();
const Bread = require("../models/bread.js");
const Baker = require("../models/baker.js");

// Index:
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find()
  const foundBreads = await Bread.find().limit(2) 
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})




// NEW PAGE
breads.get("/new", async (req, res) => {
  const foundBakers = await Baker.find();
  res.render("new", {
    bakers: foundBakers,
  });
});

// EDIT PAGE
breads.get('/:indexArray/edit', async (req, res) => {
  const foundBakers = await Baker.find();
  const foundBread = await Bread.findById(req.params.indexArray);
  res.render('edit', {
    bread: foundBread,
    bakers: foundBakers,
  });
});


// SHOW
breads.get('/:id', async (req, res) => {
  const foundBread = await Bread.findById(req.params.id).populate('baker');
  res.render('show', {
    bread: foundBread
  });
});


// CREATE
breads.post("/", (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
breads.put("/:arrayIndex", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body)
    .then(() => {
      res.redirect(`/breads/${req.params.arrayIndex}`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating bread");
    });
});

// DELETE
breads.delete("/:arrayIndex", (req, res) => {
  Bread.findByIdAndDelete(req.params.arrayIndex)
    .then(() => {
      res.status(303).redirect("/breads");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting bread");
    });
});

module.exports = breads;
