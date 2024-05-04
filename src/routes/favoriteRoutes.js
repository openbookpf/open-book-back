const { Router } = require("express");
const allFavorites = require("../controllers/favoriteRoutes/allFavorites");
const createFavorite = require("../controllers/favoriteRoutes/createFavorites");
favoriteRoutes = Router();

favoriteRoutes.get("/", async (req, res) => {
  const allfavorites = await allFavorites();
  res.status(200).json(allfavorites);
});

favoriteRoutes.post("/", async (req, res) => {
  const { user_id, book_name, book_picture, description } = req.body;
  try {
    const newfav = await createFavorite({
      user_id,
      book_name,
      book_picture,
      description,
    });
    res.status(200).json(newfav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = favoriteRoutes;
