const Genre = require('../models/geners.model').Genre
class NotFoundError {
  constructor (msg, code) {
    this.status = 404
    this.message = msg
    this.code = code
  }
}
module.exports = {
  getAllGenre: async function (sortBy = 'name', searchTerm = undefined) {
    const query = {};

    if (searchTerm) {
      query.name = { $regex: new RegExp(searchTerm, 'gi') };
    }
    const genres = await Genre.find(query)
    .sort(sortBy)
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
