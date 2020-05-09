const Genre = require('../models/geners.model').Genre
class NotFoundError {
  constructor (msg, code) {
    this.status = 404
    this.message = msg
    this.code = code
  }
}
module.exports = {
  getAllGenre: async function (sortBy = 'name', searchTerm = undefined, limit = 10, skip = 0) {
    const query = {};

    if (skip) {
      skip = (skip - 1) * limit
    }
    if (searchTerm) {
      query.name = { $regex: new RegExp(searchTerm, 'gi') };
    }
    const genres = await Genre.find(query)
    .sort(sortBy)
    .limit(limit)
    .skip(skip);

    return genres
  },
  getSpecificGenre: async (id) => {
    const genre = await Genre.findById(id)
    return genre
  },
  createGenre: async (movie) => {
    const genre = new Genre(movie)
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
