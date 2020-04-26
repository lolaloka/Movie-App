const { Genre } = require("../models/geners.model");
const Exception = require("../helpers/Exceptions/index").Exception;
module.exports = {
  getListMovies: async () => {
    try {
      const movies = await Genre.find().sort("name");
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
  CreateNewgenre: async (name) => {
    let genre = new Genre({ genreName: name });
    genre = await genre.save();
    return genre;
  },
  UpdateAgenre: async (id, genreName) => {
    const genre = await Genre.findById(id);
    console.log(genre);
    if (!genre)
      throw {
        msg: " No Genre With the Given Id ",
        codeExeptions: "NFCS0H2",
      };
    if (genre.name === genreName)
      throw {
        msg: " it seems that No changes happend ",
        codeExeptions: "NFCS0H2",
      };
    // res.status(400).send("The Genre with The Given Id Is not Found");
    //  return res.status(400).send("it seems that its has the same name");
    genre.set({
      name: genreName,
    });
    const SavedCoures = await genre.save();
    return SavedCoures;
  },
};
