const { Router } = require("express");
const reviewRoutes = Router();
const addReview = require("../controllers/reviewControllers/addReview");

reviewRoutes.post("/", async (req, res) => {
  try {
    const { rating, comment, date, userUserId, bookISBN } = req.body;
    const newReview = await addReview({
      rating,
      comment,
      date,
      userUserId,
      bookISBN,
    });

    res.status(200).json(newReview);
  } catch (error) {
    console.error("Failed to review:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = reviewRoutes;
