const genres = require("./routes/genres");
const customers = require("./routes/customers");
const express = require("express");

const app = express();
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
app.use(express.json());

app.use("/api/genres", genres);
app.use("/api/customers", customers);
// app.get("/", (req, res) => {
//   res.send("in dir home ");
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is Live");
});
