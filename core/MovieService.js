const { Genre } = require("../models/geners.model");
const { Exception } = require("../helpers/Exceptions/index");
module.exports = {
  getListMovies: async (sortBy = "name", searchTerm = undefined) => {
    try {
      const query = {};
      if (searchTerm) {
        query.name = { $regex: new RegExp(searchTerm, "gi") };
      }
      // const movies = await Genre.find({name:{$regex:new RegExp(searchTerm, "gi")}}).sort(sortBy);
      const movies = await Genre.find(query).sort(sortBy);
      return movies;
    } catch (exc) {
      throw exc;
    }
    //if (!genres) throw { msg: "No genres to show " };
  },
  getMovieById: async (id) => {
    try {
      if (!id) throw new Exception("Invalid id", 400, "BADIDxQ9w");
      const genre = await Genre.findById(id);
      if (!genre) throw new Exception("No MOVIE TO APPEAR", 404, "gdgdf025");
      return genre;
    } catch (error) {
      throw error;
    }
  },
  CreateNewgenre: async (movie) => {
    try {
      let genre = new Genre(movie);
      genre = await genre.save();
      return genre;
    } catch (error) {
      throw error;
    }
  },
  UpdateAgenre: async (id, movie) => {
    const genre = await Genre.findById(id);
    if (!genre)
      throw {
        msg: " No Genre With the Given Id ",
        codeExeptions: "NFCS0H2",
      };
    if (genre.name === movie.name)
      throw {
        msg: " it seems that No changes happend ",
        codeExeptions: "NFCS0H2",
      };

    genre.set(movie);
    const updateResult = await genre.save();
    return updateResult;
  },
};
