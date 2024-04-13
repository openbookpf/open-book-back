const datos = require("./datos");
const createBook = require("./createBook");

module.exports = () => {
  datos.forEach((book) => {
    createBook(book);
  });
  console.log("Datos de la API externa guardados en la base de datos.");
};
