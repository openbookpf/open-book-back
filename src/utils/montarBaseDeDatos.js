const datos = require("./datos");
const createabook = require("../routes/bookhandler/controllers/createaBook");

module.exports = () => {
  datos.forEach((book) => {
    createabook(book);
  });
  console.log("Datos de la API externa guardados en la base de datos.");
};
