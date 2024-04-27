//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const genreRoutes = require("./genreRoutes");

//Configurar los routers
//Ejemplo: router.use('/auth', authRouter);
router.use("/book", bookRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);
router.use("/genre", genreRoutes);

module.exports = router;
