
const router = require('express').Router()
const moviesHandlers = require('./movies.handlers')

router.get('/', moviesHandlers.getMoviesList)
router.get('/:id', moviesHandlers.getMovieById)
router.post('/', moviesHandlers.createNewMovide)
router.put('/:id', moviesHandlers.updateMovie)
router.delete('/multi', moviesHandlers.deleteMovies)

module.exports = router
