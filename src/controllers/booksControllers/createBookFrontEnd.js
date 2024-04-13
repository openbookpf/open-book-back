const { book } = require("../../db");

const createBookFrontEnd = async ({
  ISBN,
  book_title,
  author,
  bookCoverUrl,
  genre,
  book_description,
  price,
}) => {
  const newbook = await book.create({
    ISBN,
    book_title,
    author,
    book_cover_url: bookCoverUrl,
    genre,
    book_description,
    price,
  });
  return newbook;
};

module.exports = createBookFrontEnd;
