const { book } = require("../../../db");

const createabook = async ({
  ISBN,
  book_title,
  author,
  book_cover_url,
  genre,
  book_description,
  price,
}) => {
  const newbook = await book.create({
    ISBN,
    book_title,
    author,
    book_cover_url,
    genre,
    book_description,
    price,
  });
  return newbook;
};

module.exports = createabook;
