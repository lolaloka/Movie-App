const genres = require('./routes/genres')
require('./models/db')
const customers = require('./routes/customers')
const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/genres', genres)
app.use('/api/customers', customers)
// app.get("/", (req, res) => {
//   res.send("in dir home ");
// });
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server is Live')
})
