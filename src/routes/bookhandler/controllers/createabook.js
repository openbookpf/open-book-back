const { Book } = require("../../../db");

const createabook = async (newobject) => {
  const {
    ISBN,
    book_title,
    author,
    book_cover_url,
    genre,
    book_description,
    price,
  } = newobject;
  const newbook = await Book.create({
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
//cccdeedtff
