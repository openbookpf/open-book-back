const invalidRoute = (req, res, next) => {
  res.status(404).send("The requested route does not exist.");
};

module.exports = invalidRoute;
