const { favorite } = require("../../db");

const createFavorites = async ({
  user_id,
  book_name,
  book_picture,
  description,
  book_id,
  book_author,
  book_quantity,
  book_price,
}) => {
  if (!user_id || !book_name || !book_picture || !description) {
    throw new Error("Data is missing: server can't create favorite");
  }

  //create new user
  const newfavorite = await favorite.create({
    book_name,
    book_picture,
    description,
    book_id,
    book_author,
    book_quantity,
    book_price,
    userUserId: user_id,
  });
  return newfavorite;
};

module.exports = createFavorites;
