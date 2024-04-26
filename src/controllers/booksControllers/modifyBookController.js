const modifyBook = async (id, newData) => {
  const foundBook = await book.findOne({
    where: { ISBN: id },
    include: [author, genre, editorial, language], // Incluir las relaciones para obtener los datos actuales del libro
  });

  if (foundBook) {
    // Actualizar el libro con los nuevos datos
    await foundBook.update(newData);

    // Verificar si hay autor, género, editorial y lenguaje en los nuevos datos
    if (newData.authors) {
      const newAuthors = await Promise.all(newData.authors.map(async (authorName) => {
        const [newAuthor] = await author.findOrCreate({ where: { name: authorName } });
        return newAuthor;
      }));
      await foundBook.setAuthors(newAuthors);
    }

    if (newData.genres) {
      const newGenres = await Promise.all(newData.genres.map(async (genreName) => {
        const [newGenre] = await genre.findOrCreate({ where: { name: genreName } });
        return newGenre;
      }));
      await foundBook.setGenres(newGenres);
    }

    if (newData.editorials) {
      const newEditorials = await Promise.all(newData.editorials.map(async (editorialName) => {
        const [newEditorial] = await editorial.findOrCreate({ where: { name: editorialName } });
        return newEditorial;
      }));
      await foundBook.setEditorials(newEditorials);
    }

    if (newData.languages) {
      const newLanguages = await Promise.all(newData.languages.map(async (languageName) => {
        const [newLanguage] = await language.findOrCreate({ where: { name: languageName } });
        return newLanguage;
      }));
      await foundBook.setLanguages(newLanguages);
    }

    return foundBook;
  }

  throw new Error("Book not found");
};

module.exports = modifyBook;


