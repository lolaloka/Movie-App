const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost/movies";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log("Error Occured", err);
  });

module.exports = mongoose;
