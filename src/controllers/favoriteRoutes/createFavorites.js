const { favorite } = require("../../db");

const createFavorites = async ({
  user_id,
  book_name,
  book_picture,
  description,
}) => {
  if (!user_id || !book_name || !book_picture || !description) {
    throw new Error("Data is missing: server can't create user");
  }

  //create new user
  const newfavorite = await favorite.create({
    book_name,
    book_picture,
    description,
    favorites_userUserId_fkey: user_id,
  });
  return newfavorite;
};
//userUserId
module.exports = createFavorites;
