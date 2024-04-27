const { Router } = require("express");
const genreRoutes = Router();
const getAllGenres = require("../controllers/genreControllers/getAllGenres");
const createGenre = require("../controllers/genreControllers/createGenre");

//Get all generes
genreRoutes.get("/", async (req, res) => {
  try {
    const allGenres = await getAllGenres();

    res.status(200).json(allGenres);
  } catch (error) {
    console.error("Failed to get genres:", error);
    res.status(500).json({ error: "Failed get genres." });
  }
});

genreRoutes.post("/", async (req, res) => {
  try {
    const { genre } = req.body;
    const newGenre = await createGenre(genre);

    res.status(200).json(newGenre);
  } catch (error) {
    console.error("Failed to create genre:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = genreRoutes;
