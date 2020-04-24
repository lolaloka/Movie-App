const { Genre } = require('./../../models/geners.model')
const Exceptions = require('./../exceptions/index')

module.exports = {
  getMovieById: async (id) => {
    const genre = await Genre.findById(id)
    if (!genre) {
      const excp = Exceptions.throwNotFoundExcption('The Genre with The Given Id Is not Found', 'GNTF0x')
      throw excp
    }
    return genre
  },
  getMovieList: async (sortBy = 'name') => {
    return await Genre.find().sort(sortBy)
  },
  createNewMovie: async (movie) => {
    // If the incoming movie exist, don't create and send status error.
    const existingMovie = await Genre.findOne({ name: movie.name.trim() })
    if (existingMovie) {
      throw Exceptions.throwBadRequestException(
        'It seems you want to create an exsiting movie.',
        'CEXENT48qx'
      )
    }
    let genre = new Genre(movie)
    genre = await genre.save()
    return genre
  },
  updateMovie: async (movieId, valueToUpdate) => {
    // if the passed id is invalid id, return not found status error.
    const movieToUpdate = await Genre.findById(movieId)
    if (!movieToUpdate) {
      throw Exceptions.throwNotFoundExcption(
        'Movie not found to update',
        'NTF40xaa'
      )
    }
    // if the incoming update object is the same current object, don't update
    if (movieToUpdate.name === valueToUpdate.name) {
      throw Exceptions.throwUpdateWithTheCurrentValueException(
        'it seems your update is the current value.',
        'UWCV58x'
      )
    }
    for (const key in valueToUpdate) {
      movieToUpdate[key] = valueToUpdate[key]
    }
    movieToUpdate.name = valueToUpdate.name.trim()
    const result = await movieToUpdate.save()
    return result
  }
}
