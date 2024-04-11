require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const montarBaseDeDatos = require("./src/utils/montarBaseDeDatos");

conn
  .sync({ force: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      montarBaseDeDatos();
    });
  })
  .catch((error) => console.error(error));