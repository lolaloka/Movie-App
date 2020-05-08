const express = require("express");
const router = express.Router();

const handlers = require("../controllers/genre-handel");
// Get All Movies
router.get('/', handlers.getAllGenres)
// Get specifi cgenre
router.get('/:id', handlers.getSpecificGenre)
// Create New genre
router.post('/', handlers.CreateNewgenre)
// Update existing gener
router.put('/:id', handlers.UpdateAgenre)
// Delete an existing gener
router.delete('/:id', handlers.DeleteAGenre)
// Delete All
router.delete('/', handlers.DeleteAllGenre)

module.exports = router
