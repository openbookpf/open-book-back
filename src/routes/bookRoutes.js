const { Router } = require("express");
const bookRoutes = Router();
//validators
const createBookSchema = require("../schemas/createBookSchema");
const createBookValidation = require("../middleware/createBookValidation");
//controllers
const getAllBooksController = require("../controllers/booksControllers/getAllBooksController");
const getBookByIdController = require("../controllers/booksControllers/getBookByIdController");
const getBookByNameController = require("../controllers/booksControllers/getBookByNameController");
const modifyBook = require("../controllers/booksControllers/modifyBookController");
const uploadImage = require("../middleware/uploadImage");
const createBook = require("../controllers/booksControllers/createBook");
const getAllOptionsForFilters = require("../controllers/booksControllers/getAllOptionsForFilters");
const combiningFilter = require("../controllers/booksControllers/combiningFilter");

//* GET ALL BOOKS AND QUERY BOOKS BY NAME
bookRoutes.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const foundBooks = await getBookByNameController(name);
      res.status(200).json(foundBooks);
    } else {
      const allBooks = await getAllBooksController();
      res.status(200).json(allBooks);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//* GET BOOK BY ID
bookRoutes.get("/book-id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundBook = await getBookByIdController(id);
    res.status(200).json(foundBook);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//* MODIFY BOOK DATA
bookRoutes.put("/book-id/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const settingbook = await modifyBook(id, newData);
    const foundBookById = await getBookByIdController(settingbook.ISBN);
    if (settingbook) {
      res.status(200).send(foundBookById);
    } else {
      res.send.status(404).send("Book not found");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

bookRoutes.post("/filtrar", async (req, res) => {
  try {
    const { authorArray, genreArray, minPrice, maxPrice, language } = req.body;

    const allbooks = await combiningFilter({
      authorArray,
      genreArray,
      minPrice,
      maxPrice,
      Booklanguage: language,
    });
    res.status(200).json(allbooks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//* CREATE A BOOK
bookRoutes.post(
  "/",
  uploadImage,
  createBookValidation(createBookSchema),
  async (req, res) => {
    try {
      const {
        ISBN,
        book_title,
        author,
        genre,
        editorial,
        year_of_edition,
        language,
        age_segment,
        book_description,
        price,
      } = req.body;

      //Get the url provided by cloudinary
      const book_cover_url = req.file.path;

      const newBook = await createBook({
        ISBN,
        book_title,
        author,
        genre,
        book_description,
        price,
        book_cover_url,
        editorial,
        year_of_edition,
        language,
        age_segment,
      });
      res.status(200).json(newBook);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
);

//* GET ALL BOOKS AND QUERY BOOKS BY NAME
bookRoutes.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const foundBooks = await getBookByNameController(name);
      res.status(200).json(foundBooks);
    } else {
      const allBooks = await getBookController();
      res.status(200).json(allBooks);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// bookRoutes.get("/filters", async (req, res) => {
//   try {
//     const getallfilters = await getAllOptionsForFilters();
//     res.status(200).json(getallfilters);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

module.exports = bookRoutes;
