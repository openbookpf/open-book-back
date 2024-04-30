const { Router } = require("express");
const authorRoutes = Router();
const getAllAuthors = require("../controllers/authorControllers/getAllAuthors");
const createAuthor = require("../controllers/authorControllers/createAuthor");

//Get all generes
authorRoutes.get("/", async (req, res) => {
  try {
    const allAuthors = await getAllAuthors();

    res.status(200).json(allAuthors);
  } catch (error) {
    console.error("Failed to get authors:", error);
    res.status(500).json({ error: "Failed to get authors." });
  }
});

authorRoutes.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newAuthor = await createAuthor(name, description);

    res.status(200).json(newAuthor);
  } catch (error) {
    console.error("Failed to create author:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = authorRoutes;
