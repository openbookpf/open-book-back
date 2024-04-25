const { book } = require("../../db");

const createBook = async ({
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
}) => {
  const newbook = await book.create({
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
  return newbook;
};

module.exports = createBook;
