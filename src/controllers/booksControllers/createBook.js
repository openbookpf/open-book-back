const { book, genre, author, editorial, language } = require("../../db");
const getBookByIdController = require("./getBookByIdController");

const createBook = async ({
  ISBN,
  book_title,
  author: authorName,
  genre: genresNames,
  book_description,
  price,
  book_cover_url,
  editorial: editorialName,
  year_of_edition,
  language: languageName,
  age_segment,
}) => {
  // Verificar si el autor existe o crear uno nuevo
  let newAuthor = await author.findOne({ where: { name: authorName } });
  if(!newAuthor){
    newAuthor = await author.create({name: authorName, description: ''})
  };

  // Verificar si los géneros existen o crear nuevos
  const newGenres = await Promise.all(
    genresNames.map(async (genreName) => {
      let addGenre
      const newGenre = await genre.findOne({
        where: { name: genreName },
      });
      if (newGenre){
        return newGenre.id
      }else{
       addGenre = await genre.create({name: genreName})
      }
      return addGenre.id;
    })
  );

  // Verificar si la editorial existe o crear una nueva
  let [newEditorial] = await editorial.findOrCreate({
    where: { name: editorialName },
  });

  // Verificar si el idioma existe o crear uno nuevo
  let [newLanguage] = await language.findOrCreate({
    where: { name: languageName },
  });

  // Crear el libro y establecer las relaciones con autor, género, editorial y idioma
  const newBook = await book.create({
    ISBN,
    book_title,
    book_description,
    price,
    book_cover_url,
    year_of_edition,
    age_segment,
    // Establecer las relaciones usando las claves externas
    authorId: newAuthor.id,
    editorialId: newEditorial.id,
    languageId: newLanguage.id,
  });

  // Establecer las relaciones
  await newBook.setGenres(newGenres);

  return "creado con exito";
};

module.exports = createBook;
