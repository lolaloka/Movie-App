const { Genre, validate } = require("../models/geners.model");
const movieService = require("../core/MovieService");
const handleException = require("./../helpers/Exceptions/exception.handler");
// class Execptions {
//   constructor(msg, status, execptionCode) {
//     this.msg = msg;
//     this.status = status;
//     this.execptionCode = execptionCode;
//   }
// }
module.exports = {
  GetAllGenres: async (req, res) => {
    try {
      const genres = await movieService.getListMovies();
      // if (!genres) return console.log("No Genres To Show ");
      // const genres = await Genre.find().sort("name");
      res.send(genres);
    } catch (error) {
      handleException(error, res);
    }
  },
  Getspecificgenre: async (req, res) => {
    try {
      const genre = await movieService.getMovieById(req.params.id);
      res.send(genre);
    } catch (error) {
      handleException(error, res);
      // res.status(error.statusCode || 500).send(error);
    }
  },
  CreateNewgenre: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) {
        res.status(404).send(error.details[0].message);
      }
      // let genre = new Genre({ name: req.body.name });
      // genre = await genre.save();
      movieService.CreateNewgenre(req.body.name);
      res.send(genre);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  UpdateAgenre: async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(404).send(error.details[0].message);

      movieService.UpdateAgenre(req.params.id, req.body.name);

      // const genre = await Genre.findById(req.params.id);
      // //  console.log("Id is ", genre._id);
      // if (!genre)
      //   res.status(400).send("The Genre with The Given Id Is not Found");
      // if (genre.name === req.body.name)
      //   return res.status(400).send("it seems that its has the same name");
      // genre.set({
      //   name: req.body.name
      // });
      // const SavedCoures = await genre.save();
      res.send(SavedCoures);
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
