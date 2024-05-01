const { review } = require("../../db");

const addReview = async (rating, comment, date, userUserId, bookISBN) => {
  if (!rating || !date || !userUserId || !bookISBN) {
    throw new Error("Data is missing, can't create review");
  }
  const newReview = await review.create({
    rating,
    comment,
    date,
    userUserId,
    bookISBN,
  });
  return newReview;
};

module.exports = addReview;
