module.exports = (error, res) =>
  res.status(error.statusCode || 500).send(error);
