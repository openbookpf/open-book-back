//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const bookhandler = require("./bookhandler/bookhandler");
const stockhandler = require("./stockhandler/stockhandler");
const userHandler = require("./userhandler/userHandler");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/book", bookhandler);
router.use("/stock", stockhandler);
router.use("/user", userHandler);

module.exports = router;
