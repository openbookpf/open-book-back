require("dotenv").config();
const port = process.env.PORT || 3001;
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const montarBaseDeDatos = require("./src/utils/montarBaseDeDatos");

conn
  .sync({ force: true })
  .then(() => {
    server.listen(port, async () => {
      //montarBaseDeDatos();
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) =>
    console.error("Database connection error:", error)
  );
