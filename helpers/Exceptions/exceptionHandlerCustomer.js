module.exports = {
  exceptionhandler: (err, res) => {
    return res.status(err.status).send(err);
  },
};
