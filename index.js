require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const montarBaseDeDatos = require("./src/utils/montarBaseDeDatos");
const filterbygenre = require("./src/controllers/booksControllers/filterbygenre.js");
const deletebook = require("./src/controllers/booksControllers/deletebook.js");

conn
  .sync({ force: true })
  .then(() => {
    server.listen(port, async () => {
      console.log(`Server listening on port ${port}`);
      montarBaseDeDatos();
      // try {
      //   result = await deletebook("9780590353427");
      //   console.log(result);
      // } catch (error) {
      //   console.log(error);
      // }
    });
  })
  .catch((error) => console.error(error));
