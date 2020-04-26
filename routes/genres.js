const express = require("express");
const router = express.Router();
// const handbars = require("../controllers/handelbars");
const handbars = require("../models/genreHandlebars");
// Get All Movies
router.get("/", handbars.GetAllGenres);
// Get specifi cgenre
router.get("/:id", handbars.Getspecificgenre);
// Create New genre
router.post("/", handbars.CreateNewgenre);
// Update existing gener
router.put("/:id", handbars.UpdateAgenre);
// Delete an existing gener
router.delete("/:id", handbars.DeleteAGenre);
// Delete All
router.delete("/", handbars.DeleteAllGenre);

module.exports = router;
