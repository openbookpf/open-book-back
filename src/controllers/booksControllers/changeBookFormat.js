const changeBookFormat = (book) => {
  //Transfom sequilize data into js objects
  const jsObjectBook = book.get({ plain: true });
  //create array of genres containing just the genre's name
  jsObjectBook.genres = book.genres.map((genre) => genre.name);
  //Replace the object auther for the name
  jsObjectBook.author = book.author.name;
  //Replace the object editorial for the name
  jsObjectBook.editorial = book.editorial.name;
  //Replace the object language for the name
  jsObjectBook.language = book.language.name;

  return jsObjectBook;
};

module.exports = changeBookFormat;
