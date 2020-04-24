const { Genre, validate } = require("../models/customer.model");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});
// Get specific genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The Genre with The Given Id Is not Found");
  res.send(genre);
});

// Create New genres
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
  }
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});
// Update an existing gener
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The Genre with The Given Id Is not Found");
  res.send(genre);
});
// Delete an existing gener
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send(" The Genre with The Given Id Is not Found");
  res.send(genre);
});

module.exports = router;
