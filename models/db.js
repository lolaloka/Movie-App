const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost/movies";
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch(() => {
    console.log("Error Occured");
  });

module.exports = mongoose;
