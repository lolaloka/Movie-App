const express = require("express");
const router = express.Router();
// const handbars = require("../controllers/handelbars");
const handlers = require("../controller/genreHandlers");
// Get All Movies
router.get("/", handlers.GetAllGenres);
// Get specifi cgenre
router.get("/:id", handlers.Getspecificgenre);
// Create New genre
router.post("/", handlers.CreateNewgenre);
// Update existing gener
router.put("/:id", handlers.UpdateAgenre);
// Delete an existing gener
router.delete("/:id", handlers.DeleteAGenre);
// Delete All
router.delete("/", handlers.DeleteAllGenre);

module.exports = router;
