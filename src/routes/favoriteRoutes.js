const { Router } = require("express");
const allFavorites = require("../controllers/favoriteRoutes/allFavorites");
const createFavorite = require("../controllers/favoriteRoutes/createFavorites");
favoriteRoutes = Router();

favoriteRoutes.get("/", (req, res) => {
  const allfavorites = allFavorites();
  res.status(200).json({ error: error.message });
});

favoriteRoutes.post("/", (req, res) => {
  const { book_name, book_picture, description } = req.body;
  const newfav = createFavorite({ book_name, book_picture, description });
});

module.exports = favoriteRoutes;
