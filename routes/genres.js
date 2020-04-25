const { Genre, validate } = require("../models/geners.model");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort("name");
    if (!genres) return res.status(400).send(" Some Error ");
    res.send(genres);
  } catch (error) {
    console.log(error);
  }
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
  try {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findById(req.params.id);
    if (!genre)
      res.status(400).send("The Genre with The Given Id Is not Found");
    if (genre.name === req.body.name)
      return res.status(400).send("it seems that its has the same name");
    genre.set({
      name: req.body.name
    });
    const SavedCoures = await genre.save();
    res.send(SavedCoures);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed To Connect");
  }
});
// Delete an existing gener
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
      return res.status(404).send("The Genre with The Given Id Is not Found");
    if (genre.length < 0)
      return res.status(404).send("it seems that there is No Id");

    res.send(genre);
  } catch (error) {
    console.log(error);
  }
});
// Delete All
router.delete("/", async (req, res) => {
  // try {
  //   const genre = await Genre.findByIdAndRemove(req.params.id);
  //   if (!genre)
  //     return res.status(404).send("The Genre with The Given Id Is not Found");
  //   if (genre.length < 0)
  //     return res.status(404).send("it seems that there is No Id");

  //   res.send(genre);
  // } catch (error) {
  //   console.log(error);
  // }
  const ids = req.body;
  let deletedMovie = Genre.find({ _id: { $in: ids } });
  if (deletedMovie.length === 0)
    return res.status(400).send("it seems that Not Movies to delete");
  deletedMovie = deletedMovie.map(async movie => await movie.remove());

  res.send(deletedMovie.map(id => deletedMovie.id));
  // await Genre.findById(await (id)=>{})
});

module.exports = router;
