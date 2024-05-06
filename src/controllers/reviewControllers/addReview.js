const { review, user } = require("../../db");

const addReview = async ({ rating, comment, date, userUserId, bookISBN }) => {
  if (!rating || !date || !userUserId || !bookISBN) {
    throw new Error("Data is missing, can't create review");
  }

  const searchedUser = await user.findOne({
    where: {
      idAuth0: userUserId,
    },
  });

  const newReview = await review.create({
    rating,
    comment,
    date,
    userUserId: searchedUser.user_id,
    bookISBN,
  });
  return newReview;
};

module.exports = addReview;
