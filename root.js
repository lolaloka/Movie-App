const genres = require("./routes/genres");
require("./models/db");
const customers = require("./routes/customers");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/genres', genres)
app.use('/api/customers', customers)
// app.get("/", (req, res) => {
//   res.send("in dir home ");
// });
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(" Server is Live ");
});
