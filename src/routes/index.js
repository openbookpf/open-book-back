//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const genreRoutes = require("./genreRoutes");
const favoriteRoutes = require("./favoriteRoutes");
const authorRoutes = require("./authorRoutes");
const reviewRoutes = require("./reviewRoutes");

//Configurar los routers
//Ejemplo: router.use('/auth', authRouter);
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/genres", genreRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/authors", authorRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
