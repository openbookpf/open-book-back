const { Router } = require("express");

const bookhandler = Router();
const createabook = require("./controllers/createabook");
bookhandler.post("/", async (req, res) => {
  try {
    const {
      ISBN,
      book_title,
      author,
      book_cover_url,
      genre,
      book_description,
      price,
    } = req.body;
    const newbook = await createabook({
      ISBN,
      book_title,
      author,
      book_cover_url,
      genre,
      book_description,
      price,
    });
    res.status(200).json(newbook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = bookhandler;
