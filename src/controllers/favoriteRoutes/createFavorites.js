const { favorite } = require("../../db");

const createFavorites = async (newfav) => {
  const { book_name, book_picture, description } = newfav;
  if (!book_name || !book_picture || !description) {
    throw new Error("Data is missing: server can't create user");
  }

  //create new user
  const newfavorite = await favorite.create({
    user_name,
    email_address,
    picture,
  });
  return newfavorite;
};

module.exports = createFavorites;