const movieRoute = require("./routes/genres");
const authRoute = require("./routes/auth.route");
require("./models/db");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/genres", movieRoute);
app.use("/api/auth", authRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(" Server is Live ");
});
