//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const genreRoutes = require("./genreRoutes");
const favoriteRoutes = require("./favoriteRoutes");

//Configurar los routers
//Ejemplo: router.use('/auth', authRouter);
router.use("/book", bookRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/genre", genreRoutes);
router.use("/favorite", favoriteRoutes);

module.exports = router;
