//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const bookhandler = require("./bookhandler/bookhandler");
const stockhandler = require("./stockhandler/stockhandler");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/book", bookhandler);
router.use("/stock", stockhandler);

module.exports = router;
