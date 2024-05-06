const changeBookFormat = (book) => {
  let rating = 0;
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
  //Add average review
  if (book.reviews.length) {
    book.reviews.forEach((review) => {
      rating = rating + review.rating;
    });

    jsObjectBook.average_rating = Number(
      (rating / book.reviews.length).toFixed(2)
    );
  } else {
    jsObjectBook.average_rating = null;
  }

  return jsObjectBook;
};

module.exports = changeBookFormat;
