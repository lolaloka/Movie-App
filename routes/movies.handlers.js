const MovieService = require('./../@core/services/movie.service')
const { validate, Genre } = require('../models/geners.model')
const Exceptions = require('./../@core/exceptions/index')
const { isNotNumber } = require('./../@core/helpers/validate-number.function')

module.exports = {
  getMoviesList: async (req, res) => {
    try {
      const { sortBy } = req.query
      const genres = await MovieService.getMovieList(sortBy)
      res.send(genres)
    } catch (exc) {
      res.status(500).json({ message: exc.message || exc, error: true })
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      if (isNotNumber(id)) {
        throw Exceptions.throwParameterEexcpetion(
          'Invalid movie id',
          ['id'],
          'PARAMz5AX'
        )
      }
      const genre = await MovieService.getMovieById(id)
      return genre
    } catch (exc) {
      res.status(exc.status || 500).send(exc)
    }
  },
  createNewMovide: async (req, res) => {
    try {
      const movie = req.body
      const { error } = validate(movie)
      if (error) {
        throw error
      }
      const createdMovie = await MovieService.createNewMovie(req.body)
      res.send(createdMovie)
    } catch (exc) {
      res.status(exc.status || 500).send(exc)
    }
  },
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      if (isNotNumber(id)) {
        throw Exceptions.throwParameterEexcpetion('invalid movie id', ['id'], 'PAQE54zxx')
      }
      const movieValueToUpdate = req.body
      const { error } = validate(movieValueToUpdate)
      if (error) {
        throw Exceptions.throwParameterEexcpetion(error.details[0].message, [''], 'PAUPD8q7x')
      }

      const updateResult = await MovieService.updateMovie(id, movieValueToUpdate)
      res.send(updateResult)
    } catch (exc) {
      res.status(exc.status || 500).json(exc)
    }
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
    } catch (exc) {
      res.status(500).send(exc)
    }
  }
}
