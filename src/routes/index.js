//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const bookRoutes = require("./bookRoutes");
const stockRoutes = require("./stockRoutes");
const userRoutes = require("./userRoutes");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/book", bookRoutes);
router.use("/stock", stockRoutes);
router.use("/user", userRoutes);

module.exports = router;
