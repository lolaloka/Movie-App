const { Genre, validate } = require("../models/geners.model");
const movieService = require("../core/MovieService");
const handleException = require("../helpers/Exceptions/exception.handler");

module.exports = {
  GetAllGenres: async (req, res) => {
    try {
      const { sortBy, searchTerm } = req.query;
      console.log(req.query);
      const genre = await movieService.getListMovies(sortBy, searchTerm);
      res.send(genre);
    } catch (error) {
      // handleException(error, res);
      console.log(error);
      // res.status(error.statusCode || 500).send(error);
    }
  },
  Getspecificgenre: async (req, res) => {
    try {
      const genre = await movieService.getMovieById(req.params.id);
      res.send(genre);
      //    if (!genre) throw res.send(genre);
    } catch (error) {
      handleException(error, res);
      // res.status(error.statusCode || 500).send(error);
    }
  },
  CreateNewgenre: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
      }
      let genre;
      genre = await movieService.CreateNewgenre(req.body);
      res.send(genre);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  UpdateAgenre: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const updatedMovie = await movieService.UpdateAgenre(
        req.params.id,
        req.body
      );
      res.send(updatedMovie);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  DeleteAGenre: async (req, res) => {
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
  },
  DeleteAllGenre: async (req, res) => {
    const ids = req.body;
    let deletedMovie = Genre.find({ _id: { $in: ids } });
    if (deletedMovie.length === 0)
      return res.status(400).send("it seems that Not Movies to delete");
    deletedMovie = deletedMovie.map(async (movie) => await movie.remove());

    res.send(deletedMovie.map((id) => deletedMovie.id));
  },

  getPaginatedMovies(pageIndex, pageSize) {
    try {
    } catch (exc) {}
  },
};
