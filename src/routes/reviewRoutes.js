const { Router } = require("express");
const reviewRoutes = Router();
const addReview = require("../controllers/reviewControllers/addReview");

//Get all generes
// reviewRoutes.get("/", async (req, res) => {
//   try {
//     const allAuthors = await getAllAuthors();

//     res.status(200).json(allAuthors);
//   } catch (error) {
//     console.error("Failed to get authors:", error);
//     res.status(500).json({ error: "Failed to get authors." });
//   }
// });

//Add Review

reviewRoutes.post("/", async (req, res) => {
  try {
    const { rating, comment, date, userUserId, bookISBN } = req.body;
    const newAuthor = await addReview(
      rating,
      comment,
      date,
      userUserId,
      bookISBN
    );

    res.status(200).json(newAuthor);
  } catch (error) {
    console.error("Failed to create author:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = reviewRoutes;
