const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/ping", (req, res) => {
  res.send("pong");
});

const recipesJSON = path.join(__dirname, "../data/tk_cookbook.json");
const recipes = JSON.parse(fs.readFileSync(recipesJSON, "utf-8"));

router.get("/recipes", (req, res) => {
  res.json(recipes);
});

router.get("/recipes/:id", (req, res) => {
  console.log("Server received request for ID:", req.params.id);
  const recipeById = recipes.find(recipe => recipe.id === parseInt(req.params.id));
  res.json(recipeById);
});
module.exports = router;
