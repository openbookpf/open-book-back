const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const bookhandler = require("./bookhandler/bookhandler");
const stockhandler = require("./stockhandler/stockhandler");

router.use("/book", bookhandler);
router.use("/stock", stockhandler);
module.exports = router;
