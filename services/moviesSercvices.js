const Genre = require('../models/geners.model').Genre
class NotFoundError {
  constructor (msg, code) {
    this.status = 404
    this.message = msg
    this.code = code
  }
}
module.exports = {
  getAllGenre: async function () {
    const genres = await Genre.find().sort('name')
    return genres
  },
  getSpecificGenre: async (id) => {
    const genre = await Genre.findById(id)
    return genre
  },
  createGenre: async (name) => {
    const genre = new Genre({ name })
    await genre.save()

    return genre
  },
  updateGenre: async (id) => {
    const genre = await Genre.findById(id)
    if (!genre) {
      throw new NotFoundError('Movie not found', 'cdsw1wew')
    }
    // update logic here...
    genre.save()
    return genre
  }
}
