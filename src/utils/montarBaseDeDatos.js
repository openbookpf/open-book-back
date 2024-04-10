const datos = require("./datos");
const createabook = require("../routes/bookhandler/controllers/createabook");

module.exports = () => {
  datos.forEach((book) => {
    createabook(book);
  });
  console.log("Datos de la API externa guardados en la base de datos.");
};

// const { datos } = require("../db");
// const act = require("./actividades");
// const postActivitiesControl = require("../controllers/postActivitiesControl");

// module.exports = async () => {
//   try {
//     const { data } = await axios("http://localhost:5000/countries");
//     const response = data.map((pais) => ({
//       id: pais.cca3,
//       name: pais.name.common,
//       continente: pais.continents?.[0],
//       capital: pais.capital?.[0],
//       subregion: pais.subregion,
//       bandera: pais.flags.png,
//       area: pais.area,
//       poblacion: pais.population,
//     }));
//     await Countrie.bulkCreate(response);
//     await act.forEach((ac) => {
//       postActivitiesControl(ac);
//     });
//     console.log("Datos de la API externa guardados en la base de datos.");
//   } catch (error) {
//     console.log("Error al montar los datos en la base:" + error);
//   }
// };
