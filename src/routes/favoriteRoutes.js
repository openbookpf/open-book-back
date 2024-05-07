const { Router } = require("express");
const allFavorites = require("../controllers/favoriteRoutes/allFavorites");
const createFavorite = require("../controllers/favoriteRoutes/createFavorites");
const getFavorite = require("../controllers/favoriteRoutes/getFavorite");
favoriteRoutes = Router();

favoriteRoutes.get("/", async (req, res) => {
  const allfavorites = await allFavorites();
  res.status(200).json(allfavorites);
});

favoriteRoutes.post("/", async (req, res) => {
  const {
    user_id,
    book_name,
    book_picture,
    description,
    book_id,
    book_author,
    book_quantity,
    book_price,
  } = req.body;
  try {
    const newfav = await createFavorite({
      user_id,
      book_name,
      book_picture,
      description,
      book_id,
      book_author,
      book_quantity,
      book_price,
    });
    res.status(200).json(newfav);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

favoriteRoutes.get("/findtoremove/", async (req, res) => {
  const { user_id, fav_id } = req.query;
  try {
    const favorite = await getFavorite(user_id, fav_id);
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = favoriteRoutes;
