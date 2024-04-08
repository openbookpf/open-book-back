require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
const { Book } = require("../db");

// router.get("/", async (req, res) => {
//   try {
//     // si ya los tengo cargados en la DB los consumo desde alli.
//     const genresDb = await Book.findAll();
//     if (genresDb.length) return res.json(genresDb);

//     //else --> los voy a buscar a la API
//     const response = await axios.get(
//       `https://api.rawg.io/api/genres?key=${APIKEY}`
//     );
//     const genres = response.data.results; // recibo un array de objetos, con los juego filtrados por GENERO
//     //los guardo en la DB filtrando solo el nombre
//     genres.forEach(async (g) => {
//       await Book.findOrCreate({
//         where: {
//           name: g.name,
//         },
//       });
//     });
//     //(OPTIMIZADO) --> SOLO ENVIO AL FRONT LA INFO NECESARIA (nombre de los generos)
//     const genresREADY = genres.map((game) => {
//       return {
//         id: game.id,
//         name: game.name,
//       };
//     });
//     res.json(genresREADY);
//   } catch (err) {
//     return console.log(err);
//   }
// });

module.exports = router;
