const { Genre, validate } = require('../models/geners.model')

module.exports = {
  getMoviesList: async (req, res) => {
    try {
      const genres = await Genre.find().sort('name')
      res.send(genres)
    } catch (exc) {
      res.status(500).json({ message: exc.message || exc, error: true })
    }
  },
  getMovieById: async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (!genre) { return res.status(404).send('The Genre with The Given Id Is not Found') }
    res.send(genre)
  },
  createNewMovide: async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
      res.status(400).send(error.details[0].message)
    }
    // If the incoming movie exist, don't create and send status error.
    const existingMovie = await Genre.findOne({ name: req.body.name.trim() })
    if (existingMovie) {
      res.status(400).json({ message: 'It seems you want to create an exsiting movie.', error: true })
      return
    }
    let genre = new Genre({ name: req.body.name })
    genre = await genre.save()
    res.status(201).send(genre)
  },
  updateMovie: async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)
    // if the passed id is invalid id, return not found status error.
    const movieToUpdate = await Genre.findById(req.params.id)
    if (!movieToUpdate) { return res.status(404).json({ message: 'Movie not found ' }) }
    // if the incoming update object is the same current object, don't update
    if (movieToUpdate.name === req.body.name) {
      return res.status(400).json({ message: 'it seems your update is the current value.' })
    }
    movieToUpdate.name = req.body.name.trim()
    const result = await movieToUpdate.save()
    return res.send(result)
    // const genre = await Genre.findByIdAndUpdate(
    //   req.params.id,
    //   { name: req.body.name },
    //   { new: true }
    // );
    // if (!genre)
    //   return res.status(404).send("The Genre with The Given Id Is not Found");
    // res.send(genre);
  },
  deleteMovies: async (req, res) => {
    try {
      const ids = req.body
      const moviesToDelete = await Genre.find({ _id: { $in: ids } })
      if (moviesToDelete.length === 0) {
        return res.status(404).send('Movies not found to delete')
      }
      moviesToDelete.map(async (m) => await m.remove())
      return res.send(moviesToDelete.map(m => m.id))
      // const genre = await Genre.findOne({ _id: req.params.id })
      // if (!genre) { return res.status(404).send(' The Genre with The Given Id Is not Found') }
      // await genre.remove()
      // res.send(genre)
    } catch (exc) {
      console.log(exc)
      res.status(500).send(exc)
    }
  }
}
