//Configuraciónes
const { Router } = require("express");
const router = Router();
// Importar todos los routers;
const bookHandler = require("./bookHandler/bookHandler");
const stockHandler = require("./stockHandler/stockHandler");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/book", bookHandler);
router.use("/stock", stockHandler);

module.exports = router;
